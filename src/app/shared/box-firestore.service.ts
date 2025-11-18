import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, collectionSnapshots, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { Box } from '../main-page/box/box';

@Injectable({
  providedIn: 'root',
})
export class BoxFireStoreService {
  private fireStore = inject(Firestore);
  private boxCollection = 'boxes';

   /** Egy megadott collectionba egy documentet mentünk el (egy Boxot) */
  public saveBox(box: Box): Observable<any>{
    /* addDoc létre is hozza az adott collectiont a documentummal, ha az nem létezik még */
    return from(addDoc(this.getCollectionRef(), box));
  }

  public getAllSelectedBoxes(): Observable<Box[]>{
    /*
     * collectionSnapshots segítségvel az adott kollekcióban létrejövő változásokról kaphatunk értesítéseket.
     * Ezt kihasználva módosítás után (buy/sell) könnyen értesülhetünk a változásokról.
     * Mint említettük a CollectionReference a Query leszármazottja, ez alapján ide Query is meghatározható.
     */
    return collectionSnapshots(this.getCollectionRef()).pipe(
      /*
       * QueryDocumentSnapshot.id az az ID amit a firestore az addDoc-kal legenerált a documentumhoz.
       * Ezt az id-t felülírjuk a Box objektumunk id-jával (mivel ez úgy sincs használva), hogy később
       * erre hivatkozva tudjunk módosítani a collectionban
      */
      map(docSnapshots => docSnapshots.map(snapshot =>({...snapshot.data(), id: snapshot.id}) as Box ))
    )
  }

  public removeBox(id: string): Observable<any>{
    /*
     * Abban az esetben ha a document id-t nem mentjük el, meg kell keresnünk,
     * hogy törölni tudjunk. Qeury segítségével tudunk a dokumentumok között szűrni.
     *
    const queryById = query(this.getCollectionRef(), where('id', '==', id));
    return from(getDocs(queryById)).pipe(
      switchMap(snapshot =>{
        return snapshot.docs.map(document => {
          const docRef = doc(this.fireStore, this.boxCollection, document.id);
          deleteDoc(docRef);
        })
      })
    ) */
    return from(deleteDoc(doc(this.fireStore, this.boxCollection, id)))
  }

    private getCollectionRef(): CollectionReference {
    return collection(this.fireStore, this.boxCollection);
  }
}
