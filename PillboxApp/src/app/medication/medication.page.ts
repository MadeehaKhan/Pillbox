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

	filledMedication: Medication = null;			//if picture was taken
	FilledPrescription: Prescription = null;  //if picture was taken
	
	//medication in the form
	din: number;
	name: string = "";
	dosage: string = "";
	strength: string = "";	
	units = "mg";
	instr: string = "";
	numrefills: number;
	medrem: number;
	pharm: string = "";
	takeAsNeeded = false;
	dobt: string = new Date(Date.now()).toISOString();

	//prescription in the form
	doc: string = "";
	rx: number;

	//medicationSchedules
	count: number;
	every: string = "";
	startDate: string = new Date(Date.now()).toISOString();

	timing: string = "";

	constructor(private router: Router,
     public http: HttpClient, 
		 private storage: Storage,
		 private storageService: StorageService,
		 private loadingController: LoadingController ) {
	}

	ngOnInit() {
		console.log("ngOnInit /medication page");
		this.storage.get("FilledMedication").then(val => {
			this.filledMedication = val as Medication;						
			console.log("get filledMedication");
			console.log(this.filledMedication);
			if (this.filledMedication != null){
				// alert("Med: \n" + JSON.stringify(this.filledMedication));
				this.storage.set("FilledMedication", null);
				this.storage.set("FilledPrescription", null);
				this.setMedicationInfo();
			}else if (this.filledMedication == null){
				// alert("FilledMedication is null");
			}
		});

		this.storage.get("FilledPrescription").then(val => {
			this.FilledPrescription = val as Prescription;						
			console.log("get FilledPrescription");
			console.log(this.FilledPrescription);
			if (this.FilledPrescription != null){
				// alert("Prescription: \n" + JSON.stringify(this.FilledPrescription));
				this.storage.set("FilledMedication", null);
				this.storage.set("FilledPrescription", null);
				this.setPrescriptionInfo();
			}else if (this.FilledPrescription == null){
				// alert("FilledPrescription is null");
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
		console.log('addMed(): \n' + ngForm);
		this.notifRepeat = this.medrem;
		//variables to bind 
		let PersonId: number = this.pID; 	
		//for medication schedules
		let every: string = this.every;
		let frequency: number = this.count;
		let startDate: any = this.startDate;
		let hourList: string[] = [];
		let minuteList: string[] = [];

		console.log(this.timeList);
		for (var i = 0; i < this.timeList.length; i++) {
			hourList.push(this.timeList[i].substring(0,2));
			minuteList.push(this.timeList[i].substring(3));
		}

		console.log("After adding times");
		console.log("hours:");
		let taken: boolean = false;

		var urlscript = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/createprescription/";
		var urlmed = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/CreateMedication";
		var urlsched = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medicationschedule/createnotificationschedule/?repeatNotification=".concat(this.notifRepeat.toString());

		const datascript: any = {
			"Doctor": this.doc,
			"DateObtained": this.dobt,
			"PersonID": PersonId,
			"rx": this.rx 
		};

		const datamed: any = {
			"Din": this.din,
			"Name": this.name, 
			"Strength": this.strength,
			"RemainingPills": this.medrem,
			"PharmacyObtained": this.pharm,
			"TakeAsNeeded": this.takeAsNeeded,
			"SideEffects": "none",
			"DateObtained": this.dobt,
			"PersonID": PersonId,
			"NumRefills": this.numrefills,
			"Instructions": this.instr,
			"Dosage": this.dosage,
			"Units" : this.units
		}
		console.log('datamed: \n' + JSON.stringify(datamed));

		//for prescription medications
		if(this.isRX) {
			if (this.addSched) {
				this.http.post(urlscript, datascript)
				.toPromise()
				.then(response => {
					this.rxId = response;		//get our prescription ID
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
							"Name": this.name,
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
							console.log('RAW reponse: ' + response);
							this.storageService.addMedScheduleNotifications(response as MedSchedule[]);
							this.router.navigateByUrl('');	
							var doc = <HTMLFormElement>document.getElementById("addMed"); 	//reset the form so the user can add more medications
							doc.reset();
						})
						.catch(error => {
							console.log("2 Raw dataschedues: " + this.dataschedules);
							console.log('Error Reponse: ' + error);
						});
					})
					.catch(error => {
						console.log("3 Raw dataschedues: " + this.dataschedules);
						console.log('Post Error!');
						console.log('Reponse: ' + error);
					})
				})
				.catch(error => {
					console.log("4 Raw dataschedues: " + this.dataschedules);
					console.log('Post Error!');
					console.log('Reponse: ' + error);
				});
			}
			else {
				this.http.post(urlscript, datascript)
				.toPromise()
				.then(response => {
					console.log('Succ Reponse: ' + response);				
					this.rxId = response; //get our prescription ID
					console.log("prescription id is " + this.rxId);

					//use it to create a Medication object
					this.http.post(urlmed, datamed)
					.toPromise()
					.then(response => {
						console.log('Succ Reponse: ' + response);

						this.storageService.addMedScheduleNotifications(response as MedSchedule[]);
						this.router.navigateByUrl('');
						var doc = <HTMLFormElement>document.getElementById("addMed"); 					//reset the form so the user can add more medications
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
			//not in use
			//once ONE prescription medication has been added and we have a rxId we can add more medications to that prescription
			// var button = <HTMLButtonElement>document.getElementById("addToScript")
			// button.disabled = false;
		}
		//POST for non-prescription medication
		else {
			if (this.addSched){
				this.http.post(urlmed, datamed)
				.toPromise()
				.then(async response => {
					console.log('Succ Reponse: ' + response);
					this.medId = response;
					console.log("med id is " + this.medId);
					console.log("timeslist: " + this.timeList);

					for (var i=0; i < this.timeList.length; i++) {
						const datasched: any = {
							"Name": this.name,
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
						this.router.navigateByUrl('');
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

	setMedicationInfo() {
		this.filledMedication;
		this.din = this.filledMedication.din;
		this.name = this.filledMedication.name;
		this.dosage = this.filledMedication.dosage;
		this.strength = this.filledMedication.strength.toString();
		this.units = this.filledMedication.units;
		this.instr = this.filledMedication.instructions;
		this.numrefills = this.filledMedication.numRefills;
		this.medrem = this.filledMedication.remainingPills;
		this.pharm = this.filledMedication.pharmacyObtained;
		this.takeAsNeeded = this.filledMedication.takeAsNeeded;
		this.dobt = this.filledMedication.dateObtained.toString();
	}

	setPrescriptionInfo(){
		this.doc = this.FilledPrescription.doctor;
		this.rx = this.FilledPrescription.rx;
	}
}