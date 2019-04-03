import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-medication-enter',
  templateUrl: './medication-enter.page.html',
  styleUrls: ['./medication-enter.page.scss'],
})
export class MedicationEnterPage implements OnInit {

  imageResponse: any = [];

  constructor(private router: Router, private imagePicker: ImagePicker) { }

  ngOnInit() {
  }

  public addMedication() {
    this.router.navigateByUrl('/medication');
  }

  public getImage(){
    let options = {
      maximumImagesCount: 1,
      quality: 50,
      outputType: 1,
      // width: 300,
    }

    this.imageResponse = [];
    this.imagePicker.getPictures(options)
    .then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
      }
    }, (error) => {
      this.imageResponse = [];
      alert(error);
    })
  }

}
