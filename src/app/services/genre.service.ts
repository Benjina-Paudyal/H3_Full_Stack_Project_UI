import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre } from '../models/genre.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private apiUrl = environment.apiUrl + 'genre';

  constructor( private http: HttpClient) { } 
  
  // READ
  getGenre():Observable<Genre[]>{
    return this.http.get<Genre[]>(this.apiUrl)
  }

  // CREATE
  addGenre(genre:Genre):Observable<Genre>{
    return this.http.post<Genre>(this.apiUrl,genre);
  }


  //UPDATE
  updateGenre(genre:Genre):Observable<Genre>{
    const url=`${this.apiUrl}/${genre.genreid}`;
    return this.http.put<Genre>(url,genre);
  }

  // DELET
  deleteGenre(id:number): Observable<any>
  {
    const url=`${this.apiUrl}/${id}`
    return this.http.delete(url);
  }
}
