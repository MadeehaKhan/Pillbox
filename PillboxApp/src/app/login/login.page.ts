import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  failedMsg: string = "";

  constructor(private router: Router, public http: HttpClient) { }

  ngOnInit() {
  }

  authenticate(ngForm: NgForm){
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
      if (response == true){
        this.router.navigateByUrl('/tabs/tab1');
      }else{
        this.failedMsg = "Incorrect Username and/or password";
      }
    })
    .catch(error => {
      console.log('Post Error!');
      console.log('Reponse: ' + error);
    });
  }

  submitForm(){

  }

}
