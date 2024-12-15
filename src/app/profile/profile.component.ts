import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  isSubmitting: boolean = false;
  message: string = '';
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''], 
    });
  }

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userId = currentUser.id; 
    if (currentUser) {
      this.profileForm.patchValue({
        username: currentUser.username,
        email: currentUser.email,
      });
    }
  }

  saveProfile() {
    if (this.profileForm.valid && this.userId) {
      this.isSubmitting = true;
      this.authService.editUser(this.userId, this.profileForm.value).subscribe(
        (response) => {
          this.isSubmitting = false;
          this.message = 'Profile updated successfully!';
          console.log('Profile updated:', response);

          localStorage.setItem(
            'currentUser',
            JSON.stringify({
              ...response.data,
              id: this.userId,
            })
          );

          setTimeout(() => {
            this.message = '';
          }, 3000);
        },
        (error) => {
          this.isSubmitting = false;
          this.message = 'Error updating profile. Please try again.';
          console.error('Error updating profile:', error);
        }
      );
    }
  }

}
