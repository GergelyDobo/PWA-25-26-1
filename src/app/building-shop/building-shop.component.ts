import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ManagementService } from '../shared/management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-building-shop',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './building-shop.component.html',
  styleUrl: './building-shop.component.scss',
})
export class BuildingShopComponent {
  public buildingForm: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private ms: ManagementService,
    private router: Router
  ) {
    this.buildingForm = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      income: [1],
      price: [10, Validators.min(10)],
    });
  }

  public onSubmit() {
    if (this.buildingForm.valid) {
      this.ms.createBuilding(
        this.buildingForm.value.name,
        this.buildingForm.value.income,
        this.buildingForm.value.price
      );
      this.router.navigateByUrl('main');
    }
  }
}
