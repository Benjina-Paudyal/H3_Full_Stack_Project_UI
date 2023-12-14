/* 
  This service can be injected into Angular components or other services, allowing them to make requests to the specified API endpoint for actor data. The use of observables ensures that the component can subscribe to the data asynchronously and react to changes when the data is received.

*/


// import statements bring in necessary modules and dependencies
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; // decorate the service class making it injectbale
import { Observable } from 'rxjs'; // to handle asynchronous operation
import { Actor } from '../models/actor.model'
import { environment } from 'src/app/environments/environment'; // importing the environment file

@Injectable({
  providedIn: 'root' // this class is injectable to any componenet or service 
})
export class ActorService {
  
  private apiUrl = environment.apiUrl + 'Actor';

  constructor( private http: HttpClient) { } // injected HttpClient service to make HTTP requests

  /*
  getActors: it is a method that returns an observable of type Actor[]. It uses HttpClient to make a GET request 
  to the specified API endpoint( this.apiUrl).
  the response is expected to be an array of 'Actor' objects and the method returns this as an observable. All in
  all, the method 'getActors' essentially fetches data from the specified URl and returns it as an observable, allowing us to handle the response asynchronoulsy in the application. When we subscribe to this observable, we can perform actions like CRUD with the received data.
  */ 

  // READ
  getActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(this.apiUrl)
  }

  // CREATE
  addActor(actor:Actor):Observable<Actor>{
    return this.http.post<Actor>(this.apiUrl,actor)
  }

  //UPDATE
  updateActor(actor:Actor):Observable<Actor>{
  const url =`${this.apiUrl}/${actor.actorId}`; // URL is formed by appending the actorId of the provided actor to the apiUrl property of the service.
  return this.http.put<Actor>(url,actor);
}

// DELETE
deleteActor(actorId:number):Observable<any>{
  const url=`${this.apiUrl}/${actorId}`;
  return this.http.delete(url)
}

}