import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

import {DndModule} from 'ng2-dnd';

import { AppComponent } from './app.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { MeningsPusselComponent } from './menings-pussel/menings-pussel.component';

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

// Firebase config
export const firebaseConfig = {
  apiKey: "AIzaSyAg_37tOY71o9ZaB7lVoayjFCzDF5aVhaY",
  authDomain: "angular2-example-b9df5.firebaseapp.com",
  databaseURL: "https://angular2-example-b9df5.firebaseio.com",
  storageBucket: "angular2-example-b9df5.appspot.com",
  messagingSenderId: "751152254884"
};


@NgModule({
  declarations: [
    AppComponent,
    MeningsPusselComponent
  ],
  imports: [
    BrowserModule,
    DndModule.forRoot(),
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
