import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../login/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: boolean;
  errorMessage!: string;

  constructor(private loginService: LoginServiceService,
              private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.getLoggedInStatus();
    console.log(this.isLoggedIn);
    // here we are subscribing to the islogged in status when ever there is a change will make a change here too
    this.loginService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }


  logout(): void {
    this.loginService.postLogout().subscribe({

      next: (response) => {
        console.log('Post request Successful Logout', response)
        // Route back to Home Page
        this.router.navigate(['/']);

        // Perform login logic
        // After successful login, update the login status globally
        this.loginService.setLoggedInStatus(false);
      },


      error: (error) => {
        this.errorMessage = error.error.detail

        if (this.errorMessage === undefined){
          this.errorMessage = 'Server Error, Please try again later'
        }
      },

      complete() {
        // Will be called either it is successful or failed to finished the observable process
       console.log('Here that means the Observable is completed Logout Successful')
      }


    })
  }


}
