import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Building } from '../../shared/building';
import { FormatMoneyPipe } from '../../shared/format-money.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ManagementService } from '../../shared/management.service';

@Component({
  selector: 'app-building',
  imports: [FormatMoneyPipe, MatButtonModule, MatIconModule],
  templateUrl: './building.component.html',
  styleUrl: './building.component.scss',
})
export class BuildingComponent {
  @Input() public building?: Building;
  @Input() public money = 0;
  @Output() public moneyChange = new EventEmitter<number>();
  @Output() public readonly deleteBuilding = new EventEmitter<{
    building: Building;
    amount: number;
  }>();

  private managementService = inject(ManagementService);

  constructor() {
    setInterval(() => {
      if (this.building) {
        this.moneyChange.emit(
          this.money + this.building.income * this.building.amount
        );
      }
    }, 1000);
  }

  public buy() {
    if (this.building && this.money >= this.building.cost) {
      this.building.amount++;
      this.moneyChange.emit(this.money - this.building.cost);
    }
  }

  public onDelete() {
    if (this.building) {
      this.building.amount--;
      if (this.building.amount === 0) {
        this.deleteBuilding.emit({
          building: this.building,
          amount: this.building.amount,
        });
        this.checkGameOver();
      }
    }
  }

  private checkGameOver() {
    if (this.managementService.checkGameOver()) {
      alert(
        'Game Over! You have no buildings and not enough money to buy one.'
      );
      window.location.reload();
    }
  }
}
