import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMoney'
})
export class FormatMoneyPipe implements PipeTransform {
  public transform(value: number): string {
    return "€" + value;
  }
}
