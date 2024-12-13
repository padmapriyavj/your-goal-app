import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  private apiUrl = 'http://localhost:8000/goal/create';

  constructor(private http: HttpClient) {}

  createGoal(goalData: any): Observable<any> {
    return this.http.post(this.apiUrl, goalData);
  }
}
