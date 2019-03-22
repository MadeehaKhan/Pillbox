import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testing-local-notifications',
  templateUrl: './testing-local-notifications.page.html',
  styleUrls: ['./testing-local-notifications.page.scss'],
})
export class TestingLocalNotificationsPage implements OnInit {

  scheduled = [];
  
  constructor(private plt: Platform, private localNotifications: LocalNotifications, private alerCtrl: AlertController, private router: Router) {     
    this.plt.ready().then(() => {
      this.localNotifications.on('click').subscribe(res =>{
         console.log('click: ', res);
         let msg = res. data ? res.data.mydata : '';
         this.showAlert(res.tile, res.text, msg);
      });

      this.localNotifications.on('trigger').subscribe(res =>{
        console.log('trigger: ', res);
        let msg = res. data ? res.data.mydata : '';
        this.showAlert(res.tile, res.text, msg);
      });
    });
  }

  ngOnInit() {
  }

  public scheduleNotification(){
    var today = new Date(Date.now())
    var mydate = new Date(today);//new Date(today.getFullYear(), today.getMonth(), today.getDate());
    console.log("Time Right now: "+ mydate.getMonth() + "/" + mydate.getDate()+"/" + mydate.getMinutes() + ", time: " + mydate.toLocaleTimeString());
    mydate.setHours(mydate.getHours())
    mydate.setMinutes(mydate.getMinutes() + 1);
    console.log("New Time: "+ mydate.getMonth() + "/" + mydate.getDate()+"/" + mydate.getMinutes() + ", time: " + mydate.toLocaleTimeString());
    this.showAlert("Time",  "Date: "+ mydate.getMonth() + "/" + mydate.getDate()+"/" + mydate.getMinutes() ,"time: " + mydate.toLocaleTimeString())
    this.localNotifications.schedule({
      id: 1,
      title: 'Pillbox App',
      text: 'Take your medications',
      data: { mydata: 'More information'},
      actions: [
        {id: 'take', title: 'Take'},
        {id: 'dismiss', title: 'Dismiss'}
      ],
      smallIcon: 'file://assets/img/avatar-finn', //icons not working
      color: '#4286f4',
      //trigger: { in: 3, unit: ELocalNotificationTriggerUnit.SECOND }
      trigger: { at: new Date(mydate)}
    });

    //or can also do
    // trigger: { at: new Date(new Date.getTime() + 5 * 1000)}
    // foreground: true
  }

  back(){
    this.router.navigateByUrl('/tabs/tab1');
  }

  public cancelNotification(){
    this.localNotifications.cancel(1);
    this.showAlert("notification Canceled!", "sub", "canceled");
  }

  public recurringNotification(){
    this.localNotifications.schedule({
      id: 1,
      title: 'Recurring Pillbox Notification',
      text: 'Recuring text',
      data: { mydata: 'More information'},
      trigger: { every: ELocalNotificationTriggerUnit.MINUTE }
    });
  }

  public repeatingDaily(){
    this.localNotifications.schedule({
      id: 1,
      title: 'Good Morning Pillbox',
      text: 'Quick reminder to...',
      data: { mydata: 'More information'},
      trigger: { every: { hour: 16, minute: 36 }, count: 2 }
    });
  }

  public getAll(){
    this.localNotifications.getAll().then(res => {
      this.scheduled = res;
    });
  }

  public showAlert(header, sub, msg){
    this.alerCtrl.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['Ok']
    }).then(alert => alert.present())
  }

}
