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
	addToRx: boolean = false;

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

	adding(ngForm: NgForm) {
		if (this.addToRx) {
			this.addRxMed(ngForm);
		}
		else {this.addMed(ngForm);
		}
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

    	let units: string = ngForm.form.value.units;
    	
    	let doctor: string = ngForm.form.value.doc;											

    	let dObt: string = ngForm.form.value.dobt;
    	let instr: string = ngForm.form.value.instr;
    	let dosage: number = ngForm.form.value.dosage;
    	let numrefills: number = ngForm.form.value.numrefills;

		var urlscript = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/createprescription/";
		var urlmed = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/CreateMedication";

		const datascript: any = {
			"Doctor": doctor,
			"DateObtained": dObt,
			"PersonID": PersonId
		};

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

			"NumRefills": numrefills,
			"Instructions": instr,

			"Dosage": dosage,
			"Units" : units
		}

		if(this.isRX) {

			this.http.post(urlscript, datascript)
		    .toPromise()
		    .then(response => {

		      console.log('Post Success!');
		      console.log('Reponse: ' + response);

		      this.rxId = response;

		      let prescriptionID: number = this.rxId as number;   
			  console.log("prescription id is " + this.rxId);

		      this.http.post(urlmed, datamed)
		    	.toPromise()
		    	.then(response => {
		      	console.log('Post Success!');
		      	console.log('Reponse: ' + response);
		      	var doc = <HTMLFormElement>document.getElementById("addMed");
		      	doc.reset();
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

	      this.http.post(urlmed, datamed)
	    	.toPromise()
	    	.then(response => {
	      	console.log('Post Success!');
	      	console.log('Reponse: ' + response);
	      	var doc = <HTMLFormElement>document.getElementById("addMed");
		    doc.reset();
	    	})
	    	.catch(error => {
	      	console.log('Post Error!');
	      	console.log('Reponse: ' + error);
	    	});
	    }
	    var button = <HTMLButtonElement>document.getElementById("addToScript")
	    button.disabled = false;
	}   

	toggleRX() {
		this.isRX = !this.isRX;
	}

	addToScript() {
		this.addToRx = true;
	}

	addRxMed(ngForm: NgForm) {
		if (this.addToRx) {

		var urlmed = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/CreateMedication";

	    let PersonId: number = this.pID;
    	let name: string = ngForm.form.value.name;

		let din: number = ngForm.form.value.din;
    	let strength: number = ngForm.form.value.strength;
    	let remainingMed: number = ngForm.form.value.medrem;
    	let pharmObtained: string = ngForm.form.value.pharm;
    	let takeAsNeeded: boolean = false;
    	let dateObtained: string = ngForm.form.value.dobt;
    	let sideEffects: string = "none";											
    	let medsched: string = "empty"	
    	let prescriptionID: number = this.rxId as number;   

    	let instr: string = ngForm.form.value.instr;
    	let dosage: number = ngForm.form.value.dosage;
    	let numrefills: number = ngForm.form.value.numrefills;
		
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

			"NumRefills": numrefills,
			"Instructions": instr,

			"Dosage": dosage
		};

        this.http.post(urlmed, datamed)
    	.toPromise()
    	.then(response => {
      	console.log('Post Success!');
      	console.log('Reponse: ' + response);
      	var doc = <HTMLFormElement>document.getElementById("addMed");
      	doc.reset();
    	})
    	.catch(error => {
      	console.log('Post Error!');
      	console.log('Reponse: ' + error);
    	});
}
	}

}
