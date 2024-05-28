import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalrService } from './Services/signalr.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'RealTimeNotification';

  public notifications: string[] = [];

  constructor(private signalRService: SignalrService) { }

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener((message: string) => {
      this.notifications.push(message);
    });
    
  }
}
