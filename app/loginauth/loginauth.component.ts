


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Router, RouterModule } from '@angular/router';
// import { AuthService } from '../auth/auth.service';
// import { SharedModule } from 'primeng/api';

// @Component({
//   selector: 'app-loginauth',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule, RouterModule, FormsModule, SharedModule],
//   templateUrl: './loginauth.component.html',
//   styleUrls: ['./loginauth.component.css']
// })
// export class LoginauthComponent implements OnInit {
//   loginForm!: FormGroup;
//   error = '';
//   password:string='';
//   email:string='';
//   loading = false;
// goTo: any;
//   isAdmin: any;

//   constructor(
//     private authService: AuthService,
//     private router: Router,
//     private fb: FormBuilder
//   ) {}

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required]]
//     });
//   }

//   login(): void {
//     if (this.loginForm.invalid) {
//       return;
//     }

//     const role = this.isAdmin ? 'Admin' : 'User';
//     this.loading = true;
//     const request = this.loginForm.value;

//     this.authService.login(request).subscribe({
//       next: (res) => {
//         localStorage.setItem('token', res.token);
//         this.router.navigateByUrl('/dashboard');
//       },
//       error: () => {
//         this.error = 'Invalid email or password';
//         this.loading = false;
//       }
//     });
//   }

//   goToLanding(): void {
//     this.router.navigateByUrl('/landing');
//   }

//   logout(): void {
//     this.authService.logout();
//     this.router.navigateByUrl('/landing');
//   }
// }


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

  ngOnInit(): void {
   
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl(this.returnUrl);
      return;
    }

    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  login(): void {
    
    this.error = '';

    //
    if (!this.email || !this.password) {
      this.error = 'Please fill in all required fields';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.error = 'Please enter a valid email';
      return;
    }

    console.log('Attempting login...', { email: this.email, isAdmin: this.isAdmin });
    
    this.loading = true;
    const request = { 
      email: this.email, 
      password: this.password 
    };

    this.authService.login(request).subscribe({
      next: (res) => {
        console.log('Login successful', res);
        
        this.router.navigateByUrl(this.returnUrl);
        this.loading = false;
      },
      error: (err) => {
        console.error('Login failed', err);
        this.error = err.error?.message || 'Invalid email or password';
        this.loading = false;
      }
    });
  }

  goToLanding(): void {
    this.router.navigateByUrl('/landing');
  }

  goTo(route: string): void {
    this.router.navigateByUrl(route);
  }

  goToLoginRegister()
  {
    this.router.navigateByUrl('/login/register');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/landing');
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }


}


