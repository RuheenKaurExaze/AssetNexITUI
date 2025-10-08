import { Component, OnInit, OnDestroy } from '@angular/core';
import { RealAlertsService } from './real-alerts.service';
import { RealAlertsModel } from './real-alerts.model';
import { FormsModule, NgModel } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import {Router} from '@angular/router';

@Component({
  selector: 'app-alerts',
  imports:[FormsModule,SharedModule, TableModule],
  templateUrl: './real-alerts.component.html'
})
export class RealAlertsComponent implements OnInit, OnDestroy {
  alerts: RealAlertsModel[] = [];
  goTo: any;

  constructor(private realalertsService: RealAlertsService,  private router: Router ) {}

  ngOnInit() {
    this.realalertsService.startConnection();
    this.realalertsService.alerts$.subscribe(alerts => {
      this.alerts = alerts;
    });
  }

  ngOnDestroy() {
    this.realalertsService.stop();
  }

  goToLanding()
  {
    this.router.navigateByUrl('/landing');
  }

  goToEDispose()
  {
    this.router.navigateByUrl('ewaste/disposable-assets')
  }

  goToGuidelines()
  {
    this.router.navigateByUrl('/ewaste/disposable-assets/guidelines');
  }

  goToAddEDispose()
  {
    this.router.navigateByUrl('/ewaste/disposable-assets/add');
  }

  goToDashboard()
  {
    this.router.navigateByUrl('/dashboard')
  }

}
