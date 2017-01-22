import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';
import 'hammerjs';
import 'sortablejs';
import { SortablejsModule } from 'angular-sortablejs';

import { AppComponent } from './app.component';
import { routes } from './routes'

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { MeningsPusselComponent } from './menings-pussel/menings-pussel.component';
import { MainComponent } from './main/main.component';

import { DataBaseService } from './database.service';
import { LoginComponent } from './login/login.component';
import { WordTileDirective } from './word-tile.directive';

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

// Firebase config
/*
  apiKey: "AIzaSyDlUpUu1qDdaGkTGvZSO-75BdG20KsqfBU",
  authDomain: "angular2-example-112d4.firebaseapp.com",
  databaseURL: "https://angular2-example-112d4.firebaseio.com",
  storageBucket: "angular2-example-112d4.appspot.com",
  messagingSenderId: "931206081618"
*/
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
    MeningsPusselComponent,
    MainComponent,
    LoginComponent,
    WordTileDirective
  ],
  imports: [
    BrowserModule,
    SortablejsModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [
    DataBaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


//,{provide: APP_BASE_HREF, useValue: '/'}