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
        this.scheduleNotification(item.id, "Med Name", "med info", item.every, item.hour, item.minute);
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
      trigger: { in: parseInt(tMinute.toString()) , unit: ELocalNotificationTriggerUnit.SECOND } // change to reoccuring
      //trigger: { every: 'day', unit: ELocalNotificationTriggerUnit.SECOND, count = 2} 
    });
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

