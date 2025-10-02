import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormatMoneyPipe } from '../shared/format-money.pipe';
import { Building } from '../shared/building';

@Component({
  selector: 'app-building',
  imports: [FormatMoneyPipe],
  templateUrl: './building.component.html',
  styleUrl: './building.component.scss'
})
export class BuildingComponent {
  @Input() public building?: Building;
  @Input() public money = 0;
  @Output() public moneyChange = new EventEmitter<number>();

  constructor() {
    setInterval(() => {
      if(this.building) {
        this.moneyChange.emit(
          this.money + this.building.income * this.building.amount
        );
      }
    }, 1000);
  }

  public buy() {
    if(this.building && this.money >= this.building.cost) {
      this.building.amount++;
      this.moneyChange.emit(this.money - this.building.cost);
    }
  }
}
