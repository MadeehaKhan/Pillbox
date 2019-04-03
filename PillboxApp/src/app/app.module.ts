import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { HttpClientModule } from '@angular/common/http';
import { MedViewPipe } from './med-view.pipe';

import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx'
import { SQLite } from '@ionic-native/sqlite/ngx'
import { SQLiteObject } from '@ionic-native/sqlite';
import { HttpModule } from '@angular/http';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Data base provider?

@NgModule({
  declarations: [AppComponent, MedViewPipe],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(), HttpClientModule, HttpModule,FormsModule,
    ReactiveFormsModule ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LocalNotifications,
    SQLite,
    SQLitePorter,
    ImagePicker,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
