import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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
  error: string = '';
  loading: boolean = false;
  isAdmin:boolean = false;
  selectedRole = 'admin';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  goToLanding(): void {
    this.router.navigateByUrl('/landing');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/landing');
  }

  login(): void {
    this.error = '';
    this.loading = true;

    this.selectedRole = this.isAdmin ? 'admin' : 'user';


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
console.log('Login response:', res);
localStorage.setItem('accessToken', res.accessToken);
localStorage.setItem('refreshToken', res.refreshToken);
localStorage.setItem('tokenExpiry', res.expiration);
localStorage.setItem('role', res.role);
        if (!res.accessToken) {
          this.error = 'Unexpected server response. Token missing.';
          this.loading = false;
          return;
          
        }

        // Save role
        localStorage.setItem('role', res.role);

        // Clean redirect — NO returnUrl mess
        if (res.role === 'Admin') {
          this.router.navigateByUrl('/dashboard');   // FIXED
        } else if (res.role === 'User') {
          this.router.navigateByUrl('/dashboarduser');  // FIXED
        }

        this.loading = false;
      },

      error: (err) => {
        console.error('Login failed', err);

        if (err.status === 401) {
          this.error = 'Invalid email or password';
        } else {
          this.error = 'Login failed. Please try again.';
        }

        this.loading = false;
      }
    });
  }

//problem is still the same, once logged in the page wont take to login auth to sign in again->
// //also admin credential is showing valid in user toggle

//

  // ngOnInit(): void {
  //   // Auto redirect if logged in
  //   const role = localStorage.getItem('role');

  //   if (role === 'Admin') {
  //     this.router.navigateByUrl('/dashboard');
  //     return;
  //   }

  //   if (role === 'User') {
  //     this.router.navigateByUrl('/dashboarduser');
  //     return;
  //   }
  // }



ngOnInit(): void {
  // Prevent auto login if the token is expired or invalid
  if (!this.authService.isAuthenticated()) {
    localStorage.removeItem('role');
    localStorage.removeItem('accessToken');
  }

  if (this.authService.isAuthenticated()) {
    const role = localStorage.getItem('role');

    if (role === 'Admin') {
      this.router.navigateByUrl('/dashboard');
    } else if (role === 'User') {
      this.router.navigateByUrl('/dashboarduser');
    }
    return;
  }
}

}



// isAuthenticated() returned TRUE due to old token

// Auto redirect to dashboard triggered

// Fix
// ✔ Clear invalid/expired tokens
// ✔ Validate token expiry
// ✔ Properly handle ngOnInit() login logic