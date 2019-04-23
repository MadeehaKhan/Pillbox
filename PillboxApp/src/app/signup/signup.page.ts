import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Person } from '../models/Person';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  givenname:string = "";
  lastname:string = "";
  email:string = "";
  
  password:string = "";
  confirmpassword:string = "";
  condition: string = "";
  ppname: string = "";
  ppnumber: string = "";
  econtactname: string = "";
  econtactnumber: string = "";
  dob: Date;
  phonenumber: string = "";

  failedMsg: string = "";
  user: Person;
  
  pxconds:string[] = [];
	
  constructor(private loadingController: LoadingController, public http: HttpClient, private router: Router, public alertController: AlertController) {}

  ngOnInit() {}

  addCond(){
    console.log(this.condition);
    if (this.condition != "" || this.condition != undefined || this.condition != null){
      this.pxconds.push(this.condition);
      this.condition = "";
    }
    return false;
  }

  deleteCond(i){
  	console.log(i);
    this.pxconds.splice(i, 1);
  }

  async signUp(){
    if (!this.validateForm()) {return;}

    let primaryphysician = "";
    let emergencycontact1 = "";
    
    if (this.ppname != "" && this.ppnumber != ""){
      primaryphysician = this.ppname + ',' + this.ppnumber;
    }

    if (this.econtactname != "" && this.econtactnumber != ""){
      emergencycontact1 = this.econtactname + ',' + this.econtactnumber;
    }

    const data: any = {
      "givenname": this.givenname,
      "lastname": this.lastname,
      "email": this.email,
      "dateOfBirth": new Date(this.dob),
      "passwordstring": this.password,
      "primaryphysician":  primaryphysician,
      "emergencycontact1": emergencycontact1,
      "healthConditions": this.pxconds.join(","),
      "iscaregiver": false,
      "phonenumber": this.phonenumber,
    };

    console.log("data: ");
    console.log(data);
    const loading = await this.loadingController.create({
      message: "Creating Account...",
      animated: true,
      keyboardClose: true,
    });
    
    await loading.present();
    var url = "https://pillboxwebapi20190129085319.azurewebsites.net/api/person/signup/";

    this.http.post(url, data)
    .toPromise()
    .then(response => {
      console.log('Post Success!');
      console.log('Reponse: ' + response);
      loading.dismiss();

      if (response > 0){
        this.failedMsg = "";
        // ngForm.reset(); reset values;
        this.resetFormValues();
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

  validateForm(){
    let isValidForm = true;
    this.failedMsg = "";
    if (this.password !== this.confirmpassword){
      isValidForm = false;
      this.failedMsg += "Password and Confirm Password must match.";
    }
    return isValidForm;
  }

  resetFormValues(){
    this.givenname = "";
    this.lastname = "";
    this.email = "";    
    this.password = "";
    this.confirmpassword = "";
    this.condition = "";
    this.ppname = "";
    this.ppnumber = "";
    this.econtactname = "";
    this.econtactnumber = "";
    this.phonenumber = "";
    this.dob = new Date();
    this.pxconds = [];
  }

  async presentPasswordAlert() {
    const alert = await this.alertController.create({
      header: 'Passwrod',
      subHeader: 'The password requires:',
      message: 'At least 1 number <br> At least 1 uppercase letter <br> At least 1 lowercase letter <br> At least 1 special character (!@#$&*)',
      buttons: ['OK']
    });

    await alert.present();
  }
}
