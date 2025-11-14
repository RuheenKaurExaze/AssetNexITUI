import {Observable} from 'rxjs';
import { AuthService} from '../app/auth/auth.service';
import {Component} from '@angular/core';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface RegisterRequest{
email:string;
password:string;
errors:string[];

}

interface RegisterResponse{
errors:string[];
message?:string;
success:boolean;

}

@Injectable({
    providedIn:'root'
})
export class LoginRegisterService{

    constructor(private authService:AuthService, private http:HttpClient){}
    private apiUrl= 'https://localhost:7195';
    



  onRegister(email:string, password:string):Observable<RegisterRequest>{
    return this.http.post<RegisterRequest>(`${this.apiUrl}/api/Auth/register`, {email,password});
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




