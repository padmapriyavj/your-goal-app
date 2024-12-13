import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  private baseUrl = 'http://localhost:8000/goal';

  constructor(private http: HttpClient) {}

  getAllGoals(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAll`);
  }


  createGoal(goal: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, goal);
  }

  updateGoal(goalId: string, updatedGoal: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/update/${goalId}`, updatedGoal);
  }

  deleteGoal(goalId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${goalId}`);
  }
}
