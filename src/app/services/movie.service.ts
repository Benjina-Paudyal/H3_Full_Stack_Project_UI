import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from '../environments/environment';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = environment.apiUrl + 'Movie';

  constructor( private http: HttpClient) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  //Read 
  getMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(this.apiUrl)

    .pipe( 
      catchError((error) => {
      console.error('Error fetching Movies',error);
      throw error;
      
    })
    );
  }
  addMovies(movie:Movie):Observable<Movie>{
    return this.http.post<Movie>(this.apiUrl,movie);
  }
  //update Award
  updateMovie(movie:Movie):Observable<Movie>{
    const url=`${this.apiUrl}/${movie.movieId}`;
    return this.http.put<Movie>(url,movie);
  }
  deleteMovie(id:number): Observable<any>
  {
    const url=`${this.apiUrl}/${id}`
    return this.http.delete(url);
  }


}
