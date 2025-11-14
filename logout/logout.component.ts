import { Component } from '@angular/core';
import { AuthService } from '../app/auth/auth.service';
import { HttpClient } from '@microsoft/signalr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  goTo:any;

  constructor(private authService: AuthService,  private router: Router ){}



    logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('tokenExpiry');
  }

  goToLanding(){
this.router.navigateByUrl('/landing');

  }
}
