import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Person } from '../models/Person';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  name:string;
  password:string;
  confirmpassword:string;
  failedMsg: string = "";

  user: Person;
  
  pxconds:string[];
	
  constructor(private loadingController: LoadingController, public http: HttpClient, private router: Router) {}

  ngOnInit() {
  	this.name = "   ";
  	this.pxconds= [];
  }

  addCond(condition){
    console.log(condition);
    this.pxconds.unshift(condition);
    return false;
  }

  deleteCond(i){
  	console.log(i);
    this.pxconds.splice(i, 1);
  }

  async signUp(ngForm: NgForm){
    const loading = await this.loadingController.create({
      message: "Creating Account..."
    });
    await loading.present();

    console.log(ngForm);

    const data: any = {
      "givenname": ngForm.form.value.givenname,
      "lastname": ngForm.form.value.lastname,
      "email": ngForm.form.value.email,
      "passwordstring": ngForm.form.value.password,
      "primaryphysician":  ngForm.form.value.ppname + ',' + ngForm.form.value.ppnumber,
      "emergencycontact1": ngForm.form.value.econtactname + ',' + ngForm.form.value.econtactnumber,
      "iscaregiver": false,
    };

    var url = "https://pillboxwebapi20190129085319.azurewebsites.net/api/person/signup/";

    this.http.post(url, data)
    .toPromise()

    .then(response => {
      console.log('Post Success!');
      console.log('Reponse: ' + response);
      loading.dismiss();

      if (response > 0){
        this.failedMsg = "";
        ngForm.reset();
        this.router.navigateByUrl('/register');
      }else{
        this.failedMsg = "Please fill in all the sections marked with a *";
      }
    })
    .catch(error => {
      console.log('Post Error!');
      console.log('Reponse: ' + error);
    });
  }
}
