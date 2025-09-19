import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { InventoryService } from './services/inventory.service';
import { Assets } from './models/inventory-model';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { LocationService } from '../live-tracking/location.service';
import { LocationLiveTracking } from '../live-tracking/locationlt.model';


@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, RouterModule, SharedModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {

  assets$: Observable<Assets[]> = of([]);

  constructor(
    private inventoryService: InventoryService,
    private router: Router,
    private sharedData: LocationService
  ) { }

  ngOnInit(): void {
    this.assets$ = this.inventoryService.getAllAssets().pipe(map(data => data ?? []));
  }

  // Method to get selected columns for export
  getExportData(): Observable<Partial<Assets>[]> {
    return this.assets$.pipe(
      map((assets: Assets[]) =>
        assets.map(asset => ({
          status: asset.status,
          assetType: asset.assetType,
          assetTypeId: asset.assetTypeId,
          serialNumber: asset.serialNumber
        
        }))
      )
    );
  }

  exportData() {
    this.getExportData().subscribe(exportedData => {
      // Save the exported data to the shared service for Live Tracking
      this.sharedData.setColumnData(exportedData);
      // Optionally, navigate to the live tracking page
      // this.router.navigate(['/livetracking']);
      console.log('Exported Data:', exportedData);
    });
  }

  goToAddAssets() {
    this.router.navigateByUrl('/assets/add');
  }

  goToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }

  goToDeleteAssets() {
    this.router.navigateByUrl('/assets/delete');
  }
}











