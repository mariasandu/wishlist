import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBRUuuOYHR1U3UWztZvlRSe2vEnLL_GBX4",
  authDomain: "my-wishlist-datastore.firebaseapp.com",
  databaseURL: "https://my-wishlist-datastore.firebaseio.com",
  projectId: "my-wishlist-datastore",
  storageBucket: "my-wishlist-datastore.appspot.com",
  messagingSenderId: "799712116794"
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
