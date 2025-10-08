
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  expiration: string;
}

interface RegiterRequest{
email:string;
password:string;

}

interface RegisterResponse{
errors:string[];
message?:string;
success:boolean;

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7195'; // your API base URL

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/api/Auth/login`, request);
  }

  register(email:string, password:string):Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(`${this.apiUrl}/api/Auth/register`, {email,password});
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}




