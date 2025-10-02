import { Injectable } from '@angular/core';
import { Building } from './building';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  public createBuilding(): Building {
    const name = window.prompt("Type the name of the new building here!") ?? "unnamed";
    return {
      name,
      income: 10,
      cost: 100,
      amount: 0
    };
  }
}
