import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{


  logingForm!: FormGroup;



  constructor(private fp: FormBuilder){};


  ngOnInit() {
    this.logingForm = this.fp.group({
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    });
  }

  onSubmit(): void {
    // Create API service for Authentication for :
    // Login
    // Join
    // Reset Password

    "Create API service for Authentication"
    console.log('Submitted', this.logingForm.value, this.logingForm.valid);
  }

}
