import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { LocationService } from './location.service';
import { Router } from '@angular/router';
import { LiveMapComponent } from "./livemap.component";
import { LocationLiveTracking } from './locationlt.model';



@Component({
  selector: 'app-live-tracking',
  standalone: true,
  imports: [TableModule, CommonModule, FormsModule, RouterModule, SharedModule],
  templateUrl: './live-tracking.component.html',
  styleUrl: './live-tracking.component.css'
})

export class LiveTrackingComponent implements OnInit {


  constructor( private router:Router, private locationService: LocationService) {}
  // locations: LocationLiveTracking[] = [];
  goToLiveMap()
  {
    this.router.navigateByUrl('/livemap');
  }

  live$: Observable<LocationLiveTracking[]> = of([]);
  sharedData:any[]=[];
  trackingData: any[] = [];
  receivedColumns: any[] = [];
  handleClick(event:MouseEvent): void {}
 mapClicked($event: any) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
 }
   ngOnInit(): void {
  this.live$ = this.locationService.getAllLocation();
  this.locationService.getAllLocation().subscribe(data => {
    console.log('LOCATION DATA:', data);
    this.live$ = of(data);
  });

  // this.locationService.getColumnData().subscribe((data: any[]) => {
  //   this.trackingData = data || [];
  // });
  }

  zoom: number = 8;
  lat: number = 51.673858;
  lng: number = 7.815982;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: true
	  }
  ]
}


interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}



