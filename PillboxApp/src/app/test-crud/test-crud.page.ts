import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Platform, ToastController, IonList } from '@ionic/angular';
import { MedSchedule } from '../models/MedSchedule';

@Component({
  selector: 'app-test-crud',
  templateUrl: './test-crud.page.html',
  styleUrls: ['./test-crud.page.scss'],
})
export class TestCRUDPage implements OnInit {
  items: MedSchedule[] = [];
 
  newItem: MedSchedule = <MedSchedule>{};
  @ViewChild('my-list')mylist: IonList;

  constructor(private router: Router,private storageService: StorageService, private plt: Platform, private toastController: ToastController ) {
    this.plt.ready().then(() => {
      this.loadItems();
    });
   }

  ngOnInit() {
  }

  back(){
    this.router.navigateByUrl('/tabs/tab3');
  }

  // CREATE
  addItem() {
    //this.newItem.modified = Date.now();
    //this.newItem.id = Date.now();
    this.storageService.addItemWithNotification(this.newItem).then(item => {
    //this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <MedSchedule>{};
      this.showToast('Item added!')
      this.loadItems(); // Or add it to the array directly
    });
  }
  
  // READ
  loadItems() {
    this.storageService.getItems().then(items => {
      this.items = items;
    });
  }
  
  // UPDATE
  updateItem(item: MedSchedule) {
    item.hour = 0;
    item.minute = Date.now();
  
    this.storageService.updateItem(item).then(item => {
      this.showToast('Item updated!');
      this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
      this.loadItems(); // Or update it inside the array directly
    });
  }
  
  // DELETE
  deleteItem(item: MedSchedule) {
    this.storageService.deleteItem(item.id).then(item => {
      this.showToast('Item removed!');
      this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
      this.loadItems(); // Or splice it from the array directly
    });
  }

  deleteAll(){
    this.items.forEach(item => {
      this.deleteItem(item);
    });
  }
  
  // Helper
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
