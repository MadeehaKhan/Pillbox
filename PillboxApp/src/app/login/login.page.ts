import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { Person } from '../models/Person';
import { MedicationService } from '../services/medication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  failedMsg: string = "";

  constructor(private router: Router,
     public http: HttpClient, 
     private storage: Storage, 
     private loadingController: LoadingController, 
     private medicationService: MedicationService) { }

  ngOnInit() {
  }

  async authenticate(ngForm: NgForm){
    const loading = await this.loadingController.create({
      message: "Please wait..."
    });
    await loading.present();
    
    console.log('authenticate()');
    let email: string = ngForm.form.value.email;
    let password: string = ngForm.form.value.password;

    var url = "https://pillboxwebapi20190129085319.azurewebsites.net/api/person/authenticateuser/";

    const data: any = {
      "Email": email,
      "PasswordString": password,
    };

    this.http.post(url, data)
    .toPromise()
    .then(response => {
      console.log('Post Success!');
      console.log('Reponse: ' + response);
      loading.dismiss();

      if (response == true){
        this.storage.set('isLoggedIn', true);
        this.failedMsg = "";
        this.getPersonInfo(email, password);
        this.router.navigateByUrl('/tabs/tab1');
      }else{
        this.failedMsg = "Incorrect Email and/or Password. Please try again.";
      }
    })
    .catch(error => {
      console.log('Post Error!');
      console.log('Reponse: ' + error);
    });
  }

  getPersonInfo(email: string, password: string){
    let url = "https://pillboxwebapi20190129085319.azurewebsites.net/api/person/getperson/";

    this.http.get<Person>(url, {
      params: {
        email: email
      }
    })
    .toPromise()
    .then(response => {
      let user = new Person();
      user = response;
      user.password = password;
      console.log(user);

      this.storage.set('user', user);

      this.medicationService.setPerson(user);

      //How to get the user data
      //let testUser = new Person();
      // this.storage.get('user')
      // .then(val => testUser = val)
      // .then(() => {
      //   console.log(testUser);
      //   console.log(testUser.email);
      //   console.log(testUser.givenName + ' ' + testUser.lastName);
      // });
    })
  }
}
