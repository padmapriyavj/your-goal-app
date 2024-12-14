import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/auth'; 
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken()); 
  isLoggedIn$ = this.loggedIn.asObservable(); 
  constructor(private http: HttpClient) {
    // const token = localStorage.getItem('authToken');
    // this.loggedIn.next(!!token);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  register(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.loggedIn.next(true); 
  }

  logout(): void {
    localStorage.removeItem('authToken'); 
    this.loggedIn.next(false); 
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

}
