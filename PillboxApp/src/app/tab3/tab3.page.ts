import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

	isRX:boolean = false;

	constructor() {}

	ngOnInit() {}

	addMed(ngForm: NgForm){
		console.log('addMed()');

		var url = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/createmedication/";

	}

	toggleRX() {
		this.isRX = !this.isRX;
	}
}
