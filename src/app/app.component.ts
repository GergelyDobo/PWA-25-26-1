import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbar,
    MatIcon,
    MatDrawerContainer,
    MatDrawer,
    MatListModule,
    MatDrawerContent,
    MatIconButton,
  ],
})
export class AppComponent {
  private router = inject(Router);
  createBuilding() {
    this.router.navigateByUrl('shop');
  }
  openSettings(): void {
    this.router.navigateByUrl('settings');
  }
}
