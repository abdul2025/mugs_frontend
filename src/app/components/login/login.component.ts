import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from './login-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logingForm!: FormGroup;
  errorMessage!: string;



  constructor(private fp: FormBuilder,
              private loginService:LoginServiceService,
              private router: Router
              ){};


  ngOnInit() {
    this.logingForm = this.fp.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    });
  }

  onSubmit(): void {
    // Create API service for Authentication for :
    // Login Done ---->
    //    - Next:
    //      - Success: Redirect user to Home Page
    //      - ERROR: Show a popup Error message do a dadcated Component for it.

    // Join page
    // Reset Password
    // Logout this.loginService.setLoggedInStatus(false);

    "Log in service capture the user input and post it to backend"

    this.loginService.postLogin(this.logingForm.value).subscribe({

      next: (response) => {
        console.log('Post request Successful', response)
        // Route back to Home Page
        this.router.navigate(['/rooms']);
        // Perform login logic
        // After successful login, update the login status globally
        this.loginService.setLoggedInStatus(true);
      },
      error: (error) => {
        this.logingForm.reset();
        this.errorMessage = error.error.detail
        if (this.errorMessage === undefined){
          this.errorMessage = 'Server Error, Please try again later'
        }
      },

      complete() {
        // Will be called either it is successful or failed to finished the observable process
       console.log('Here that means the Observable is completed')
      }


    })
  }

}
