import { Injectable } from '@angular/core'; // mark this class as injectbale , making it a service
import { HttpClient, HttpHeaders } from '@angular/common/http'; //HttpClinet:used for making http requests 
                                                          //HttpHeaders:defne custom headers for HTTP requests
import { Observable } from 'rxjs'; // used for handling asynchronous operations, such as HTTP requests


@Injectable({ //tells angular that this service can be injected into other components or services
  providedIn: 'root'
})
export class HomeService {
  
  constructor() { }

 
}
