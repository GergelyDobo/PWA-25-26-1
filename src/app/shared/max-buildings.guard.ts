import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ManagementService } from './management.service';

export const maxBuildingsGuard: CanActivateFn = (route, state) => {
  const managementService = inject(ManagementService);
  const router = inject(Router);

  if(managementService.buildings.length < 5) {
    return true;
  }

  router.navigateByUrl("main");
  return false;
};
