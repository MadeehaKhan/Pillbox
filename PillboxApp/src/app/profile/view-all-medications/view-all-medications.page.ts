import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { MedicationService } from 'src/app/services/medication.service';
import { Person } from 'src/app/models/Person';

@Component({
  selector: 'app-view-all-medications',
  templateUrl: './view-all-medications.page.html',
  styleUrls: ['./view-all-medications.page.scss'],
})
export class ViewAllMedicationsPage implements OnInit {

  user: Person = new Person();
  constructor(private router: Router, private storage: Storage,  public http: HttpClient, private medicationService: MedicationService) 
  {
    this.storage.get('user').then(val => this.user = val).then(() => {
      this.populateMedicationLists()
    });;
  }

  ngOnInit() {
    //this.populateMedicationLists();
  }

  public drugsList: any[];


  public populateMedicationLists(){
    var user_id: String = this.user.id.toString();
    this.medicationService.getMedicationsByPerson(user_id).subscribe(
      res => {
        console.log(res)
        this.drugsList = res.map(drug => drug);
        this.drugsList.forEach(drug => {
          drug.isHidden = true;
          //console.log(this.drug);
        }); 
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
