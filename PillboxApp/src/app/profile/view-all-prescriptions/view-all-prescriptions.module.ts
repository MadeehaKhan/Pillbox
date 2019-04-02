import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewAllPrescriptionsPage } from './view-all-prescriptions.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAllPrescriptionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewAllPrescriptionsPage]
})
export class ViewAllPrescriptionsPageModule {}
