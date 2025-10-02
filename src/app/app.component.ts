import { Component } from '@angular/core';
import { BuildingComponent } from './building/building.component';
import { ManagementService } from './shared/management.service';
import { FormatMoneyPipe } from './shared/format-money.pipe';
import { ClickToEarnDirective } from './shared/click-to-earn.directive';
import { Building } from './shared/building';

@Component({
  selector: 'app-root',
  imports: [
    BuildingComponent,
    FormatMoneyPipe,
    ClickToEarnDirective
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

  constructor(private managementService: ManagementService) {}

  public createBuilding() {
    const building = this.managementService.createBuilding();
    this.buildings.push(building);
  }

  public onEarn(value: number) {
    this.money += value;
  }
}
