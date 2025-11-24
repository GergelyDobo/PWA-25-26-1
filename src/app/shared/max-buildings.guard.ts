import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ManagementService } from './management.service';
import { map, tap } from 'rxjs';

export const maxBuildingsGuard: CanActivateFn = (route, state) => {
  const managementService = inject(ManagementService);
  const router = inject(Router);

  return managementService.buildings$.pipe(
    map(buildings => buildings.length < 5),
    tap(canActivate => {
      if(!canActivate) {
        router.navigateByUrl("main");
      }
    })
  );
};
