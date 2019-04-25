import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Medication } from '../models/Medication';
import { Person } from '../models/Person';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Prescription } from '../models/Prescription';

@Component({
  selector: 'app-medication-enter',
  templateUrl: './medication-enter.page.html',
  styleUrls: ['./medication-enter.page.scss'], 
})
export class MedicationEnterPage implements OnInit {

  images: any = [];
  imagePicked: boolean = false;
  imageFileUri: any;
  imageFilePath: any;
  fileName: any;
  fromImageGallery: boolean = false;

  testMsg: any;

  constructor(private router: Router, 
    private imagePicker: ImagePicker, 
    private camera: Camera, 
    public http: HttpClient,
    private loadingController: LoadingController,
    private storage: Storage,
    private fileTransfer: FileTransfer,
    private file: File,
    private filePath: FilePath,
    ) { }

  ngOnInit() {
  }

  public addMedication() {
    this.router.navigateByUrl('/medication');
  }

  public takeImage(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    }

    this.camera.getPicture(options).then((imagePath) => {
      // imagePath is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imagePath;

      this.fileName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      this.imageFilePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.imageFileUri = imagePath;
      this.imagePicked = true;
      // this.images.push({name: this.fileName, path: resPath , filePath: this.filePath});  
      this.file.readAsDataURL(this.imageFilePath, this.fileName).then(res =>
        this.images.push(res));    
              
        // alert(imagePath);
        // alert(this.imageFileUri);
     }, (err) => {
      // Handle error
      // alert("Error taking image")
     });
  }

  //DOES NOT WORK RIGHT NOW
  public getImage(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: 0,  //gallery
    }

    this.camera.getPicture(options).then((imagePath) => {      
      let base64Image = 'data:image/jpeg;base64,' + imagePath;
    
      this.filePath.resolveNativePath(imagePath).then(filePath => {
        this.fileName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
        this.imageFilePath = imagePath.substr(0, filePath.lastIndexOf('/') + 1);
        this.imageFileUri = filePath;
        this.imagePicked = true;
        this.fromImageGallery = true;
        // this.images.push({name: this.fileName, path: resPath , filePath: this.filePath});  
        // this.file.readAsDataURL(this.imageFilePath, this.fileName).then(res =>
        //   this.images.push(res));            
        this.file.readAsDataURL(this.imageFilePath, this.fileName).then(res =>
          this.images.push(res)); 
        
        this.file.copyFile(this.imageFilePath, this.fileName, this.file.dataDirectory, this.fileName).then((success) => {
          // alert("stored file localy");
          this.imageFileUri = this.file.dataDirectory + this.fileName;
          // alert('fileURI: '+ this.imageFileUri);
        });
          // alert(imagePath);
      }).catch(error => {
        // alert('getting image error');
      });
        

    }, (err) => {
      // Handle error
      // alert("Error taking image");
    });
  }

  public async continue(){
    this.postOCR()
  }

  public async postOCR(){
    //make http request here
    // alert('postTest');
    //alert(this.fileName);
    //alert(this.filePath);
    //alert(this.imageFileUri);
    var url = "https://pillboxwebapi20190129085319.azurewebsites.net/api/medications/medicationocr";

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    const formData = new FormData();
    formData.append('file', this.imageFileUri);

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: this.fileName,
      mimeType: "image/jpeg", 
      headers: {}
   }
 
   const loading = await this.loadingController.create({
    message: "Reading your image...",
    animated: true,
    keyboardClose: true,    
    });

    await loading.present();
   fileTransfer.upload(this.imageFileUri, url, options)
    .then((data) => {
      // success
      let response = JSON.parse(data.response);
      // this.testMsg = JSON.stringify(response.value);
      // alert('post success!!!')
      // alert('fileURI: \n' + this.imageFileUri);
      // alert('response: \n' + JSON.stringify(response)); 
      // alert('Value: \n' + JSON.stringify(response.value)); 
 
      let medication = new Medication();
      medication = response.value.Medication;
      let prescription = new Prescription();
      prescription = response.value.Prescription;
      // alert('Medication: \n' + JSON.stringify(medication)); 
      // alert('Prescription: \n' + JSON.stringify(prescription));  
      
      //set local storage and go to next page
      this.storage.set("FilledMedication", medication).then(() => {
        this.storage.set("FilledPrescription", prescription).then(() => {
          loading.dismiss();
          if (this.fromImageGallery){
            //delete image?
          }
          this.cancel();
          this.router.navigateByUrl('/medication');
        })
      });          
    }, (err) => {
      // error
      alert('post error!!!')
      alert(err);    
      loading.dismiss();
    });
  }

  public cancel(){
    this.imagePicked = false;
    this.images = [];
    this.imageFileUri = [];
    this.fromImageGallery = false;
  }
}
