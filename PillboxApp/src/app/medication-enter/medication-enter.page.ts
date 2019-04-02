import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medication-enter',
  templateUrl: './medication-enter.page.html',
  styleUrls: ['./medication-enter.page.scss'],
})
export class MedicationEnterPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public addMedication() {
    this.router.navigateByUrl('/medication-enter');
  }

}
