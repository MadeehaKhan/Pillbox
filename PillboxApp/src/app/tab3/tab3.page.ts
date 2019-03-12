import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from '../models/Person';
import { Storage } from '@ionic/storage';
import { MedicationService } from '../services/medication.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  user: Person = new Person();
  constructor(private router: Router, private storage: Storage, private medicationService: MedicationService) {
  }

  ngOnInit() {
    this.storage.get('user').then(val => this.user = val);
    this.medicationService.setPerson(this.user);
    //automatically updates the user object when it's been updated in the service.
    this.medicationService.user.subscribe(data => this.user = data);  
  }

  buttonClick(){
    alert("Details!");
  }

  navToChangeName(){
    this.router.navigateByUrl('/change-name');
  }

  navToChangeEmail(){
    this.router.navigateByUrl('/change-email');
  }

  navToChangePhone(){
    this.router.navigateByUrl('/change-phone');
  }

  navToChangeHealthConditions(){
    this.router.navigateByUrl('/change-healthconditions');
  }

  navToChangePhysicianInformation(){
    this.router.navigateByUrl('/change-physicianinformation');
  }

  navToChangeViewAllMedications(){
    this.router.navigateByUrl('/view-all-medications');
  }

  public logout(){
    console.log('logout()');
    this.storage.set('isLoggedIn', false);
    this.storage.set('user', null);
    this.router.navigateByUrl('/register');
  }

  navToTutorial(){
    this.router.navigateByUrl('/tutorial');
  }

}
