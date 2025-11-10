import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormatMoneyPipe } from '../../shared/format-money.pipe';
import { Box } from './box';

@Component({
  selector: 'app-box',
  imports: [FormatMoneyPipe, MatButtonModule],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss'
})
export class BoxComponent {
  @Input({ required: true }) public box!: Box;
  @Output() public sellBox = new EventEmitter<void>();
}
