
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { DatePickerTemplates } from 'primeng/datepicker';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { Router } from '@angular/router';
import { LiveMapComponent } from "./livemap.component";
import { LocationLiveTracking } from './locationlt.model';
import { environment } from '../environments/environment';
import { LocationLiveMap } from './locationlm.model';


 @Injectable({
      providedIn: 'root',
    })

export class LocationService {


constructor( private http : HttpClient, private router:Router) { }

data:any; 

  private locationsSubject = new BehaviorSubject<Location[]>([]);
  locations$ = this.locationsSubject.asObservable();

 locations: LocationLiveTracking[] = [];


getAllLocation() : Observable<LocationLiveTracking[]>

  {
return this.http.get<LocationLiveTracking[]>(`${environment.apibaseUrl}/api/Location/locations`);
  };

  createLocation(Data:LocationLiveTracking):Observable<LocationLiveTracking[]>
  {
    return this.http.post<LocationLiveTracking[]>(`${environment.apibaseUrl}/api/Location/locations/create`, Data);
  }


  getAssetLocation():Observable<LocationLiveMap[]>
{
return this.http.get<LocationLiveMap[]>(`${environment.apibaseUrl}/api/AssetLocations`)
// .subscribe(data=>{
//   this.locations=data;
// });
};


 private columnDataSource = new BehaviorSubject<any[]>([]);
 columnData$ = this.columnDataSource.asObservable();
 private setColumnDataSource = new BehaviorSubject<any[]>([]);
 setColumnData$ = this.setColumnDataSource.asObservable();

 
  setColumnData:any;
  navigateToLiveTracking() {

this.router.navigateByUrl('/live-tracking');

      this.setColumnData(this.data)
       {this.columnDataSource.next(this.data);

  }

}

}


 




    
    


