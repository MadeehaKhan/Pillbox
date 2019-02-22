import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  today = Date.now();


  buttonClick(){
    alert("Details!");
  }

  public form = [
    { val: 'Pepperoni', time: '9:30', isChecked: true },
    { val: 'Sausage', time: '11:00' , isChecked: false },
    { val: 'Mushroom', time: '6:00', isChecked: false }
  ];



}
