import { Injectable } from '@angular/core';
import { Building } from './building';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  private db!: IDBDatabase;
  private readonly objectStoreName = 'buildings';
  public readonly buildings: Building[] = [];
  public money = 10;

  constructor() {
    this.initIndexedDB();
  }

  public createBuilding(name: string, income: number, price: number): boolean {
    const building: Building = {
      name,
      income,
      cost: price,
      amount: 0,
    };

    // Object store tranzakció létrehozása és object store lekérése
    const objectStore = this.db
      .transaction(this.objectStoreName, 'readwrite')
      .objectStore(this.objectStoreName);
    const request = objectStore.add(building); // "add" request létrehozása

    // Sikeres request lekezelése
    request.onsuccess = (event: any) => {
      const newBuilding: Building = {
        ...building, // Building kicsomagolása és meglévő tulajdonságainak átmásolása
        id: event.target.result, // A "result" a létrehozott épület ID-ja lesz
      };

      this.buildings.push(newBuilding);
    };

    // Request error lekezelése
    request.onerror = (event: any) => {
      console.log('Error adding item:', event.target.error);
    };

    return true;
  }

  public deleteBuilding(id: number): void {
    // Object store tranzakció létrehozása és object store lekérése
    const objectStore = this.db
      .transaction(this.objectStoreName, 'readwrite')
      .objectStore(this.objectStoreName);
    const request = objectStore.delete(id); // "delete" request létrehozása

    // Sikeres request lekezelése
    request.onsuccess = () => {
      const index = this.buildings.findIndex((b) => b.id === id);

      if (index !== -1) {
        this.buildings.splice(index, 1); // Memóriában tárolt épület törlése
      }
    };

    // Request error lekezelése
    request.onerror = (event: any) => {
      console.log('Error deleting item:', event.target.error);
    };
  }

  // Jelenleg nincs használva
  public editBuilding(editedBuilding: Building): void {
    // Object store tranzakció létrehozása és object store lekérése
    const objectStore = this.db
      .transaction(this.objectStoreName, 'readwrite')
      .objectStore(this.objectStoreName);
    const request = objectStore.put(editedBuilding); // "put" request létrehozása

    // Sikeres request lekezelése
    request.onsuccess = (event: any) => {
      const id = event.target.result; // A "result" a módosított épület ID-ja lesz
      const buildingIndex = this.buildings.findIndex(
        (building) => building.id === id
      );

      if (buildingIndex !== -1) {
        this.buildings[buildingIndex] = editedBuilding; // Memóriában tárolt épület módosítása
      }
    };

    // Request error lekezelése
    request.onerror = (event: any) => {
      console.log('Error editing item:', event.target.error);
    };
  }

  public checkGameOver(): boolean {
    const hasAnyBuilding = this.buildings.some((b) => b.amount > 0);
    const canAfford = this.buildings.some((b) => this.money >= b.cost);
    return !hasAnyBuilding && !canAfford;
  }

  private initIndexedDB(): void {
    // Adatbázis létrehozása (ha még nem létezik) és megnyitása
    const request = indexedDB.open('building-db', 1);

    // Error kezelése az adatbázis létrehozásakor/megnyitásakor
    request.onerror = (event: any) => {
      console.log('Detabase error:', event.target.error);
    };

    // Ha a verziószám növekedett (vagy most hoztuk létre az adatbázist), itt kell frissíteni az object store sémát
    request.onupgradeneeded = (event: any) => {
      const db: IDBDatabase = event.target.result;

      // Object store létrehozása
      const objectStore = db.createObjectStore(this.objectStoreName, {
        keyPath: 'id',
        autoIncrement: true,
      });

      // Adatbázis index létrehozása a hatékonyabb működés érdekében
      objectStore.createIndex('nameIndex', 'name', { unique: true });
    };

    // Adatbázis sikeres létrehozásának&megnyitásának kezelése
    request.onsuccess = (event: any) => {
      this.db = event.target.result;
      this.loadBuildings();
    };
  }

  private loadBuildings(): void {
    // Object store tranzakció létrehozása és object store lekérése
    const objectStore = this.db
      .transaction(this.objectStoreName)
      .objectStore(this.objectStoreName);

    // Adatbázisban tárolt objektumok bejárása kurzor segítségével
    // Itt lehet opcionálisan további feltételeket definiálni (az SQL "WHERE"-hez hasonlóan)
    objectStore.openCursor().onsuccess = (event: any) => {
      const cursor = event.target.result;

      if (cursor) {
        this.buildings.push(cursor.value);

        cursor.continue(); // Következő elemre lépés
      }
    };
  }
}
