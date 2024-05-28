import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';


@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;

  constructor() { }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                          .withUrl('https://localhost:7081/notifyHub')
                          .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public addTransferChartDataListener = (callback: (message: string) => void) => {
    this.hubConnection.on('ReceiveMessage', (message) => {
      callback(message);
    });
  }
}
