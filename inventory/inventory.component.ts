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


@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, RouterModule, SharedModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {

  assets$: Observable<Assets[]> = of([]);
  goTo:any;

  constructor(
    private inventoryService: InventoryService,
    private router: Router,
    private sharedData: LocationService,
  
  ) { }

  ngOnInit(): void {
    this.assets$ = this.inventoryService.getAllAssets().pipe(map(data => data ?? []));
  }


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
      this.sharedData.setColumnData(exportedData);
    
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

  goToLanding(){
    this.router.navigateByUrl('/landing');
  }
}











