import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Person } from '../models/Person';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medication-modify',
  templateUrl: './medication-modify.page.html',
  styleUrls: ['./medication-modify.page.scss'],
})
export class MedicationModifyPage implements OnInit {

	information: any = {}
	rxInfo: any = {}
	isRx: boolean = false;
	sidefx: string[] = [];
	pId: number;
	date: string;
	medList: number[] = [];

  constructor(private router: Router, public http: HttpClient, 
     private storage: Storage, private route: ActivatedRoute) {

  	this.http.get("https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/getmedication/".concat(this.route.snapshot.paramMap.get('id')))
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

	  	if (this.isRx) {
		this.http.get("https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/getprescription/".concat(this.information['prescriptionId'].toString(10)+"/"))
  		.toPromise()
  		.then((response) => {
	  		this.rxInfo = response;
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
  		let testUser = new Person();
        this.storage.get('user')
       .then(val => testUser = val)
       .then(() => {
       	 this.pId= testUser.id as number; 
       });
  }

  editMed(ngForm: NgForm) {
  	
  	var scripturl = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/editprescription/";
  	var medurl = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/editmedication/";
  	const options = {responseType: 'text' as 'text'};

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
    let medList: string = this.medList.toString();							
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

	
	if (this.isRx) {
		//this.http.post(scripturl, datascript)
		this.http.post(medurl, datamed, options)
		    .toPromise()
		    .then(response => {
		      console.log('Post Success!');
		      console.log('Reponse: ' + response);

		      if (response != null){
		      	this.http.post(scripturl, datascript, options)
		      	//this.http.post(medurl, datamed)
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

		    })
		    .catch(error => {
		      console.log('Post Error!');
		      console.log('Reponse: ' + error);
		    });
		//console.log(datascript);

	  }
	  
	else {
		this.http.post(medurl, datamed, options)
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

  deleteMed() {												

  	var delUrl = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/deletemedication/".concat(this.medId);

  	var retVal = confirm("Are you sure you want to delete this medication?");
    if( retVal == true ) {
	   	var deldata: any = {}

	  	this.http.post(delUrl, deldata)
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

   }
																																	

   addSFX(sfx){

    //console.log(sfx);
    this.sidefx.unshift(sfx);
    return false;

  }

  deleteSFX(i){

    this.sidefx.splice(i, 1);

	}
	
	back(){
    this.router.navigateByUrl('/tabs/tab1');
  }

}
