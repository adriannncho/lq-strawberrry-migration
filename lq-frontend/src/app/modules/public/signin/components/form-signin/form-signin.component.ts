import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-signin',
  templateUrl: './form-signin.component.html',
  styleUrls: ['./form-signin.component.css']
})
export class FormSigninComponent {

  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      this.validateForm.controls.password.markAllAsTouched(); 
      this.validateForm.controls.password.updateValueAndValidity(); 
      this.validateForm.controls.userName.markAllAsTouched(); 
      this.validateForm.controls.userName.updateValueAndValidity(); 
    }
  }

  constructor(private fb: NonNullableFormBuilder) {}
} 
