import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormPatterns } from 'src/app/core/utilities/utilities-interfaces';

@Component({
  selector: 'app-form-signin',
  templateUrl: './form-signin.component.html',
  styleUrls: ['./form-signin.component.css']
})
export class FormSigninComponent implements OnInit{

  validateForm !: FormGroup;
  formPattern = FormPatterns;
  passwordVisible: boolean = false;

  numDocumentTouched: boolean = false;
  passwordTouched: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      numDocument: ['',
      [
        Validators.required, 
        Validators.minLength(7), 
        Validators.maxLength(10), 
        Validators.pattern(this.formPattern._NUM_IDENTIFICACION_PATTERN)
      ]],
      password: ['', 
      [
        Validators.required, 
        Validators.minLength(6), 
        Validators.maxLength(15),
      ]]
    })
  }

  isValidForm(){
    if(this.validateForm.valid){
      this.router.navigate(['/'])
    }else if(this.validateForm.invalid){
      console.log('algo anda mal muchacho');
      this.validateForm.controls['numDocument'].markAllAsTouched();
      this.validateForm.controls['numDocument'].updateValueAndValidity();
      this.validateForm.controls['password'].markAllAsTouched();
      this.validateForm.controls['password'].updateValueAndValidity();
    }
  }

  /**
   * Marca como touched los campos del formulario para activar los error tips
   * @param controlName : Es el nombre del control del formulario
   */
  markTouched(controlName: string){
    if(controlName){
      this.validateForm.controls[controlName].markAllAsTouched();
      this.validateForm.controls[controlName].updateValueAndValidity();
    }
    if(controlName === 'numDocument'){
      this.numDocumentTouched = false;
    }else if(controlName === 'password') {
      this.passwordTouched = false;
    }
  }
} 
