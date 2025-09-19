import { Component,Injectable, NgModule, OnInit } from '@angular/core';
import { RealAlertsService} from './real-alerts.service';
import { FormsModule } from '@angular/forms';

@Injectable({
  providedIn:'root'})

@Component({
  selector: 'app-alert',
  imports:[FormsModule],
  templateUrl: './real-alerts.component.html',
})

export class RealAlertsComponent implements OnInit {
  alerts: string[] = [];
  private ws! : WebSocket;

  constructor(private realalertsService: RealAlertsService) {}

  connect(){
    this.ws= new WebSocket('wss://localhost:7195/alerts');
    this.ws.onmessage= (event) => {
      alert(`New Alert: ${event.data}`)
    }
  };

  ngOnInit() {
    
    this.realalertsService.startConnection();
    this.realalertsService.listenForAlerts((message: string) => {
      this.alerts.push(message);


    });
  }



}






