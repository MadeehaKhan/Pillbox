import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicationService } from '../services/medication.service';
import { Storage } from '@ionic/storage';
import { Person } from '../models/Person';
import { ToastController } from '@ionic/angular';
import { MedTrigger } from '../models/MedTrigger';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  today = Date.now();
  isLoggedIn = this.storage.get("isLoggedIn");
  meds: MedTrigger[] = [];
  user: Person = new Person();

  constructor(private router: Router,  public http: HttpClient, private medicationService: MedicationService, 
    private storage: Storage, private toastController: ToastController, private storageService: StorageService) { 
      console.log('tab1 ctor');  
      // this.medicationService.user.subscribe(data => this.user = data);
      
      this.storage.get('user').then(val => this.user = val).then(() => {
        this.populateMedicationLists()
      }); 
  }

  buttonClick(){
    alert("Details!");
  }

  ngOnInit() {
    console.log('tab1 ngOnInit');
   
  }

  public drugsList: any[];//Medication[];
  //  { id: 'Pepperoni', time: '9:30', isChecked: false }
  // //   // { val: 'Sausage', time: '11:00' , isChecked: false },
  // //   // { val: 'Mushroom', time: '6:00', isChecked: false }
  // ];


  public takenDrugsList: any[];
  //   { val: 'Dog', time: '9:30', isChecked: true },
  // ];
 
  public populateMedicationLists(){
    console.log('My result: ');
    var user_id: String = this.user.id.toString();
    this.medicationService.getMedicationsByPerson(user_id).subscribe(
      res => {
        console.log(res)
        this.drugsList = res.map(drug => drug); 
        this.drugsList.forEach(drug => {
        drug.isChecked = false;
        console.log(drug);
        //call a get for the prescription info
        console.log("this is the id" + drug["id"]);
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

  public goToMedication(entry) {
     this.router.navigateByUrl('/med-view/' + entry['id']);
  }

  public testnotifications(){
    this.router.navigateByUrl('testing-local-notifications');
  }

  public async toastMedTrig(){

    await this.storageService.getItems().then(items => {
      this.meds = items;
    });
    this.meds.forEach(element => {
      this.showToast("Toast: " + element.id + ", Month: " + element.every);
    });

  }

  // Helper
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  public logout(){
    console.log('logout()');
    this.storage.set('isLoggedIn', false);
    this.storage.set('user', null);
    this.isLoggedIn = this.storage.get("isLoggedIn");   //for the view
    this.router.navigateByUrl('/register');
  }

}
