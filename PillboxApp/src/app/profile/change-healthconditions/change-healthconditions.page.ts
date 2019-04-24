import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Person } from 'src/app/models/Person';
import { MedicationService } from 'src/app/services/medication.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-change-healthconditions',
  templateUrl: './change-healthconditions.page.html',
  styleUrls: ['./change-healthconditions.page.scss'],
})
export class ChangeHealthconditionsPage implements OnInit {

  user: Person = new Person();
  conditions: any[] = [];
  condition: string = "";

  constructor(private router: Router, private storage: Storage, private medicationService: MedicationService, private loadingController: LoadingController) {
    this.storage.get('user').then(val => {
      this.user = val;
      console.log(this.user);
      this.conditions = this.user.healthConditions.split(',');
    });
  }

  ngOnInit() {
  }

  back(){
    this.router.navigateByUrl('/tabs/tab3');
  }

  async authenticate(ngForm){
    console.log(ngForm);
    // TODO: authenticate form
    
    this.user.healthConditions = this.conditions.join();

    const loading = await this.loadingController.create({
      message: "Please wait..."
    });
    await loading.present();

    this.medicationService.editPerson(this.user)
      .toPromise()
      .then(() => {
        this.storage.set('user', this.user);
        loading.dismiss();
        this.router.navigateByUrl('/tabs/tab3');
      })
  }

  addCond(){
    console.log(this.condition);
    if (this.condition != "" || this.condition != undefined || this.condition != null){
      this.conditions.push(this.condition);
      this.condition = "";
    }
    return false;
  }

  deleteCond(i){
  	console.log(i);
    this.conditions.splice(i, 1);
  }

}
