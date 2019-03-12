import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { MedicationService } from 'src/app/services/medication.service';

@Component({
  selector: 'app-view-all-medications',
  templateUrl: './view-all-medications.page.html',
  styleUrls: ['./view-all-medications.page.scss'],
})
export class ViewAllMedicationsPage implements OnInit {


  constructor(private router: Router,  public http: HttpClient, private medicationService: MedicationService, private storage: Storage) { }

  ngOnInit() {
    this.populateMedicationLists();
  }

  public drugsList: any[];


  public populateMedicationLists(){
    this.medicationService.getMedicationsByPerson().subscribe(
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
    //alert("Details!");
    //console.log(label);
  }

  editMedication(id){
    console.log(id);
    this.router.navigateByUrl('/medication-modify/' + id);
  }

  
  back(){
    this.router.navigateByUrl('/tabs/tab3');
  }

}
