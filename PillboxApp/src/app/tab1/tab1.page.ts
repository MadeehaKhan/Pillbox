import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicationService } from '../services/medication.service';
import { Storage } from '@ionic/storage';
import { Person } from '../models/Person';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { MedTrigger } from '../models/MedTrigger';
import { StorageService } from '../services/storage.service';
import { Medication } from '../models/Medication';

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
    private storage: Storage, private toastController: ToastController, private storageService: StorageService,
    public actionSheetController: ActionSheetController) { 
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

    console.log('Med Notifications');
    var dt = new Date(this.today);
    this.medicationService.getMedNotificationsByPerson(this.user.id, dt).subscribe(
      response => {
        console.log(response);
        this.drugsList = [];
        this.takenDrugsList = [];
        this.drugsList = response.map(drug => drug);
        this.drugsList.forEach(drug => {
          if (drug.taken) drug.isChecked = true;
          else drug.isChecked = false;          
          drug.showDanger = false;
          drug.showWarning = false;
          drug.showTakeNow = false;
        });
        
        this.updateDrugLists();
        this.checkAlert();
      }
    )
    
    // medNotifs.forEach(medNotif => {
    //   console.log('Notif: ' + medNotif.id + ' , ' + medNotif.name);
    // });

    // console.log('My result: ');
    // var user_id: String = this.user.id.toString();
    // this.medicationService.getMedicationsByPerson(user_id).subscribe(
    //   res => {
    //     console.log(res)
    //     this.drugsList = res.map(drug => drug); 
    //     this.drugsList.forEach(drug => {
    //     drug.isChecked = false;
    //     console.log(drug);
    //     //call a get for the prescription info
    //     console.log("this is the id" + drug["id"]);
    //     });

    //     let arr = new Array(1,2,4)
    //     console.log('Type: ', typeof(arr));    
    //   });
      
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

    this.drugsList.sort((a,b) => {
      if ((a.hour > b.hour) || (a.hour == b.hour && a.minute > b.minute) ) return 1;
      else return -1;
    });

    this.takenDrugsList.sort((a,b) => {
      if ((a.hour > b.hour) || (a.hour == b.hour && a.minute > b.minute) ) return 1; 
      else return -1;
    });       
  }
  
  public addMedication() {
    this.router.navigateByUrl('/medication-enter');
  }

  public goToMedication(entry) {
     this.router.navigateByUrl('/med-view/' + entry['medicationId']);
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

  public checkAlert(){
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();     
    let currentMinute = hour*60 + minute;
    
    this.drugsList.forEach((drug)=>{
      let minuteOfDrug = drug.hour*60 + drug.minute;
      let diff = currentMinute - minuteOfDrug;
      if (minuteOfDrug < currentMinute){
        drug.showDanger = true;
        drug.showWarning = false;
        drug.showTakeNow = false;
      }
      else if (diff < 0 && diff >= -30){
        drug.showWarning = true;
      }else if (drug.hour == hour && drug.minute == minute){
        drug.showTakeNow = true;
        drug.showWarning = false;
      }
    });    
    //Call itself every 15 seconds
    setTimeout(()=>{this.checkAlert()}, 15000);
  }

  async presentActionSheet(entry) {
    const actionSheet = await this.actionSheetController.create({
      header: entry.name,
      mode: "ios",
      buttons: [ {
        text: 'Take',
        icon: 'checkmark-circle',
        handler: () => {
          console.log('Take clicked');
          entry.isChecked = true;
          this.updateDrugLists();
          this.takeMedication(entry);
        }
      }, {
        text: 'View Medication',
        icon: 'eye',
        handler: () => {
          console.log('View Medication clicked');
          console.log('View Medication: '+ entry.name + ', id: '+ entry.id);
          this.goToMedication(entry);
        }
      }, {
        text: 'View Prescription',
        icon: 'list-box',
        handler: () => {
          console.log('View Prescription clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentTakenActionSheet(entry) {
    const actionSheet = await this.actionSheetController.create({
      header: entry.name,
      mode: "ios",
      buttons: [ {
        text: 'Undo',
        icon: 'undo',
        handler: () => {
          console.log('Undo clicked');
          entry.isChecked = false;
          this.updateDrugLists();
          this.takeMedication(entry, true);
        }
      }, {
        text: 'View Medication',
        icon: 'eye',
        handler: () => {
          console.log('View Medication clicked');
          console.log('View Medication: '+ entry.name + ', id: '+ entry.id);
          this.goToMedication(entry);
        }
      }, {
        text: 'View Prescription',
        icon: 'list-box',
        handler: () => {
          console.log('View Prescription clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async takeMedication(medNotif: MedTrigger, undo = false){
    let medication = new Medication();
    this.medicationService.getMedication(medNotif.medicationId)
    .toPromise()
    .then(response => {
      medication = response;
      if (undo)
        medication.remainingPills = medication.remainingPills + 1;
      else 
        medication.remainingPills = medication.remainingPills - 1;      
    }).then(()=>{
      this.medicationService.editMedication(medication)
      .toPromise()
      .then(response => {
        // console.log(response);
        // console.log('new medication');
        // console.log(medication);
      });
    });
  }

  async getMedication(medNotif: MedTrigger) {
    let medication = new Medication();
    await this.medicationService.getMedication(medNotif.medicationId)
    .subscribe(response => {
      medication = response;
    });
    return medication;
  }
}
