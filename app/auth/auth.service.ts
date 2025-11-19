import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  constructor(private http: HttpClient) {}


  login(request: any): Observable<any> {
    return this.http.post(`${environment.apibaseUrl}/api/Auth/login`, request).pipe(
      tap((response: any) => {
        if (response && response.token) 
          {
          localStorage.setItem('accessToken', response.token);
          localStorage.setItem('expiration', response.expiration);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiration');
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const expiry = localStorage.getItem('expiration');
    if (!expiry) return false;

    return new Date(expiry) > new Date();
  }

  getRefreshToken():string| null{
    return localStorage.getItem('refreshToken');
  }

  isRefreshed():boolean{
    const refreshToken= this.getRefreshToken();
    if(!refreshToken) return false;

    const refreshExpiry= localStorage.getItem('refreshTokenExpiry');
    if(!refreshExpiry) return false;

    return new Date(refreshExpiry) > new Date();

  }



}


