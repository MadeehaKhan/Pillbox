import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MedTrigger } from '../models/MedTrigger';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { AlertController, Platform } from '@ionic/angular';

// export interface Item{
//   id: number,
//   title: string,
//   value: string,
//   modified: number
// }

const MEDTRIGGERS_KEY = 'my-triggers';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage, private localNotifications: LocalNotifications, private alerCtrl: AlertController, 
      private plt: Platform) { 
        this.plt.ready().then(() => {
          this.localNotifications.on('click').subscribe(res =>{
             //console.log('click: ', res);
             let msg = res. data ? res.data.mydata : '';
             this.showAlert(res.tile, res.text, msg);
          });
    
          this.localNotifications.on('trigger').subscribe(res =>{
            //console.log('trigger: ', res);
            let msg = res. data ? res.data.mydata : '';
            this.showAlert(res.tile, res.text, msg);
          });
        });
      }

  // CREATE
  addItem(item: MedTrigger): Promise<any> {
    return this.storage.get(MEDTRIGGERS_KEY).then((items: MedTrigger[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(MEDTRIGGERS_KEY, items);
      } else {
        return this.storage.set(MEDTRIGGERS_KEY, [item]);
      }
    });
  }

  // CREATE with Notification
  addItemWithNotification(item: MedTrigger): Promise<any> {
    return this.storage.get(MEDTRIGGERS_KEY).then((items: MedTrigger[]) => {
      if (items) {
        items.push(item); 
        console.log("Adding item id: " + item.id + ", Hour = " + item.hour + ", Minute = " + item.minute);
        this.scheduleNotification(item.id, item.name, item.medInfo, item.every, item.hour, item.minute);
        return this.storage.set(MEDTRIGGERS_KEY, items);
      } else {
        return this.storage.set(MEDTRIGGERS_KEY, [item]);
      }
    });
  }

  // READ
  getItems(): Promise<MedTrigger[]> {
    return this.storage.get(MEDTRIGGERS_KEY);
  }
   
  // UPDATE
  updateItem(item: MedTrigger): Promise<any> {
    return this.storage.get(MEDTRIGGERS_KEY).then((items: MedTrigger[]) => {
      if (!items || items.length === 0) {
        return null;
      }
  
      let newItems: MedTrigger[] = [];
  
      for (let i of items) {
        if (i.id === item.id) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }
  
      return this.storage.set(MEDTRIGGERS_KEY, newItems);
    });
  }
  
  // DELETE
  deleteItem(id: number): Promise<MedTrigger> {
    return this.storage.get(MEDTRIGGERS_KEY).then((items: MedTrigger[]) => {
      if (!items || items.length === 0) {
        return null;
      }
  ;
      let toKeep: MedTrigger[] = [];
  
      for (let i of items) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(MEDTRIGGERS_KEY, toKeep);
    });
  }

  //Notification Functions
  //schedule single notification
  public scheduleNotification(medID: number, medName: string, medInfo: string, tevery: string, tHour: Number, tMinute: Number){
    var x = ELocalNotificationTriggerUnit.SECOND;
    var now = Date.now();
    var date = new Date(now);
    date.setMinutes(parseInt(tMinute.toString()));
    date.setHours(parseInt(tHour.toString()));
    console.log("Inside sending storage!");
    this.localNotifications.schedule({
      id: medID,
      title: 'Pillbox App',
      text: medName,
      data: { mydata: medInfo},
      actions: [
        {id: 'take', title: 'Take'},
        {id: 'dismiss', title: 'Dismiss'}
      ],
      smallIcon: 'file://assets/img/avatar-finn', //icons not working
      color: '#4286f4',
      //trigger: { in: parseInt(tMinute.toString()) , unit: x } // works- sends notification in given seconds
      //trigger: { every: {hour: parseInt(tHour.toString()), minute: parseInt(tMinute.toString())}, }, -- sends continuous notifications during that time
      //trigger: {in: 5, unit:ELocalNotificationTriggerUnit.SECOND, every: ELocalNotificationTriggerUnit.MINUTE}  --triggers every 5 seconds?
      //in: 5, unit:ELocalNotificationTriggerUnit.SECOND, 
      //trigger: { every: { weekday: 4, hour: parseInt(tHour.toString()), minute: parseInt(tMinute.toString()) } } //triggers every thursday at given time continuously (bad)
      trigger: {at: new Date(date)}, //doesnt work
      every: 'day'
      //every: {hour: parseInt(tHour.toString()), minute: parseInt(tMinute.toString()) }
    });
  }

  public getTriggerUnit(unit: string): ELocalNotificationTriggerUnit{
    switch(unit){
      case "second" :
        return ELocalNotificationTriggerUnit.SECOND;
      case "minute" :
        return ELocalNotificationTriggerUnit.MINUTE;
      case "hour" :
        return ELocalNotificationTriggerUnit.HOUR;
      case "day" :
        return ELocalNotificationTriggerUnit.DAY;
      case "week" :
        return ELocalNotificationTriggerUnit.WEEK;
      case "month" :
        return ELocalNotificationTriggerUnit.MONTH;
      case "quarter" :
      return ELocalNotificationTriggerUnit.QUARTER;
      case "year" :
        return ELocalNotificationTriggerUnit.YEAR;
      case "weekday" :
        return ELocalNotificationTriggerUnit.WEEKDAY;
      case "weekdayOrdinal" :
        return ELocalNotificationTriggerUnit.WEEKDAY_ORDINAL;
      case "weekOfMonth" :
        return ELocalNotificationTriggerUnit.WEEK_OF_MONTH;
      default:
        return null;
    }
  }

  //CONTINUE WORKING ON TIMER
  public showAlert(header, sub, msg){
    this.alerCtrl.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['Ok']
    }).then(alert => alert.present())
  }


}

