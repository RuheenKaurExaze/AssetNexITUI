// import { Injectable } from '@angular/core';
// import { CanActivate, Router, UrlTree } from '@angular/router';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })

// export class AuthGuard implements CanActivate{

//   constructor (private authService:AuthService, private router: Router){}

//   canActivate():boolean| UrlTree{
//     const token = this.authService.getToken();
//     if(token){
//       return true;
//     }
//     else {
//       return this.router.parseUrl('/login/auth')
//     }
//   }
// }

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login/auth'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
