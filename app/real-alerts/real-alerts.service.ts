// import{Component, Injectable} from '@angular/core';
// import * as signalR from '@microsoft/signalr';
// import { environment } from '../../environments/environment';
// import { HttpClient } from '@angular/common/http';


// @Injectable({
//   providedIn: 'root',
// })


// export class RealAlertsService{
  
//   private hubConnection!: signalR.HubConnection;
// constructor(private http: HttpClient) {}

//    this.hubConnection
//       .start()
//       .then(() => console.log('SignalR Connection Started'))
//       .catch(err => console.error('Error while starting connection: ', err));
  
//   listenForAlerts(callback: (message: string) => void) {
//     this.hubConnection.on('ReceiveAlert', callback);
//   }
  
//   startConnection()
//   {
//   return this.http.hubConnection = new signalR.HubConnectionBuilder()
//       .withUrl(`${environment.apibaseUrl}/api/alerts`) 
//       .build();
//   };


// }


    



 

import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RealAlertsService {

  private hubConnection!: signalR.HubConnection;

  constructor() {}

  // Start the connection
  startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apibaseUrl}/alertsHub`) // your SignalR hub URL
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection started'))
      .catch(err => console.error(' Error while starting connection: ', err));
  }

  // Subscribe to alerts
  listenForAlerts(callback: (message: string) => void): void {
    if (!this.hubConnection) {
      console.error('Hub connection not started');
      return;
    }

    this.hubConnection.on('ReceiveAlert', callback);
  }

  // Optionally stop the connection
  stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
}
