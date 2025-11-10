import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Building } from '../shared/building';
import { ClickToEarnDirective } from '../shared/click-to-earn.directive';
import { FormatMoneyPipe } from '../shared/format-money.pipe';
import { ManagementService } from '../shared/management.service';
import { Box } from './box/box';
import { BoxComponent } from './box/box.component';
import { BuildingComponent } from './building/building.component';

@Component({
  selector: 'app-main-page',
  imports: [
    BuildingComponent,
    FormatMoneyPipe,
    ClickToEarnDirective,
    MatButton,
    BoxComponent,
    AsyncPipe
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  public money = 10;
  public boxPrice = 5;
  public readonly buildings: Building[];
  protected box$: Observable<Box | undefined>;

  constructor(
    private managementService: ManagementService,
    private router: Router
  ) {
    this.buildings = this.managementService.buildings;
    this.box$ = this.managementService.box$;
  }

    public buyBox():void{
    this.managementService.buyBox();
    this.money -= this.boxPrice;
  }

  public sellBox(price: number):void{
    this.managementService.sellBox();
    this.money += price;
  }

  public createBuilding() {
    this.router.navigateByUrl('shop');
  }

  public onEarn(value: number) {
    this.money += value;
  }

  public onDeleteBuilding(event: { building: Building; amount: number }) {
    this.deleteBuilding(event.building, event.amount);
  }

  public deleteBuilding(building: Building, amount: number) {
    if (building && amount === 0) {
      this.managementService.deleteBuilding(building?.id ?? 0);
    }
  }
}
