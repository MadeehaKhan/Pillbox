import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { Person } from '../models/Person';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  urlMedsByPerson = 'https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/getmedicationbyperson/2';
  urlEditPerson = 'https://pillboxwebapi20190129085319.azurewebsites.net/api/person/editperson/';

  private userSource = new Subject<Person>();
  user = this.userSource.asObservable();

  constructor(private http: HttpClient, private storage: Storage) {
    this.storage.get('user').then(val => this.setPerson(val));
  }

  getMedicationsByPerson(): Observable<any> {
    return this.http.get(this.urlMedsByPerson).pipe(
      map(results => {
        console.log('RAW ', results)
        return results
        })
      );
  }

  editPerson(person: Person): Observable<any> {
    const options = {responseType: 'text' as 'text'};
    this.setPerson(person);
    return this.http.post(this.urlEditPerson, person, options).pipe(
      map(results => {
        console.log('RAW ', results)
        return results
        })
      );
  }

  setPerson(person: Person){
    this.userSource.next(person);
  }
}
