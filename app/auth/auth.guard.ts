
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

//    export const authGuard: CanActivateFn = (route,state) => { const auth = inject(AuthService); const router = inject(Router);
// if (auth.isAuthenticated()) return true; router.navigate(['/login/auth']); 
// return false; 
//    };
   

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login/auth'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
