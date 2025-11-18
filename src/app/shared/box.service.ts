import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  shareReplay,
  take,
  tap
} from 'rxjs';
import { Box } from '../main-page/box/box';

@Injectable({
  providedIn: 'root',
})
export class BoxService {
  private boxes$: Observable<Box[]>;
  private boxesSubject$ = new BehaviorSubject<Box[]>([]);

  public selectedBoxes$: Observable<Box[]>;

  constructor(
    private http: HttpClient,
    //private readonly boxFireStoreService: BoxFireStoreService,
  ) {
    this.boxes$ = this.http.get<Box[]>('https://fakestoreapi.com/products').pipe(
      map((response) =>{
        return response.map(product => ({...product, price: Math.floor(Math.random() * 9)+2} as Box));
      }),
      shareReplay(1)
    );

    //this.selectedBoxes$ = this.boxFireStoreService.getAllSelectedBoxes();
    this.selectedBoxes$ =  this.boxesSubject$.asObservable();
  }

  public buyBox(): void {
    this.boxes$.pipe(
      map(boxes => {
        const index = Math.floor(Math.random() * boxes.length);
        return boxes[index];
      }),
      //switchMap(box => this.boxFireStoreService.saveBox(box)),
      tap(box => this.boxesSubject$.next([...this.boxesSubject$.getValue(), box])),
      take(1),
    ).subscribe();
  }

  public sellBox(id: string): void {
    //this.boxFireStoreService.removeBox(id).pipe(take(1)).subscribe();
    const newBoxes = this.boxesSubject$.getValue().filter(box => box.id !== id);
    this.boxesSubject$.next(newBoxes);
  }
}
