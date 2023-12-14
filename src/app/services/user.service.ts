import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl +'User';
  //private apiUrl = "https://localhost:7114/api/User"

  constructor( private http: HttpClient) { } 

  registerUser(user:any):Observable<any>{
    
    const url=`${this.apiUrl}/register`;
    return this.http.post<any>(url,user );
    
  }

  login(credentials:{userName:string,password:string,role:string}):Observable<any>{
    return this.http.post(`${this.apiUrl}/authenticate`,credentials);

}
}
