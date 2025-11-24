import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BoxService } from '../shared/box.service';
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
  public boxPrice = 5;
  public money: number;
  public readonly buildings: Building[];
  protected selectedBoxes$: Observable<Box[]>;

  constructor(
    private managementService: ManagementService,
    private boxService: BoxService,
    private router: Router
  ) {
    this.buildings = this.managementService.buildings;
    this.money = this.managementService.money;
    this.selectedBoxes$ = this.boxService.selectedBoxes$;
  }

  public buyBox():void{
    this.boxService.buyBox();
    this.onSpend(this.boxPrice);
  }

  public sellBox(price: number, id: string):void{
    this.boxService.sellBox(id);
    this.onEarn(price);
  }

  public createBuilding() {
    this.router.navigateByUrl('shop');
  }

  public onEarn(value: number) {
    this.money += value;
    this.managementService.money = this.money;
  }

  public onSpend(value: number) {
    this.money -= value;
    this.managementService.money = this.money;
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
