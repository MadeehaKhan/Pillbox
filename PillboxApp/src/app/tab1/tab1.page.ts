import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicationService } from '../services/medication.service';
import { Medication } from '../models/Medication';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  today = Date.now();
  isLoggedIn = this.storage.get("isLoggedIn");


  constructor(private router: Router,  public http: HttpClient, private medicationService: MedicationService, private storage: Storage) {}


  buttonClick(){
    alert("Details!");
  }

  ngOnInit() {
    this.populateMedicationLists();
  }

  public drugsList: any[];//Medication[];
  //  { id: 'Pepperoni', time: '9:30', isChecked: false }
  // //   // { val: 'Sausage', time: '11:00' , isChecked: false },
  // //   // { val: 'Mushroom', time: '6:00', isChecked: false }
  // ];

  results: Observable<any>;

  public takenDrugsList: any[];
  //   { val: 'Dog', time: '9:30', isChecked: true },
  // ];

  public populateMedicationLists(){
    console.log('My result: ');
    this.medicationService.getMedicationsByPerson().subscribe(
      res => {
        console.log(res)
        this.drugsList = res.map(drug => drug); 
        this.drugsList.forEach(drug => {
        drug.isChecked = false;
        });
        let arr = new Array(1,2,4)
        console.log('Type: ', typeof(arr));    
      });
      
  }

  public updateDrugLists(){
    console.log('Type Check : ', typeof(this.drugsList)); 
    console.log('List : ', this.drugsList); 

    if(typeof(this.takenDrugsList) == 'undefined'){
      this.takenDrugsList = new Array();
    }   

    var allDrugs = this.takenDrugsList.concat(this.drugsList);
    this.takenDrugsList = allDrugs.filter(drug => drug.isChecked);
    this.drugsList = allDrugs.filter(drug => !drug.isChecked);
    
  }

  public addMedication() {
    this.router.navigateByUrl('/medication');
  }

  public logout(){
    console.log('logout()');
    this.storage.set('isLoggedIn', false);
    this.storage.set('user', null);
    this.isLoggedIn = this.storage.get("isLoggedIn");   //for the view
    this.router.navigateByUrl('/register');
  }

}
