import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { GoalService } from '../services/goal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css'],
})
export class GoalsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['index', 'targetGoal', 'startWeight', 'startDate', 'endDate', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  goalsForm: FormGroup;
  isSubmitting = false;
  message = '';
  isEdit = false;
  editGoalId: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, private goalService: GoalService) {
    this.goalsForm = this.fb.group({
      targetGoal: ['', Validators.required],
      startWeight: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchGoals();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchGoals() {
    this.goalService.getAllGoals().subscribe(
      (response) => {
        if (response.status) {
          this.dataSource.data = response.data;
        } else {
          console.error('Failed to fetch goals:', response);
        }
      },
      (error) => {
        console.error('Error fetching goals:', error);
      }
    );
  }

  editGoal(goal: any) {
    this.isEdit = true;
    this.editGoalId = goal._id;

    this.goalsForm.patchValue({
      targetGoal: goal.targetGoal,
      startWeight: goal.startWeight,
      startDate: new Date(goal.startDate),
      endDate: new Date(goal.endDate),
      status: goal.status,
    });
  }

  saveGoal() {
    if (this.goalsForm.valid) {
      this.isSubmitting = true;
      const goalData = this.goalsForm.value;
  
      console.log('Payload being sent:', goalData);
  
      if (this.isEdit && this.editGoalId) {
        this.goalService.updateGoal(this.editGoalId, goalData).subscribe(
          (response) => {
            this.isSubmitting = false;
            this.message = 'Goal updated successfully!';
            console.log('Update Response:', response);
  
            this.fetchGoals();
            this.isEdit = false;
            this.editGoalId = null;
            this.goalsForm.reset();
  
            setTimeout(() => (this.message = ''), 3000);
          },
          (error) => {
            this.isSubmitting = false;
            this.message = 'Failed to update goal. Please try again.';
            console.error('Update Error:', error);
  
            setTimeout(() => (this.message = ''), 3000);
          }
        );
      } else {
        this.goalService.createGoal(goalData).subscribe(
          (response) => {
            this.isSubmitting = false;
            this.message = 'Goal created successfully!';
            console.log('Create Response:', response);
  
            this.fetchGoals();
            this.goalsForm.reset();
  
            setTimeout(() => (this.message = ''), 3000);
          },
          (error) => {
            this.isSubmitting = false;
            this.message = 'Failed to create goal. Please try again.';
            console.error('Create Error:', error);
  
            setTimeout(() => (this.message = ''), 3000);
          }
        );
      }
    }
  }
  
  

  deleteGoal(goalId: string) {
    if (confirm('Are you sure you want to delete this goal?')) {
      this.goalService.deleteGoal(goalId).subscribe(
        (response) => {
          this.message = 'Goal deleted successfully!';
          console.log('Delete Response:', response);

          // Refresh data
          this.fetchGoals();

          setTimeout(() => (this.message = ''), 3000);
        },
        (error) => {
          this.message = 'Failed to delete goal. Please try again.';
          console.error('Delete Error:', error);

          setTimeout(() => (this.message = ''), 3000);
        }
      );
    }
  }

  cancelEdit() {
    this.isEdit = false;
    this.editGoalId = null;
    this.goalsForm.reset();
  }
}
