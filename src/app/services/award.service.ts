import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Award } from '../models/award.model';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwardService{

  private apiUrl = environment.apiUrl + 'Award';


  constructor(private http:HttpClient) {}

  //READ
  getAwards():Observable<Award[]>{
    return this.http.get<Award[]>(this.apiUrl)

    .pipe( 
      catchError((error) => {
      console.error('Error fetching Awards',error);
      throw error;
      
    })
    );
  }

  // CREATE
  addAward(award:Award):Observable<Award>{
    return this.http.post<Award>(this.apiUrl,award);
  }


  //UPDATE
  updateAward(award:Award):Observable<Award>{
    const url=`${this.apiUrl}/${award.awardId}`;
    return this.http.put<Award>(url,award);
  }

  // DELETE
  deleteAward(id:number): Observable<any>
  {
    const url=`${this.apiUrl}/${id}`
    return this.http.delete(url);
  }
}
