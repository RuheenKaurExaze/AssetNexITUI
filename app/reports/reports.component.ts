
// import { Component } from '@angular/core';
// import { ReportService, ReportEntry } from './report.service';

// @Component({
//   selector: 'app-reports',
//   templateUrl: './reports.component.html',
//   styleUrl: './reports.component.css'
// })
// export class ReportsComponent {
//   logs: ReportEntry[] = [];

//   constructor(private reportService: ReportService) {}

//   ngOnInit() {
//     this.logs = this.reportService.getLogs();
//   }

// reports.component.ts


import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ReportService, PageVisit } from '../reports/report.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from 'express';
import { Time } from '@angular/common';
import { RouterModule } from '@angular/router';
import {TableModule} from 'primeng/table' ;
import {SharedModule} from 'primeng/api';


@Component({
  selector: 'app-reports',
  imports: [CommonModule, FormsModule,RouterModule,SharedModule,TableModule], 
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  
  visits: PageVisit[] = [];
  model:PageVisit;
  data: any;
  visits$:Observable<PageVisit[]>= of([]);
  
  
constructor(private reportService: ReportService) {
this.model={
timestamp:new Date(),
component:'',
url:'', 
}
}
  
  ngOnInit(): void {
    this.visits = this.reportService.getVisits();
    console.log('VISITS DATA:', this.visits);
  }
}
