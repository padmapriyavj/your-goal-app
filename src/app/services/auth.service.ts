import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const decodedUser = this.decodeToken(token); 
    localStorage.setItem(
      'currentUser',
      JSON.stringify({
        id: decodedUser.id,
        username: decodedUser.username,
        email: decodedUser.email,
      })
    );
    this.loggedIn.next(true); 
  }
  
  private decodeToken(token: string): any {
    const payload = token.split('.')[1]; 
    return JSON.parse(atob(payload)); 
  }
  

  logout(): void {
    localStorage.removeItem('authToken'); 
    this.loggedIn.next(false); 
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  editUser(userId: string, updates: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/edit/${userId}`, updates, {
      headers: this.getAuthHeaders(),
    });
  }

}
