import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  name:string;
  pxconds:string[];
	
  constructor() {}

  ngOnInit() {
  	this.name = "New User";
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
}
