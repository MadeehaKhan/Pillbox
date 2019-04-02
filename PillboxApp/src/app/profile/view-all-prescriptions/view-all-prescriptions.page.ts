import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { MedicationService } from 'src/app/services/medication.service';
import { Person } from 'src/app/models/Person';
import { Medication } from 'src/app/models/Medication';

@Component({
  selector: 'app-view-all-prescriptions',
  templateUrl: './view-all-prescriptions.page.html',
  styleUrls: ['./view-all-prescriptions.page.scss'],
})
export class ViewAllPrescriptionsPage implements OnInit {

  user: Person = new Person();
  constructor(private router: Router, private storage: Storage,  public http: HttpClient, private medicationService: MedicationService) {
    this.storage.get('user').then(val => this.user = val).then(() => {
      this.populatePrescriptionLists();
    }).then(() => {
      this.populateMedicationLists();
    });
   }

  ngOnInit() {  
  }
  public prescriptionList: any[];
  public medicationList: any[];
  public med: Medication;


  public populatePrescriptionLists(){
    var user_id: String = this.user.id.toString();
    this.medicationService.getPrescriptionsByPerson(user_id).subscribe(
      res => {
        console.log(res)
        this.prescriptionList = res.map(drug => drug);
        this.prescriptionList.forEach(drug => {
          drug.isHidden = true;
          //console.log(this.drug);
        }); 
      }); 
  }

  public populateMedicationLists(){
    var user_id: String = this.user.id.toString();
    this.medicationService.getMedicationsByPerson(user_id).subscribe(
      res => {
        console.log(res)
        this.medicationList = res.map(drug => drug);
        this.medicationList.forEach(drug => {
          if(drug.imageBytes != null){
            //drug.image = this.dataURItoBlob(drug.imageBytes);
            console.log('converted to image')
          }
          //console.log(this.drug);
        }); 
      }); 
  }

  dataURItoBlob(dataURI) {
      var binary = atob(dataURI.split(',')[1]);
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {
          type: 'image/jpg'
      });
  }

  buttonClick(entry){
    entry.isHidden = !entry.isHidden;
  }

  editMedication(id){
    console.log(id);
    this.router.navigateByUrl('/medication-modify/' + id);
  }

  
  back(){
    this.router.navigateByUrl('/tabs/tab3');
  }
}
