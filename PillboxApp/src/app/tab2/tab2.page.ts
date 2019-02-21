import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

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
