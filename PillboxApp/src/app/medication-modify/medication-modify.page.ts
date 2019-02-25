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

	information: any;
	rxInfo: any;
	isRx: boolean = true;
	sidefx: string[];

  constructor(private router: Router, public http: HttpClient) {
 // 	this.http.get("https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/getmedication/4").subscribe((response) => 
 // 		{ console.log(response); this.information = response;
 // 		});
  	this.http.get("https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/getprescription/4").subscribe((response) =>
  		{ console.log(response); this.rxInfo = response;
  		}); 
  }

  ngOnInit() {
  }

  editMed(ngForm: NgForm) {
  	var medurl = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/editmedication/";
  	var scripturl = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/editprescription/";

  	let PersonId: number = 9;
    let name: string = "Acetaminophen";
    //ngForm.form.value.name;
    let dateObtained: string = ngForm.form.value.dobt;

  	let din: number = ngForm.form.value.din;
    let prescriptionID: number = ngForm.form.value.rxid;
    let strength: number = ngForm.form.value.strength;
    let remainingMed: number = ngForm.form.value.medrem;
    let pharmObtained: string = ngForm.form.value.pharm;
    let takeAsNeeded: boolean = false;
    let sideEffects: string = ngForm.form.value.sidefx;

    let minc: number = 2738; 								//don't want this to be mutable, might actually need to cut it because no public availability for minc --> doctor
    let doctor: string = "Doctor Doom";
    let medList: string = "none";							//don't understand the different between this and name
    let dObt: string = ngForm.form.value.dobt;				//kept this as the same for both but need to change that eventually
    let instr: string = ngForm.form.value.instr;
    //
    let dosage: number = ngForm.form.value.dosage;
    let numrefills: number = ngForm.form.value.numrefills;

    const datascript: any = {
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

	console.log(datascript);

	this.http.post(scripturl, datascript)
	    .toPromise()
	    .then(response => {
	      console.log('Post Success!');
	      console.log('Reponse: ' + response);
	      if (response == true){
	        this.router.navigateByUrl('/medication-modify');
	      }
	    })
	    .catch(error => {
	      console.log('Post Error!');
	      console.log('Reponse: ' + error);
	    });

  }

   addSFX(sfx){
    console.log(sfx);
    this.sidefx.unshift(sfx);
    return false;
  }

  deleteSFX(i){
  	console.log(i);
    this.sidefx.splice(i, 1);
  }

  //make sideEffects NULLable
  //add isPrecription field to createMedication
  //made prescriptionID NULLable


}
