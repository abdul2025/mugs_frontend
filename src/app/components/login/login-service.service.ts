import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfigService } from 'src/app/api-config.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();


  constructor(private http:HttpClient, private config: ApiConfigService) { }

  setLoggedInStatus(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }

  getLoggedInStatus(): boolean {
    return this.isLoggedInSubject.value;
  }


  // Here login in action for the user
  // utilizing the Observable to be subscribed and get use of handling the error and response and UI changes
  postLogin(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // You can add other headers if needed
    });

    const url = `${this.config.backend_based_local_api}/login`
    return this.http.post<any>(url, data, {headers})
  }


  // Here logout in action for the user
  // utilizing the Observable to be subscribed and get use of handling the error and response and UI changes
  postLogout(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // You can add other headers if needed
    });

    const url = `${this.config.backend_based_local_api}/logout`
    return this.http.post<any>(url, {headers})
  }
}
