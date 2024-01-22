import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{


  logingForm!: FormGroup;
  errorMessage!: string;



  constructor(
            private fp: FormBuilder,
            private regisService: RegistrationService,
            private router: Router
            ){};


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
    this.regisService.postRegister(this.logingForm.value).subscribe({

      next: (response) => {
        console.log('Post request Successful', response)
        // Route back to Home Page
        this.router.navigate(['/login']);
      },

      error: (error) => {
        this.logingForm.reset();
        this.errorMessage = error.error.detail
        console.log(this.errorMessage)

        if (this.errorMessage === undefined){
          this.errorMessage = 'Server Error, Please try again later'
        }
      },

      complete() {
        // Will be called either it is successful or failed to finished the observable process
       console.log('Here that means the Observable is completed')
      }

    })
    console.log('Submitted', this.logingForm.value, this.logingForm.valid);
  }

}
