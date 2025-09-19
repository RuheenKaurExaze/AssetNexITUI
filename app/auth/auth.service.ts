import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';



interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  expiration: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url='';
  private apiUrl = 'https://localhost:7195/api/Auth'; 
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  login(request: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, request);
  }
  loginn(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request).pipe(
      tap((res: LoginResponse) => {
        localStorage.setItem('token', res.token);
        this.loggedIn.next(true);
      })
    );
  }

   register(request: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, request);
  } 

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
 
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }


  }







// [Route("api/[controller]")]
// [ApiController]
// public class AuthController : ControllerBase
// {
//     [HttpPost("login")]
//     public IActionResult Login([FromBody] LoginDto loginDto) { ... }

//     [HttpPost("register")]
//     public IActionResult Register([FromBody] RegisterDto registerDto) { ... }
// }
