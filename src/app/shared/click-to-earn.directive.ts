import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickToEarn]'
})
export class ClickToEarnDirective {
  @Output() public earn = new EventEmitter<number>();

  @HostListener("click")
  public onClick() {
    this.earn.emit(1);
  }
}
