import { Component, OnInit } from '@angular/core';
import { RoomServicesService } from './room-services.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  errorMessage!: string;

  constructor(
    private roomService: RoomServicesService,
    ){};

  ngOnInit() {
    "Create API service for Authentication"
    this.roomService.getRooms().subscribe({

      next: (response) => {
        console.log('Get request Successful', response)
        // Route back to Home Page
      },
      error: (error) => {
        if (error.error.error === undefined){
          this.errorMessage= error.error.error.join(',')
        }

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
