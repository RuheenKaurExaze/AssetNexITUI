
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { RealAlertsModel } from './real-alerts.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RealAlertsService {


  constructor(private http: HttpClient){}

  private hubConnection?: signalR.HubConnection;
  private alertsSubject= new BehaviorSubject<RealAlertsModel[]>([]);
  alerts$ = this.alertsSubject.asObservable();
err:any;


  startConnection(accessToken?:string)
  {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl("https://localhost:7195/hubs/alerts",
      {
        accessTokenFactory:() => accessToken ?? ""
      }
      ).withAutomaticReconnect().build();

      this.hubConnection.start().then(()=> {
        console.log('SignalR connected');
        this.registerListeners();

      }).catch(err=> console.error('SignalR connect error', err));
    }

    private registerListeners()
{
  if (!this.hubConnection) return;
  
  this.hubConnection.on('ReceiveInventoryAlert', (payload: RealAlertsModel)=>
  {
    const current = this.alertsSubject.value.slice()
    current.unshift(payload);
    this.alertsSubject.next(current);

  });
}

stop()
{
  this.hubConnection?.stop();
}

 deleteRealAlerts():Observable<RealAlertsModel>
 {
  return this.http.delete<RealAlertsModel>(`${environment.apibaseUrl}/api/Alerts/deleterealalerts`)
 }


getRealAlerts():Observable<RealAlertsModel[]>
  {
return this.http.get<RealAlertsModel[]>(`${environment.apibaseUrl}/api/Alerts/realalerts`, );
  }

}








