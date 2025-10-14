import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Currency } from './currency';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  imports: [MatFormFieldModule, MatSelectModule, MatButton],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  public currencies: Currency[];
  public selectedCurrencyCode: string;

  private settingsService = inject(SettingsService);
  private router = inject(Router);

  constructor() {
    this.currencies = this.settingsService.currencies;
    this.selectedCurrencyCode = this.settingsService.selectedCurrencyCode;
  }

  public onCurrencySelect(selection: MatSelectChange): void {
    this.settingsService.selectedCurrencyCode = selection.value;
  }

  public backToMain() {
    this.router.navigateByUrl('main');
  }
}
