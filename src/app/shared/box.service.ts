import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  shareReplay,
  take
} from 'rxjs';
import { Box } from '../main-page/box/box';
import { BoxFireStoreService } from './box-firestore.service';

@Injectable({
  providedIn: 'root',
})
export class BoxService {
  private boxes$: Observable<Box[]>;
    /** Subject, ami tárolja az aktuális Box objektumot, típusát generikusan megadhatjuk, a | operátorral tudunk union type-ot definiálni */
  private boxSubject$ = new BehaviorSubject<Box | undefined>(undefined);
    /** Publikus Observable, amit kifelé elérhetővé teszünk, ez módosítani már nem tudjuk a Subjecthez eltérően */
  public box$: Observable<Box | undefined> = this.boxSubject$.asObservable();

  /** HttpClient segít abban, hogy egyszerűen tudjuk lekérdezéseket indítani egy adott API felé, fontos provide-olni a provideHttpClient()-ot hozzá */
  constructor(
    private http: HttpClient,
    private readonly boxFireStoreService: BoxFireStoreService,
  ) {
    // Http lekérés, az tömböt bejárva Box objektumokat készítünk random price-al
    this.boxes$ = this.http.get<Box[]>('https://fakestoreapi.com/products').pipe(
      map((response) =>{
        return response.map(product => ({...product, price: Math.floor(Math.random() * 9)+2} as Box));
      }),
      // Ha nem használjuk a shareReplay-t megnézhetjük a devtools network tab-ján, hogy a request minden click-nél kimegy,
      // Ennek használatával megosztjuk (cacheelve lesz) és visszajátszuk a response értékét, így csak 1x fog a request kimenni
      shareReplay(1) // Meogsztjuk + visszajátszatjuk a korábbi (1) emission értékét, a korai felírazkozás miatt
    );
  }

  public buyBox(): void {
    // Async módon random egy Box objektumot kiveszünk a tömbből
    this.boxes$.pipe(
      map(boxes => {
        const index = Math.floor(Math.random() * boxes.length);
        return boxes[index];
      }),
      take(1) // Segítségével az adatfolyamból 1 elemet veszünk ki, ezzel véget ér az adatfolyam (complete)
      // a példa kedvéért illetve, hogy gyakoroljuk a subjecteket itt íratkozunk fel és az adatfolyamba egy értéket adunk át
      // FONTOS! Legtöbb esetben nincs szükség a manuális subscriptionra, a best practise, hogy a html templatebe íratkozunk fel
    ).subscribe(product => this.boxSubject$.next(product)); // Az adat elkészültével a subjectbe mentjük
  }

  public sellBox(): void {
    this.boxSubject$.next(undefined);
  }
}
