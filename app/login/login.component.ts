import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { LoginModel } from './models/login.model';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  loginRequest = {
    email: '',
    error:'',
    password: ''
  };

  constructor(private authService: AuthService, private router:Router){}

  goToDashboard()
  {
   this.router.navigateByUrl('/dashboard');
  }
}
