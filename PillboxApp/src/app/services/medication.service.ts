import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 


@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  urlMedsByPerson = 'https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/getmedicationbyperson/2';


  constructor(private http: HttpClient) { }


  getMedicationsByPerson(): Observable<any> {
    return this.http.get(this.urlMedsByPerson).pipe(
      map(results => {
        console.log('RAW ', results) 
        return results
        })
      );
  }





}
