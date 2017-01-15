import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

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
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
