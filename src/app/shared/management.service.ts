import { Injectable } from '@angular/core';
import { Building } from './building';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  public readonly buildings: Building[] = [
    {
      name: 'Irinyi',
      income: 1,
      cost: 10,
      amount: 1,
    },
    {
      name: 'Bolyai',
      income: 3,
      cost: 50,
      amount: 0,
    },
  ];

  public createBuilding(name: string, income: number, price: number): boolean {
    const building: Building = {
      name,
      income,
      cost: price,
      amount: 0,
    };

    this.buildings.push(building);
    return true;
  }

  public deleteBuilding(building: Building): void {
    const index = this.buildings.findIndex((b) => b.name === building.name);
    if (index !== -1) {
      this.buildings.splice(index, 1);
    }
  }

  public checkGameOver(money: number): boolean {
    const hasAnyBuilding = this.buildings.some((b) => b.amount > 0);
    const canAfford = this.buildings.some((b) => money >= b.cost);
    return !hasAnyBuilding && !canAfford;
  }
}
