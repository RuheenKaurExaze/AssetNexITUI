
import { provideHttpClient, withFetch} from '@angular/common/http';
import { appRoutes } from './app.routes';
import { ApplicationConfig} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideRouter} from '@angular/router';
import { TokenInterceptor } from './auth/auth.interceptor';

 import { HTTP_INTERCEPTORS } from '@angular/common/http';




 export const appConfig: ApplicationConfig = {
   providers: [ provideRouter(appRoutes),  provideHttpClient(withFetch()), provideAnimationsAsync(),
 
        providePrimeNG({
    theme: {
       
        options: {
            darkModeSelector: '.my-app-dark'
        }
    }
}),
{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
              ]

          
 };


providers: [
  
]

