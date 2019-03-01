import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-medication-modify',
  templateUrl: './medication-modify.page.html',
  styleUrls: ['./medication-modify.page.scss'],
})
export class MedicationModifyPage implements OnInit {

	information: any = {}
	rxInfo: any = {}
	isRx: boolean = true;
	sidefx: string[] = [];
	medId: string = "22";
	pId: number = 9;

  constructor(private router: Router, public http: HttpClient) {
  	this.http.get("https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/getmedication/".concat(this.medId))
  	.toPromise()
  	.then((response) => {
  		this.information = response;
		if (this.information['sideEffects'] != "none") {
		  	var sfxArr = this.information['sideEffects'].split(',');
		  	for (let s of sfxArr) {
	  			this.sidefx.unshift(s);
	  		}
	  	}
	  	console.log(this.information);
	  	var num = new Number(this.information['prescriptionId'])
		this.http.get("https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/getprescription/".concat(this.information['prescriptionId'].toString(10)+"/"))
  		.toPromise()
  		.then((response) => {
	  		this.rxInfo = response;
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
  	/*this.http.get("https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/getprescription/".concat(this.rxId))
  		.toPromise()
  		.then((response) => {
  	//.subscribe((response) =>
	  		//console.log(response); 
	  		this.rxInfo = response;
	  		this.http.get("https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/getmedication/".concat(this.medId))
	  			.subscribe((response) => { 
		  			//console.log(response); 
		  			this.information = response;
		  			if (this.information['sideEffects'] != "none") {
		  				var sfxArr = this.information['sideEffects'].split(',');
		  				for (let s of sfxArr) {
	  						this.sidefx.unshift(s);
	  					}
	  				}
	  			})
	  	})
  		.catch(error => {
		    console.log('Post Error!');
		    console.log('Reponse: ' + error);
		}); */
  }

 


  ngOnInit() {

  }

  editMed(ngForm: NgForm) {
  	
  	var scripturl = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/editprescription/";
  	var medurl = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/editmedication/";

  	let PersonId: number = this.pId;
    let name: string = ngForm.form.value.name;
    let dateObtained: string = ngForm.form.value.dobt;

  	let mId: number = parseInt(this.medId,10);
  	let din: number = ngForm.form.value.din;
    let strength: number = ngForm.form.value.strength;
    let remainingMed: number = ngForm.form.value.medrem;
    let pharmObtained: string = ngForm.form.value.pharmObt;
    let takeAsNeeded: boolean = false;
    let sideEffects: string = this.sidefx.toString();		
    let medsched: string = "none";

    let minc: number = 2738; 								
    let doctor: string = ngForm.form.value.doc;
    let medList: string = "none";							
    let dObt: string = ngForm.form.value.dobt;				//kept this as the same for both but need to change that eventually
    let instr: string = ngForm.form.value.instr;
    let dosage: number = ngForm.form.value.dosage;
    let numrefills: number = ngForm.form.value.numrefills;
    let id: number = this.information['prescriptionId'];
    //console.log(id);

    const datascript: any = {
    	"id": id,
		"Minc": minc,
		"Doctor": doctor,
		"Name": name,
		"Dosage": dosage,
		"DateObtained": dObt,
		"PersonID": PersonId,
		"MedicationList": medList,
		"NumRefills": numrefills,
		"Instructions": instr,
		};

	const datamed: any = {
		"id" : mId,
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
		"PrescriptionId": id,
	}

	//this.http.post(scripturl, datascript)
	this.http.post(medurl, datamed)
	    .toPromise()
	    .then(response => {
	      console.log('Post Success!');
	      console.log('Reponse: ' + response);

	      if (response != null){
	      	this.http.post(scripturl, datascript)
	      	//this.http.post(medurl, datamed)
		    	.toPromise()
		    	.then(response => {
		      	console.log('Post Success!');
		      	console.log('Reponse: ' + response);
		    	})
		    	.catch(error => {
		      	console.log('Post Error!');
		      	console.log('Reponse: ' + typeof(error));
		    	});
		   }

	    })
	    .catch(error => {
	      console.log('Post Error!');
	      console.log('Reponse: ' + typeof(error));
	    });
	//console.log(datascript);

  }

   addSFX(sfx){
    //console.log(sfx);
    this.sidefx.unshift(sfx);
    return false;
  }

  deleteSFX(i){
    this.sidefx.splice(i, 1);
  }

}
