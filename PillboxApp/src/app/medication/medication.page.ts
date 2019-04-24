import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Person } from '../models/Person';
import { Medication } from '../models/Medication';
import { Prescription } from '../models/Prescription';
import { StorageService } from '../services/storage.service';
import { MedSchedule } from '../models/MedSchedule';
import { LoadingController } from '@ionic/angular';

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
	notifRepeat: number;
	timeList: any[] = [];
	dataschedules: any[] = [];

	filledMedication: Medication = null;
	filledPrescription: Prescription = null;

	takeAsNeeded = false;
	units = "mg";
	startDate: string;

	timing: string = "";

	constructor(private router: Router,
     public http: HttpClient, 
		 private storage: Storage,
		 private storageService: StorageService,
		 private loadingController: LoadingController ) {
	}

	ngOnInit() {
		this.startDate = new Date(Date.now()).toISOString();
		console.log("ngOnInit /medication page");
		this.storage.get("FilledMedication").then(val => {
			this.filledMedication = val as Medication;						
			console.log("get filledMedication");
			console.log(this.filledMedication);
			if (this.filledMedication != null){
				alert("FilledMedication not null");
				alert("Med name:" + this.filledMedication.name);
				alert("Med dosage:" + this.filledMedication.dosage);
				this.storage.set("FilledMedication", null);
				this.storage.set("FilledPrescription", null);
			}else if (this.filledMedication == null){
				alert("FilledMedication is null");
			}
		});

		let testUser = new Person();
		this.storage.get('user')
		.then(val => testUser = val)
		.then(() => {
			this.pID= testUser.id as number; 
		});
	}

//function that determines whether we are adding to a preexisting prescription or not
async adding(ngForm: NgForm) {
		if (this.addToRx) {
			this.addRxMed(ngForm);
		}
		else {this.addMed(ngForm);
		}
	}

