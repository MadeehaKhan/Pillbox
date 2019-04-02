import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
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
	medId: any;
	pID: number;
	addToRx: boolean = false;
	addSched: boolean = false;


	constructor(private router: Router,
     public http: HttpClient, 
     private storage: Storage,) {
	}

	ngOnInit() {
		let testUser = new Person();
        this.storage.get('user')
       .then(val => testUser = val)
       .then(() => {
       	 this.pID= testUser.id as number; 
       });
	}




//function that determines whether we are adding to a preexisting prescription or not
	adding(ngForm: NgForm) {
		if (this.addToRx) {
			this.addRxMed(ngForm);
		}
		else {this.addMed(ngForm, ngForm);
		}
	}


//creates a new Medication object (and Prescription object if that is the case)
	addMed(ngForm: NgForm, ngForm2: NgForm){
		console.log('addMed()');


//variables to bind 
		let PersonId: number = this.pID;
    	let name: string = ngForm.form.value.name;
    	let medName: string = ngForm.form.value.name;

		let din: number = ngForm.form.value.din;
    	let strength: number = ngForm.form.value.strength;
    	let remainingMed: number = ngForm2.form.value.medrem;
    	let pharmObtained: string = ngForm2.form.value.pharm;
    	let takeAsNeeded: boolean = false;
    	let dateObtained: string = ngForm2.form.value.dobt;
    	let sideEffects: string = "none";											
    	let medsched: string = "empty"												//gotta figure this out

    	let units: string = ngForm.form.value.units;
    	
    	let doctor: string = ngForm.form.value.doc;											

    	let dObt: string = ngForm.form.value.dobt;
    	let instr: string = ngForm.form.value.instr;
    	let dosage: number = ngForm.form.value.dosage;
    	let numrefills: number = ngForm.form.value.numrefills;

    	let every: string = ngForm.form.value.every;
    	let frequency: number = ngForm.form.value.count;
    	let startDate: string = ngForm.form.value.takeMed;
    	let hour: string = ngForm.form.value.takeMed.substring(11,13);
    	let minute: string = ngForm.form.value.takeMed.substring(13,15);
    	let taken: boolean = false;


		var urlscript = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/createprescription/";
		var urlmed = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/CreateMedication";
		var urlsched = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medicationschedule/createmedicationschedule/";


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

//for prescription medications
		if(this.isRX) {

			if (this.addSched) {
				this.http.post(urlscript, datascript)
			    .toPromise()
			    .then(response => {

			      console.log('Post Success!');

	//get our prescription ID
			      this.rxId = response;

			      let prescriptionID: number = this.rxId as number;   
				  console.log("prescription id is " + this.rxId);

	//use it to create a Medication object
			      this.http.post(urlmed, datamed)
			    	.toPromise()
			    	.then(response => {
			      	console.log('Post Success!');

			      	this.medId = response;

			        let prescriptionID: number = this.medId as number;   
				    console.log("med id is " + this.medId);

//we create a MedicationSchedule object
		
					const datasched: any = {
			  			"Name": name,
			  			"medicationid" : this.medId,
			  			"medinfo": " ",
			  			"every": every,
			  			"count": frequency,
			  			"hour": hour,
			  			"minute": minute,
			  			"taken" : taken
					};

			      	this.http.post(urlsched, datasched)
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
			    })

	//reset the form so the user can add more medications
			      	
			    	.catch(error => {
			      	console.log('Post Error!');
			      	console.log('Reponse: ' + error);
			    	});
			    })

			    .catch(error => {
			      console.log('Post Error!');
			      console.log('Reponse: ' + error);
			    });
		    	});
		    }

			else {
				this.http.post(urlscript, datascript)
			    .toPromise()
			    .then(response => {

			      console.log('Post Success!');
			      console.log('Reponse: ' + response);

	//get our prescription ID
			      this.rxId = response;

			      let prescriptionID: number = this.rxId as number;   
				  console.log("prescription id is " + this.rxId);

	//use it to create a Medication object
			      this.http.post(urlmed, datamed)
			    	.toPromise()
			    	.then(response => {
			      	console.log('Post Success!');
			      	console.log('Reponse: ' + response);

	//reset the form so the user can add more medications
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
	    }

//POST for non-prescription medication
	    else {

	    	if (this.addSched){
	    		this.http.post(urlmed, datamed)
		    	.toPromise()
		    	.then(response => {
		      	console.log('Post Success!');
		      	console.log('Reponse: ' + response);

	    		const datasched: any = {
			  			"Name": name,
			  			"medicationid" : this.medId,
			  			"medinfo": " ",
			  			"every": every,
			  			"count": frequency,
			  			"hour": hour,
			  			"minute": minute,
			  			"taken" : taken
					};

			      	this.http.post(urlsched, datasched)
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
	}   

	toggleRX() {
		this.isRX = !this.isRX;
	}

	toggleSched() {
		this.addSched = !this.addSched;
	}

	addToScript() {
		this.addToRx = true;
	}

//function that adds to an existing prescription
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
