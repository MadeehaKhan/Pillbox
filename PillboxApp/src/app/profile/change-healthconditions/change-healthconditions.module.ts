import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChangeHealthconditionsPage } from './change-healthconditions.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeHealthconditionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChangeHealthconditionsPage]
})
export class ChangeHealthconditionsPageModule {}
