import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import{NgxCaptchaModule} from 'ngx-captcha';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
 import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { LiveMapComponent } from '../live-tracking/livemap.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { TokenInterceptor } from './auth/auth.interceptor';
import {inject} from '@angular/core';
import { CanActivateFn, Router } from '@angular/router'; 
import { AuthService } from './auth/auth.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    NgxCaptchaModule,ReactiveFormsModule,FormsModule,
  GoogleMapsModule,    ToastrModule.forRoot({

      preventDuplicates: false,
      progressBar: true,
      countDuplicates: true,
      extendedTimeOut: 3000,
      positionClass: 'toast-bottom-right',
      
     

    }),
  ],

 
  declarations: [],
  bootstrap:[],
  providers: [{ provide: 'BASE_API_URL', useValue: 'http://localhost:4200' },TokenInterceptor],
  
})
export class AppModule {}


