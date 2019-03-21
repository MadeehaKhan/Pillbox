import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-med-view',
  templateUrl: './med-view.page.html',
  styleUrls: ['./med-view.page.scss'],
})
export class MedViewPage implements OnInit {

	information: any = {}
	rxInfo: any = {}
	isRx: boolean = false;
	sidefx: string[] = [];
	pId: number;
	date: string;
	medList: number[] = [];
	medId;

  constructor(private router: Router, public http: HttpClient, private route: ActivatedRoute)  { 
  	this.medId = this.route.snapshot.paramMap.get('id');
  	this.http.get("https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/getmedication/"
  		.concat(this.medId))
  	.toPromise()
  	.then((response) => {
  		this.information = response;
  		console.log(response);
		if (this.information['sideEffects'] != "none") {
		  	var sfxArr = this.information['sideEffects'].split(',');
		  	for (let s of sfxArr) {
	  			this.sidefx.unshift(s);
	  		}
	  	}
	  	this.date = this.information['dateObtained'].substring(0,10);
	  	this.date = this.information['dateObtained'].substring(0,10);

	  	if (!(this.information['prescriptionId'] == 0))  {
		this.http.get("https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/getprescription/"
			.concat(this.information['prescriptionId'].toString(10)+"/"))
  		.toPromise()
  		.then((response) => {
	  		this.rxInfo = response;
	  		this.isRx = true;
	  		console.log(this.isRx);
	  	})
	  	.catch(error => {
		    console.log('Post Error!');
		    console.log('Reponse: ' + error);
		}); 
	  }
	})
  

	.catch(error => {
		console.log('Post Error!');
		console.log('Reponse: ' + error);
	});
  }

  ngOnInit() {
  

  }

  editMed() {
  	this.router.navigateByUrl('/medication-modify/' + this.medId);
  }

}
