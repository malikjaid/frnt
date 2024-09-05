import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Role } from '../enum/role';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const role: Role = authService?.loginRole;
  const path = route?.routeConfig?.path;
  const roleRoutes: any = {
    [Role.admin]: [
      'create-organisation',
      'organisation-list',
      'doctor-list',
      'create-doctor',
      'create-prompt',
      'create-specialization',
      'specialization-list',
      'prompt-list',
      'dashboard',
      'admin',
    ],
    [Role.organisation]: [
      'create-doctor',
      'doctor-list',
      'patient-history',
      'prompt-list',
      'Organization',
    ],
    [Role.doctor]: [
      'patient-create',
      'patient-history',
      'doctor',
    ]
  };
  if (role && path && roleRoutes[role]?.includes(path)) {
    return true;
  } else {
    return false;
  }

};
