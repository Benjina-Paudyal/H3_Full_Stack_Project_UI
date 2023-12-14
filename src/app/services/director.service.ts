import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Director } from '../models/director.model';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {
  
  private apiUrl = environment.apiUrl + 'Director';
  
  constructor(private http:HttpClient) {}

//READ
getDirectors():Observable<Director[]>{
  return this.http.get<Director[]>(this.apiUrl)
}

// CREATE
addDirector(director:Director):Observable<Director>{
  return this.http.post<Director>(this.apiUrl,director);
}

//UPDATE
updateDirector(director:Director):Observable<Director>{
  const url=`${this.apiUrl}/${director.directorId}`;
  return this.http.put<Director>(url,director);
}

//DELETE
deleteDirector(id:number): Observable<any>
{
  const url=`${this.apiUrl}/${id}`
  return this.http.delete(url);
}

}
