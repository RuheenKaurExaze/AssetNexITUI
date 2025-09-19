




import { Component, AfterViewInit, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { TableModule } from 'primeng/table';
import mapboxgl from 'mapbox-gl';
import {of,   Observable} from'rxjs';
import{Router} from '@angular/router';
import { LocationLiveMap } from './locationlm.model';
import { LocationService } from './location.service';

@Component({
  selector: 'app-livemap',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './livemap.component.html',
  styleUrls: ['./livemap.component.css']
})
export class LiveMapComponent implements AfterViewInit, OnInit {
    @Input() locations: { latitude: number, longitude: number, name: string }[] = [];
   
     locationss$: Observable<LocationLiveMap[]> = of([]);

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  map!: mapboxgl.Map;

  selectedMarker?: mapboxgl.Marker;

  markers: mapboxgl.Marker[] = [];


  constructor(private router: Router, private locationService:LocationService){}


  ngAfterViewInit() {
    (mapboxgl as any).accessToken
     = 'pk.eyJ1IjoicnVoZWVuIiwiYSI6ImNtZnAxYjdodTAydDcya3M3MjE2ejFyY2MifQ.4L8TpiIAv0JRXDFbcWLUuA';

    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [71.2090, 28.6139], // India center
      zoom: 4
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', () => {
      this.locations.forEach(loc => {
        new mapboxgl.Marker()
          .setLngLat([loc.longitude, loc.latitude])
          .setPopup(new mapboxgl.Popup().setText(loc.name || ''))
          .addTo(this.map);
      });
    });
  }


  // showOnMap(location: any) {
  //   if (this.selectedMarker) this.selectedMarker.remove();

  //   this.map.flyTo({
  //     center: [location.longitude, location.latitude],
  //     zoom: 10,
  //     speed: 1.8,
  //     curve: 1.2,
  //     essential: true
  //   });

  //   this.selectedMarker = new mapboxgl.Marker({ color: 'red' })
  //     .setLngLat([location.longitude, location.latitude])
  //     .setPopup(new mapboxgl.Popup().setText(location.name || 'Selected Asset'))
  //     .addTo(this.map);

  //   this.selectedMarker.togglePopup();
  // }


  
  
  showOnMap(location: any) {
    const alreadyExists = this.markers.some(
      m => {
        const lngLat = m.getLngLat();
        return lngLat.lng === location.longitude && lngLat.lat === location.latitude;
      }
    );
    if (alreadyExists) return;

    this.map.flyTo({
      center: [location.longitude, location.latitude],
      zoom: 10,
      speed: 1.8,
      curve: 1.2,
      essential: true
    });

    const marker = new mapboxgl.Marker({ color: 'red' })
      .setLngLat([location.longitude, location.latitude])
      .setPopup(new mapboxgl.Popup().setText(location.name || 'Selected Asset'))
      .addTo(this.map);

    marker.togglePopup();

    this.markers.push(marker); 
+

    marker.togglePopup();

  }

   ngOnInit(): void {
    this.locationss$= this.locationService.getAssetLocation();
    this.locationService.getAssetLocation().subscribe(data => {
      console.log('LOCATION MAP TABLE:', data);
      this.locationss$ = of(data);
    });
}

  
}









