
import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { time } from 'console';
import { filter, timestamp } from 'rxjs/operators';

export interface PageVisit {
  timestamp: Date;
  component: string;
  url: string;

}

@Injectable({
  providedIn: 'root'
})

export class ReportService {
  private visits: PageVisit[] = [];
  private storageKey = 'pageVisits';

  constructor(private router: Router) {
   
    const saved= localStorage.getItem(this.storageKey);
    if(saved){

      this.visits=JSON.parse(saved).map((v:any)=>({
        ...v,
        timestamp:new Date(v.timestamp) 

      }));
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      const component = this.mapUrlToComponent(url);
      const visit: PageVisit = { timestamp: new Date(), component, url };
      this.visits.push(visit);
      this.saveVisits();
    });
  }
  

  getVisits(): PageVisit[]{

    return this.visits;
  }

  private saveVisits() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.visits));
  }

  private mapUrlToComponent(url: string): string {

    if (url.includes('dashboard')) return 'Dashboard';
    if (url.includes('login')) return 'Login Page';
    if (url.includes('reports')) return 'Reports Page';
    if (url.includes('about')) return 'About Page'; 
    if (url.includes('help')) return 'Help Page';
     if (url.includes('newsupport')) return 'New Support Page';
    if (url.includes('assets')) return 'Asset Inventory Page'; 
    if (url.includes('e-dispose')) return 'E-Dispose Page'; 
    if (url.includes('assets/support')) return 'Support Page';
    if (url.includes('guidelines')) return 'E-Dispose Guidelines Page';
    if (url.includes('add-edispose')) return 'Add E-Dispose Entry Page';
    if (url.includes('update-edispose')) return 'Update E-Dispose Entry Page';
    if (url.includes('software-license')) return 'Software License Page';           
    if (url.includes('add-software-license')) return 'Add Software License Page';
    if (url.includes('hardware')) return 'Hardware Support Page';
    if (url.includes('hardware-grid')) return 'Hardware Grid Page';
    return 'Unknown Component';
  }
}
