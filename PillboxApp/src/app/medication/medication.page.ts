import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Person } from '../models/Person';


@Component({
  selector: 'app-medication',
  templateUrl: './medication.page.html',
  styleUrls: ['./medication.page.scss'],
})
export class MedicationPage implements OnInit {

	isRX:boolean = false;
	failedMsg: string = "";
	rxId: any;
	medList: number[] = [];
	pID: number;

	constructor(private router: Router,
     public http: HttpClient, 
     private storage: Storage) {
	}

	ngOnInit() {
		let testUser = new Person();
        this.storage.get('user')
       .then(val => testUser = val)
       .then(() => {
       	 this.pID= testUser.id as number; 
       });
	}

	addMed(ngForm: NgForm){
		console.log('addMed()');

		let PersonId: number = this.pID;
    	let name: string = ngForm.form.value.name;

		let din: number = ngForm.form.value.din;
    	let strength: number = ngForm.form.value.strength;
    	let remainingMed: number = ngForm.form.value.medrem;
    	let pharmObtained: string = ngForm.form.value.pharm;
    	let takeAsNeeded: boolean = false;
    	let dateObtained: string = ngForm.form.value.dobt;
    	let sideEffects: string = "none";											
    	let medsched: string = "empty"												//gotta figure this out

    	this.medList.push(ngForm.form.value.din);

    	let minc: number = 0;														//getting rid of this
    	let doctor: string = "Doctor Doom";											//change to be user-input
    	let medList: string = this.medList.toString();								//gotta figure this out, how to add more medications
    	let dObt: string = ngForm.form.value.dobt;
    	let instr: string = ngForm.form.value.instr;
    	let dosage: number = ngForm.form.value.dosage;
    	let numrefills: number = ngForm.form.value.numrefills;
    	let scriptname: string = "none";

		var urlscript = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/createprescription/";
		var urlmed = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/CreateMedication";

		const datascript: any = {
			"Minc": minc,
			"Doctor": doctor,
			"Name": scriptname,
			"Dosage": dosage,
			"DateObtained": dObt,
			"PersonID": PersonId,
			"MedicationList": medList,
			"NumRefills": numrefills,
			"Instructions": ngForm.form.value.instr,
		};

		if(this.isRX) {

			this.http.post(urlscript, datascript)
		    .toPromise()
		    .then(response => {

		      console.log('Post Success!');
		      console.log('Reponse: ' + response);

		      this.rxId = response;

		      let prescriptionID: number = this.rxId as number;   
			  console.log("prescription id is " + this.rxId);

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

		      this.http.post(urlmed, datamed)
		    	.toPromise()
		    	.then(response => {
		      	console.log('Post Success!');
		      	console.log('Reponse: ' + response);
		    	})
		    	.catch(error => {
		      	console.log('Post Error!');
		      	console.log('Reponse: ' + error);
		    	});
		    })

		    .catch(error => {
		      console.log('Post Error!');
		      console.log('Reponse: ' + error);
		    });
	    }

	    else {
		  const datamed: any = {
				"Din": din,
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

	      this.http.post(urlmed, datamed)
	    	.toPromise()
	    	.then(response => {
	      	console.log('Post Success!');
	      	console.log('Reponse: ' + response);
	    	})
	    	.catch(error => {
	      	console.log('Post Error!');
	      	console.log('Reponse: ' + error);
	    	});
	    }
	}   

	toggleRX() {
		this.isRX = !this.isRX;
	}
}
