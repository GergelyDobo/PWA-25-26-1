import { Injectable } from '@angular/core';
import { Building } from './building';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  public readonly buildings: Building[] = [
    {
      name: "Irinyi",
      income: 1,
      cost: 10,
      amount: 1
    },
    {
      name: "Bolyai",
      income: 3,
      cost: 50,
      amount: 0
    }
  ];

  public createBuilding(): boolean {
    const name = window.prompt("Type the name of the new building here!");
    if(name === null || name.trim().length === 0) {
      return false;
    }

    const building: Building = {
      name,
      income: 10,
      cost: 100,
      amount: 0
    };

    this.buildings.push(building);
    return true;
  }
}
