import { Component } from '@angular/core';
import { Building } from '../shared/building';
import { ManagementService } from '../shared/management.service';
import { ClickToEarnDirective } from '../shared/click-to-earn.directive';
import { FormatMoneyPipe } from '../shared/format-money.pipe';
import { BuildingComponent } from './building/building.component';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-main-page',
  imports: [
    BuildingComponent,
    FormatMoneyPipe,
    ClickToEarnDirective,
    MatButton
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  public money = 10;
  public readonly buildings: Building[];

  constructor(
    private managementService: ManagementService,
    private router: Router
  ) {
    this.buildings = this.managementService.buildings;
  }

  public createBuilding() {
    this.router.navigateByUrl("shop");
  }

  public onEarn(value: number) {
    this.money += value;
  }
}
