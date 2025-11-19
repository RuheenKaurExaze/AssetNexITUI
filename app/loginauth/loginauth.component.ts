import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-loginauth',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './loginauth.component.html',
  styleUrls: ['./loginauth.component.css']
})
export class LoginauthComponent implements OnInit {
  email: string = '';
  password: string = '';
  error = '';
  loading = false;
  isAdmin: boolean = false;
  returnUrl = '/dashboard';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  goToLanding(): void {
    this.router.navigateByUrl('/landing');
  }

  goTo(route: string): void {
    this.router.navigateByUrl(route);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/landing');
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  ngOnInit(): void {
   
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl(this.returnUrl);
      return;
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }
login(): void {
  this.error = '';
  this.loading = true;

  if (!this.email || !this.password) {
    this.error = 'Please fill in all required fields';
    this.loading = false;
    return;
  }

  if (!this.isValidEmail(this.email)) {
    this.error = 'Please enter a valid email';
    this.loading = false;
    return;
  }

  const request = {
    email: this.email.trim(),
    password: this.password.trim()
  };

  this.authService.login(request).subscribe({
    next: (res) => {
      console.log('Login successful', res);

      if (res?.accessToken) {
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.error = 'Unexpected response. Token missing.';
      }

      this.loading = false;
    },
    error: (err) => {
      console.error('Login failed', err);
      if (err.status === 401) {
        this.error = 'Invalid email or password';
      } else if (err.error?.message) {
        this.error = err.error.message;
      } else {
        this.error = 'Login failed. Please try again.';
      }

      this.loading = false;
    }
  });
}



}