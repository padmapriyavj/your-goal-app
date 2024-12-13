import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { GoalService } from '../services/goal.service';


@Component({
  selector: 'app-goals',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.css'
})
export class GoalsComponent {

  goalsForm: FormGroup;
  isSubmitting = false;
  message = '';


  constructor(private fb: FormBuilder, private goalService: GoalService) {
    this.goalsForm = this.fb.group({
      targetGoal: ['', Validators.required],
      startWeight: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  addGoal() {
    if (this.goalsForm.valid) {
      this.isSubmitting = true;
      this.goalService.createGoal(this.goalsForm.value).subscribe(
        (response) => {
          this.isSubmitting = false;
          this.message = 'Goal created successfully!';
          console.log('Response:', response);
          this.goalsForm.reset();
        },
        (error) => {
          this.isSubmitting = false;
          this.message = 'Failed to create goal. Please try again.';
          console.error('Error:', error);
        }
      );
    }
  }

}
