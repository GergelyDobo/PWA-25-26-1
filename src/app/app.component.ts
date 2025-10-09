import { Component } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet]
})
export class AppComponent {}
