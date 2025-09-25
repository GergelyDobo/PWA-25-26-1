import { Component } from '@angular/core';
import { BuildingComponent } from './building/building.component';

export interface Building {
  name: string;
  income: number;
  cost: number;
  amount: number;
}

@Component({
  selector: 'app-root',
  imports: [
    BuildingComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public money = 10;

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

  public createBuilding() {
    const name = window.prompt("Type the name of the new building here!") ?? "unnamed";
    const building: Building = {
      name,
      income: 10,
      cost: 100,
      amount: 0
    };
    this.buildings.push(building);
  }
}
