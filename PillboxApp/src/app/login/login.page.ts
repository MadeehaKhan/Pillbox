import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  failedMsg: string = "";

  constructor(private router: Router, public http: HttpClient, private storage: Storage, private loadingController: LoadingController) { }

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

}
