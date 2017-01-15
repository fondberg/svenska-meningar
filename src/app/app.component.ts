import { Component } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  user = {};
  meningar: FirebaseListObservable<any>;
  displayName = '';
  loggedIn = false;

  constructor(public af: AngularFire) {
    this.meningar = af.database.list('/meningar');
    this.af.auth.subscribe(user => {
      if(user) {
        this.loggedIn = true;
        // user logged in
        console.log(user);
        this.displayName = user.auth.displayName;
        this.user = user;
      }
      else {
        // user not logged in
        this.loggedIn = false;
        this.user = {};
      }
    });
  }

  login() {
    this.af.auth.login();
  }

  logout() {
     this.af.auth.logout();
  }
}
