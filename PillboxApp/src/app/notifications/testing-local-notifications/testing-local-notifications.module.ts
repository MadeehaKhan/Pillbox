import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TestingLocalNotificationsPage } from './testing-local-notifications.page';

const routes: Routes = [
  {
    path: '',
    component: TestingLocalNotificationsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TestingLocalNotificationsPage]
})
export class TestingLocalNotificationsPageModule {}
