import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { Person } from '../models/Person';
import { Storage } from '@ionic/storage';
import { MedTrigger } from '../models/MedTrigger';
import { Medication } from '../models/Medication';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  urlGetMeds = 'https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/getmedication/';
  urlEditMed = 'https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/editmedication/';
  urlMedsByPerson = 'https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/getmedicationbyperson/';
  urlEditPerson = 'https://pillboxwebapi20190129085319.azurewebsites.net/api/person/editperson/';
  urlGetMedNotifications = 'https://pillboxwebapi20190129085319.azurewebsites.net/api/medicationschedule/GetAllMedicatoinScheduleByDay/';

  private userSource = new Subject<Person>();
  user = this.userSource.asObservable();

  constructor(private http: HttpClient, private storage: Storage) {
    this.storage.get('user').then(val => this.setPerson(val));
  }

  getMedication(id: number): Observable<Medication> {
    return this.http.get<Medication>(this.urlGetMeds+ id.toString())
    .pipe(
      map(result =>{
        return result;
      })
    );
  }

  editMedication(medication: Medication): Observable<any> {
    const options = {responseType: 'text' as 'text'};
    return this.http.post(this.urlEditMed, medication, options)
    .pipe(
      map(result =>{
        return result;
      })
    );
  }

  getMedicationsByPerson(id: String): Observable<any> {
    return this.http.get(this.urlMedsByPerson +id).pipe(
      map(results => {
        console.log('RAW ', results)
        return results   
        })
      );
  }

  getMedNotificationsByPerson(id: Number, day: Date): Observable<any> {
    let medNotifs: any;

    return this.http.get<MedTrigger[]>(this.urlGetMedNotifications + id.toString(),{
      params: {
        day: day.toDateString()
      }
    }).pipe(
      map(results => {
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
    //console.log('setPerson()' + person);
  }
}
