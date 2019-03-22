import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-db',
  templateUrl: './test-db.page.html',
  styleUrls: ['./test-db.page.scss'],
})
export class TestDBPage implements OnInit {
  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }

  // developer = {};
  // developers = [];
 
  // constructor(public navCtrl: NavController, private databaseprovider: DatabaseService, private platform: Platform, private router: Router) {
  //   this.databaseprovider.getDatabaseState().subscribe(rdy => {
  //     if (rdy) {
  //       this.loadDeveloperData();
  //     }
  //   })
  // }
 
  // loadDeveloperData() {
  //   this.databaseprovider.getAllDevelopers().then(data => {
  //     this.developers = data;
  //   })
  // }
 
  // addDeveloper() {
  //   this.databaseprovider.addDeveloper(this.developer['name'], this.developer['skill'], parseInt(this.developer['yearsOfExperience']))
  //   .then(data => {
  //     this.loadDeveloperData();
  //   });
  //   this.developer = {};
  // }

  // back(){
  //   this.router.navigateByUrl('/tabs/tab3');
  // }

}
