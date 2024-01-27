import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfigService } from 'src/app/api-config.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoomServicesService {

  constructor(private http:HttpClient, private config: ApiConfigService) { }


  getRooms(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // You can add other headers if needed
    });

    const url = `${this.config.backend_based_local_api}/chat/rooms/`
    return this.http.get(url, { headers: headers})
  }
}
