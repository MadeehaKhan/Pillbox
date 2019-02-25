import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-medication',
  templateUrl: './medication.page.html',
  styleUrls: ['./medication.page.scss'],
})
export class MedicationPage implements OnInit {

	isRX:boolean = false;
	failedMsg: string = "";

	constructor(private router: Router, public http: HttpClient) {}

	ngOnInit() {}

	addMed(ngForm: NgForm){
		console.log('addMed()');

		let PersonId: number = 9;
    	let name: string = ngForm.form.value.name;

		let din: number = ngForm.form.value.din;
    	let prescriptionID: number = ngForm.form.value.rxid;
    	let strength: number = ngForm.form.value.strength;
    	let remainingMed: number = ngForm.form.value.medrem;
    	let pharmObtained: string = ngForm.form.value.pharm;
    	let takeAsNeeded: boolean = false;
    	let dateObtained: string = ngForm.form.value.dobt;
    	let sideEffects: string = "none";
    	let medsched: string = "empty"

    	let minc: number = 2738;
    	let doctor: string = "Doctor Doom";
    	let medList: string = "none";
    	let dObt: string = ngForm.form.value.dobt;
    	let instr: string = ngForm.form.value.instr;
    	let dosage: number = ngForm.form.value.dosage;
    	let numrefills: number = ngForm.form.value.numrefills;

		var urlmed = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/CreateMedication";
		var urlscript = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/createprescription/";

		const datamed: any = {
			"Din": din,
			"PrescriptionId": prescriptionID,
			"Name": name,
			"Strength": strength,
			"RemainingPills": remainingMed,
			"PharmacyObtained": pharmObtained,
			"TakeAsNeeded": takeAsNeeded,
			"SideEffects": sideEffects,
			"DateObtained": dateObtained,
			"PersonID": PersonId,
			"MedicationSchedule": medsched,
		};

		const datascript: any = {
			"Minc": minc,
			"Doctor": doctor,
			"Name": name,
			"Dosage": dosage,
			"RemainingPills": remainingMed,
			"DateObtained": dObt,
			"PersonID": PersonId,
			"MedicationList": medList,
			"NumRefills": numrefills,
			"Instructions": ngForm.form.value.instr,
		};

	    this.http.post(urlmed, datamed)
	    .toPromise()
	    .then(response => {
	      console.log('Post Success!');
	      console.log('Reponse: ' + response);
	      if (response == true){
	        this.router.navigateByUrl('/medication');
	      }else{
	        this.failedMsg = "There was an error in submitting your medication data";
	      }
	    })
	    .catch(error => {
	      console.log('Post Error!');
	      console.log('Reponse: ' + error);
	    });

	    this.http.post(urlscript, datascript)
	    .toPromise()
	    .then(response => {
	      console.log('Post Success!');
	      console.log('Reponse: ' + response);
	      if (response == true){
	        this.router.navigateByUrl('/medication');
	      }else{
	        this.failedMsg = "There was an error in submitting your prescription data";
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