//creates a new Medication object (and Prescription object if that is the case)
async addMed(ngForm: NgForm){
		console.log('addMed()');
		console.log(ngForm);

		this.notifRepeat = ngForm.form.value.medrem;

	//variables to bind 
		let PersonId: number = this.pID;
    	let name: string = ngForm.form.value.name;
    	let medName: string = ngForm.form.value.name;

		let din: number = ngForm.form.value.din;
    	let strength: number = ngForm.form.value.strength;
    	let remainingMed: number = ngForm.form.value.medrem;
    	let pharmObtained: string = ngForm.form.value.pharm;
    	// let takeAsNeeded: boolean = ngForm.form.value.takeAsNeeded;
    	let dateObtained: string = ngForm.form.value.dobt;
    	let sideEffects: string = "none";											
    	let units: string = this.units;
    	
    	let doctor: string = ngForm.form.value.doc;											

    	let dObt: string = ngForm.form.value.dobt;
    	let instr: string = ngForm.form.value.instr;
    	let dosage: number = ngForm.form.value.dosage;
    	let numrefills: number = ngForm.form.value.numrefills;

    	let every: string = ngForm.form.value.every;
    	let frequency: number = ngForm.form.value.count;
    	let startDate: any = this.startDate;
    	console.log("date: " + startDate);
    	let hourList: string[] = [];
    	let minuteList: string[] = [];
    	console.log("adding times");
			console.log(this.timeList);
			console.log(this.timeList.length);
    	for (var i = 0; i < this.timeList.length; i++) {
    		hourList.push(this.timeList[i].substring(0,2));
    		console.log("hour:" + hourList[i]);
    		minuteList.push(this.timeList[i].substring(3));
    		console.log("minute:" + minuteList[i]);
			}
			console.log("After adding times");
    	console.log("hours:");
    	let taken: boolean = false;


		var urlscript = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/createprescription/";
		var urlmed = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/CreateMedication";
		var urlsched = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medicationschedule/createnotificationschedule/?repeatNotification=".concat(this.notifRepeat.toString());


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
			"TakeAsNeeded": this.takeAsNeeded,
			"SideEffects": sideEffects,
			"DateObtained": dateObtained,
			"PersonID": PersonId,

			"NumRefills": numrefills,
			"Instructions": instr,

			"Dosage": dosage,
			"Units" : this.units
		}

		console.log('datamed: \n' + JSON.stringify(datamed));

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
  
				    console.log("med id is " + this.medId);


				    for (var i=0; i < this.timeList.length; i++) {
				    	const datasched: any = {
			  			"Name": name,
			  			"date": startDate,
			  			"medicationid" : this.medId as number,
			  			"medinfo": "none",
			  			"every": every,
			  			"count": frequency,
			  			"hour": Number(hourList[i]),
			  			"minute": Number(minuteList[i]),
			  			"taken" : taken
					};
						this.dataschedules.push(datasched);
				    }
					
							console.log("2 Raw dataschedues: " + this.dataschedules);
			      	this.http.post(urlsched, this.dataschedules)
			    	 .toPromise()
			    	 .then(response => {
			      	 console.log('Post Success!');
			      	 console.log('RAW reponse: ' + response);

							 this.storageService.addMedScheduleNotifications(response as MedSchedule[]);
							 this.router.navigateByUrl('')

					//reset the form so the user can add more medications
			      	var doc = <HTMLFormElement>document.getElementById("addMed");
			      	doc.reset();
			    	})
			    	 .catch(error => {
								console.log("2 Raw dataschedues: " + this.dataschedules);
			      		console.log('Post Error!');
			      		console.log('Reponse: ' + error);
			    })

			
			    	.catch(error => {
							console.log("3 Raw dataschedues: " + this.dataschedules);
			      	console.log('Post Error!');
			      	console.log('Reponse: ' + error);
			    	});
			    })

			    .catch(error => {
						console.log("4 Raw dataschedues: " + this.dataschedules);
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

							this.storageService.addMedScheduleNotifications(response as MedSchedule[]);
							this.router.navigateByUrl('')

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

			//once ONE prescription medication has been added and we have a rxId we can add more medications to that prescription
	    	var button = <HTMLButtonElement>document.getElementById("addToScript")
	    	button.disabled = false;
	    }

		//POST for non-prescription medication
	    else {

	    	if (this.addSched){
	    		this.http.post(urlmed, datamed)
		    	.toPromise()
		    	.then(async response => {
		      	console.log('Post Success!');
		      	console.log('Reponse: ' + response);

		      	this.medId = response;
 
				    console.log("med id is " + this.medId);
						console.log("timeslist: " + this.timeList);
						console.log("timeslist length: " + this.timeList.length);
	    		 for (var i=0; i < this.timeList.length; i++) {
				    	const datasched: any = {
			  			"Name": name,
			  			"medicationid" : this.medId as number,
			  			"medinfo": "none",
			  			"date": startDate,
			  			"every": every,
			  			"count": frequency,
			  			"hour": Number(hourList[i]),
			  			"minute": Number(minuteList[i]),
			  			"taken" : taken
							};
							this.dataschedules.push(datasched);
							console.log("Data sched: " + this.dataschedules);
						}

							 const loading = await this.loadingController.create({
							 	message: "Please wait..."
							 });
							await loading.present();

			      	this.http.post(urlsched, this.dataschedules)
			    	 .toPromise()
			    	 .then(response => {
							 console.log("5 Raw dataschedues: " + this.dataschedules);
			      	 console.log('Post Success!');
							 console.log('Reponse: ' + response);
							 
							 loading.dismiss();
							this.storageService.addMedScheduleNotifications(response as MedSchedule[]);
							
							this.router.navigateByUrl('')

			      	//var doc = <HTMLFormElement>document.getElementById("addMed");
			      	//doc.reset();
						})
			    	 .catch(error => {
								loading.dismiss();
								console.log("6 Raw dataschedues: " + this.dataschedules);
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
						console.log("7 Raw dataschedues: " + this.dataschedules);
		      	console.log('Post Error!');
		      	console.log('Reponse: ' + error);
		    	});
		    }
		}
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
	    	//we already know the rxId so we just add it here	
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

	addTime(time){
		console.log(time);
		this.timeList.push(time);
		this.timeList = this.timeList.sort((a,b) => a > b ? 1 : -1);
		this.timing = "";
		return false;
	}

  deleteTime(i){
    this.timeList.splice(i, 1);
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

}
