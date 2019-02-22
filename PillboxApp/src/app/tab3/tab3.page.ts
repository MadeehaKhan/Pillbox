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
	failedMsg: string = "";

	constructor(private router: Router, public http: HttpClient) {}

	ngOnInit() {}

	addMed(ngForm: NgForm){
		console.log('addMed()');

		let din: number = ngForm.form.value.din;
    	let prescriptionID: number = ngForm.form.value.rxid;
    	let name: string = ngForm.form.value.name;
    	let strength: number = ngForm.form.value.strength;
    	let remainingMed: number = ngForm.form.value.medrem;
    	let pharmObtained: string = ngForm.form.value.pharm;
    	let takeAsNeeded: boolean = ngForm.form.value.takeAsNeeded;
    	let dateObtained: string = ngForm.form.value.dobt;
    	let sideEffects: string = "";
    	let PersonId: number = 9;

		var url = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/createmedication/";

		const data: any = {
			"Din": din,
			"PrescriptionId": prescriptionID,
			"Name": name,
			"Strength": strength,
			"RemainingPills": remainingMed,
			"PharmacyObtained": pharmObtained,
			"TakeAsNeeded": takeAsNeeded,
			"SideEffects": sideEffects,
			"DateObtained": dateObtained,
			"PersonID": PersonId
		};


	    this.http.post(url, data)
	    .toPromise()
	    .then(response => {
	      console.log('Post Success!');
	      console.log('Reponse: ' + response);
	      if (response == true){
	        this.router.navigateByUrl('/tabs/tab3');
	      }else{
	        this.failedMsg = "There was an error in submitting your data";
	      }
	    })
	    .catch(error => {
	      console.log('Post Error!');
	      console.log('Reponse: ' + error);
	    });

	}

	toggleRX() {
		this.isRX = !this.isRX;
	}
}
