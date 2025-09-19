import { Component } from '@angular/core';
import { GoogleMapsModule } from "@angular/google-maps";

@Component({
  selector: 'app-welcome',
  imports: [GoogleMapsModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
