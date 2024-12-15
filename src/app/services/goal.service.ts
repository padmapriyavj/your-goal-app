import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  private baseUrl = 'http://localhost:8000/goal';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }


  getAllGoals(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAll`, { headers: this.getAuthHeaders() });
  }


  createGoal(goal: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, goal,{ headers: this.getAuthHeaders() });
  }

  updateGoal(goalId: string, updatedGoal: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/update/${goalId}`, updatedGoal , { headers: this.getAuthHeaders() });
  }

  deleteGoal(goalId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${goalId}`, { headers: this.getAuthHeaders() });
  }
}
