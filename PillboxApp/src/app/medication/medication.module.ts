import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MedicationPage } from './medication.page';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
	path: '',
	component: MedicationPage
  },
  {
	path: 'id',
	component: ProfileComponent
  }
];

@NgModule({
  imports: [
	CommonModule,
	FormsModule,
	IonicModule,
	RouterModule.forChild(routes)
  ],
  declarations: [MedicationPage, ProfileComponent]
})
export class MedicationPageModule {}
