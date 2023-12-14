import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Language } from '../models/language.model';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private apiUrl = environment.apiUrl + 'Actor';



  constructor(private http:HttpClient) { }

  getLanguage():Observable<Language[]>{
    return this.http.get<Language[]>(this.apiUrl)
  }
  addLanguage(language:Language):Observable<Language>{
    return this.http.post<Language>(this.apiUrl,language);
  }
  //update 
  updateLanguage(language:Language):Observable<Language>{
    const url=`${this.apiUrl}/${language.languageId}`;
    return this.http.put<Language>(url,language);
  }
  deleteLanguage(id:number): Observable<any>
  {
    const url=`${this.apiUrl}/${id}`
    return this.http.delete(url);
  }

}
