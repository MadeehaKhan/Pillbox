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

  public drugsList = [
    { val: 'Pepperoni', time: '9:30', isChecked: false },
    { val: 'Sausage', time: '11:00' , isChecked: false },
    { val: 'Mushroom', time: '6:00', isChecked: false }
  ];

  public takenDrugsList = [
    { val: 'Dog', time: '9:30', isChecked: true },
  ];

  public updateDrugLists(){
      this.drugsList.forEach(drug => {
        if(drug.isChecked === true){
          var index = this.drugsList.findIndex( i=> i.val == drug.val && i.time == drug.time);
          this.drugsList.splice(index, 1);
          this.takenDrugsList.push(drug);
        }
      });

      this.takenDrugsList.forEach(drug => {
        if(drug.isChecked === false){
          var index = this.takenDrugsList.findIndex( i=> i.val == drug.val && i.time == drug.time);
          this.takenDrugsList.splice(index, 1);
          this.drugsList.push(drug);
        }
      });
  }

}
