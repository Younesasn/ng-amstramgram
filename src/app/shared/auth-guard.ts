import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthApi } from './api/auth-api';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authApi = inject(AuthApi);

  if (authApi.isLogged()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
