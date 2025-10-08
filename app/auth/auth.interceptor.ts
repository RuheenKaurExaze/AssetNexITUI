
// import { Injectable } from '@angular/core';
// import {HttpInterceptor,HttpRequest,HttpHandler,HttpEvent} from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

// @Injectable()

// export class AuthInterceptor implements HttpInterceptor
// {
// constructor(private authService: AuthService) {}
// intercept(req: HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>
// {
//   const token = this.authService.getToken();
//   if(token){
//     const cloned = req.clone({
// setHeaders: {Authorization: `Bearer ${token}`}
//     })

//     return next.handle(cloned);

//       }

//   return next.handle(req);
// }




// }
// }



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

    if (token) {
      const cloned = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next.handle(cloned);
    } else {
      this.router.navigate(['/login/auth']);
      return next.handle(req);
    }
  }
}
