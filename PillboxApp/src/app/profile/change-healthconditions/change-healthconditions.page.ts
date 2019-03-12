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
  constructor(private router: Router, private storage: Storage, private medicationService: MedicationService, private loadingController: LoadingController) {
    this.storage.get('user').then(val => this.user = val);
  }

  ngOnInit() {
  }

  back(){
    this.router.navigateByUrl('/tabs/tab3');
  }

  async authenticate(ngForm){
    console.log(ngForm);
    // TODO: authenticate form
    
    this.user.healthConditions = ngForm.form.value.healthconditions;

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

}
