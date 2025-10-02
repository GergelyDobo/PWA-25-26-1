import { Component } from '@angular/core';
import { Building } from '../shared/building';
import { ManagementService } from '../shared/management.service';
import { ClickToEarnDirective } from '../shared/click-to-earn.directive';
import { FormatMoneyPipe } from '../shared/format-money.pipe';
import { BuildingComponent } from './building/building.component';

@Component({
  selector: 'app-main-page',
  imports: [
    BuildingComponent,
    FormatMoneyPipe,
    ClickToEarnDirective
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
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

  constructor(private managementService: ManagementService) {}

  public createBuilding() {
    const building = this.managementService.createBuilding();
    this.buildings.push(building);
  }

  public onEarn(value: number) {
    this.money += value;
  }
}
