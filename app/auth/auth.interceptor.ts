
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
const refreshtoken= this.authService.getRefreshToken();

    if(req.url.includes('/auth/login') || req.url.includes('/auth/register'))
    {
            return next.handle(req);
    }

    if (token) {
      const cloned = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next.handle(cloned);
    } 

    else {
      this.router.navigate(['/login/auth']);
      return next.handle(req);
    }
  }
}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const accessToken = this.authService.getToken();

//     let modifiedReq = req;
//     if (accessToken) {
//       modifiedReq = this.addToken(req, accessToken);
//     }

//     return next.handle(modifiedReq).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === 401 && !this.isRefreshing) {
//           return this.handleRefreshToken(req, next);
//         }
//         return throwError(() => error);
//       })
//     );
//   }

//   private addToken(req: HttpRequest<any>, token: string) {
//     return req.clone({
//       setHeaders: { Authorization: `Bearer ${token}` }
//     });
//   }

//   private handleRefreshToken(req: HttpRequest<any>, next: HttpHandler) {
//     this.isRefreshing = true;

//     return this.authService.isRefreshed().pipe(
//       switchMap((tokenResponse: any) => {
//         this.isRefreshing = false;

//         this.authService.storeTokens(tokenResponse.accessToken, tokenResponse.refreshToken);

//         const clonedReq = this.addToken(req, tokenResponse.accessToken);

//         return next.handle(clonedReq);
//       }),
//       catchError(err => {
//         this.isRefreshing = false;
//         this.authService.logout();
//         this.router.navigate(['/login/auth']);
//         return throwError(() => err);
//       })
//     );
//   }
// }
