

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import{CommonModule} from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-loginauth',
  imports:[ReactiveFormsModule,CommonModule, FormsModule],
  templateUrl: './loginauth.component.html',
  styleUrls: ['./loginauth.component.css']
})



export class LoginauthComponent implements OnInit {
  loginForm!: FormGroup; 
email='';
password='';
error='';

constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}



  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const request = this.loginForm.value; 

    this.authService.login(request).subscribe({
      next: (res) => {
        console.log('Login success', res);
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }
}
