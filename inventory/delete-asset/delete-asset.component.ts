import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Assets } from '../models/inventory-model';

@Component({
  selector: 'app-delete-asset',
  imports: [],
  templateUrl: './delete-asset.component.html',
  styleUrl: './delete-asset.component.css'
})
export class DeleteAssetComponent {

  constructor(private http: HttpClient ){}
  
  Observable:Assets[]=[];



}
