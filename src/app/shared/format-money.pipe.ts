import { inject, Pipe, PipeTransform } from '@angular/core';
import { SettingsService } from '../settings/settings.service';

@Pipe({
  name: 'formatMoney',
})
export class FormatMoneyPipe implements PipeTransform {
  private settingsService = inject(SettingsService);
  public transform(value: number): string {
    return value + ' ' + this.settingsService.selectedCurrencyCode;
  }
}
