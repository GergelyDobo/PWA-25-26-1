import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { maxBuildingsGuard } from './shared/max-buildings.guard';

export const routes: Routes = [
  {
    path: 'main',
    component: MainPageComponent,
  },
  {
    path: 'shop',
    loadComponent: () =>
      import('./building-shop/building-shop.component').then(
        (c) => c.BuildingShopComponent
      ),
    canActivate: [maxBuildingsGuard],
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.component').then((c) => c.SettingsComponent),
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
