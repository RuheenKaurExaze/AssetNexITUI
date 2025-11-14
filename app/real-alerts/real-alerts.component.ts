import { Component, OnInit, OnDestroy } from '@angular/core';
import { RealAlertsService } from './real-alerts.service';
import { RealAlertsModel } from './real-alerts.model';
import { FormsModule, NgModel } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import {Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { signal} from '@angular/core';
import { Observable,of, Subscription } from 'rxjs';
import { DatePicker } from 'primeng/datepicker';



@Component({
  selector: 'app-alerts',
  imports:[FormsModule,SharedModule, TableModule,CommonModule],
  templateUrl: './real-alerts.component.html'
})
export class RealAlertsComponent implements OnInit {
    model:RealAlertsModel;
   data:any;
  goTo:any;
  sub? : Subscription;

    alerts$? : Observable<RealAlertsModel[]>= of([]);
    
    private realalertsSubscription? : Subscription ;
  
    constructor(private router : Router, private realAlertsService : RealAlertsService) {

      this.model={
        id:'',
        assetId:'',
     assetName:'',
     threshold:'',
     currentStock:'',
      level:'',
      message:'',
     createdAt:'',
      }
    }

alerts:RealAlertsModel[]=[];

  ngOnInit(): void
  {
    this.realAlertsService.startConnection();
    this.sub=this.realAlertsService.alerts$.subscribe( a=> this.alerts = a);
    this.alerts$=this.realAlertsService.getRealAlerts();

      this.realAlertsService.getRealAlerts().subscribe(data => {
    console.log('RealAlerts:', data);
    this.alerts$ = of(data);



  });
  }

  ngOnDestroy(): void {
    
    this.sub?.unsubscribe;
    this.realAlertsService.stop();

  }

  goToLanding()
  {
    this.router.navigateByUrl('/landing');
  }

  goToEDispose()
  {
    this.router.navigateByUrl('ewaste/disposable-assets');
  }

  goToGuidelines()
  {
    this.router.navigateByUrl('/ewaste/disposable-assets/guidelines');
  }

  goToAddEDispose()
  {
    this.router.navigateByUrl('/ewaste/disposable-assets/add');
  }

  goToDelete()
  {
    this.router.navigateByUrl('assets/delete');
  }

  goToDashboard()
  {
    this.router.navigateByUrl('/dashboard');
  }

}

