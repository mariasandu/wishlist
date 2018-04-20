import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { WishesComponent } from './wishes/wishes.component';
import { WishComponent } from './wishes/wish/wish.component';
import { WishListComponent } from './wishes/wish-list/wish-list.component';
import { PasscodeDialogComponent } from './passcode-dialog/passcode-dialog.component';
import { MainListComponent } from './main-list/main-list.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WishesComponent,
    WishComponent,
    WishListComponent,
    PasscodeDialogComponent,
    MainListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
