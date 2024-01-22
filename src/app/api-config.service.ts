import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  constructor() { }

  backend_based_local_api: string = 'http://127.0.0.1:8000/api';

}
