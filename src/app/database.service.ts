import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
  AngularFire,
  FirebaseListObservable,
  FirebaseObjectObservable,
  FirebaseAuthState,
  AuthProviders,
  AuthMethods
} from 'angularfire2';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/fromPromise';

import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class DataBaseService implements CanActivate {
  meningar: FirebaseListObservable<any>;
  usersConf: FirebaseObjectObservable<any>;

  user: any;
  loggedIn = false;
  displayName = '';

  constructor(public af: AngularFire, private router: Router) {
    this.meningar = af.database.list('/meningar');
    this.af.auth.subscribe(user => {
      if (user) {
        // user logged in
        console.log("User subscribe:", user);
        this.displayName = user.auth.displayName;
        this.user = user;
        this.loggedIn = true;
        this.usersConf = this.af.database.object('/config/' + user.auth.uid);
        //this.router.navigate(['']);
      }
      else {
        // user not logged in
        console.log("Not logged in");
        this.user = {};
        this.loggedIn = true;
        this.displayName = '';
        //this.router.navigate(['login']);
      }
    });
  }

  getMeningar() {
    return this.meningar;
  }

  // loginGoogle() {
  //   this.af.auth.login({
  //     provider: AuthProviders.Google,
  //     method: AuthMethods.Redirect
  //   }).then(
  //     (success) => {
  //       console.log(success);
  //       this.router.navigate(['/dashboard']);
  //     }).catch(
  //     (err) => {
  //       console.log(err);
  //       this.router.navigate(['/dashboard']);
  //     })
  // }

  // loginWithObservable() {
  //   Observable.fromPromise(
  //     <Promise<any>>this.af.auth.login())
  //     .do(
  //       function (x) { console.log('Do Next:', x); }, 
  //       function (err) { console.log('Do Error:', err); }, 
  //       function () { console.log('Do Completed'); }
  //       ).subscribe()
  // }

  login() {
    console.log("Logging in");
    this.af.auth.login().then(auth => {
      if (auth !== null) {
        console.log("Login res:", auth)
        this.router.navigate(['main']);
      } else {
        console.log("Login failed...");
      }
    });
  }

  logout() {
    console.log("Logging out");
    this.af.auth.logout().then(
      (success) => {
        console.log("Logout res:", success);
        this.router.navigate(['/login']);
      }).catch(
      (err) => {
        console.log("Logout err:", err);
        this.router.navigate(['/login']);
      });
  }

  isAuthenticated() {
    return this.loggedIn;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.af.auth.map((auth) => {
      console.log(state);
      if (auth) {
        console.log('canActivate authenticated');
        return true;
      }
      console.log('canActivate not authenticated');
      this.router.navigateByUrl('/login');
      return false;
    }).first(); // this might not be necessary - ensure `first` is imported if you use it
  }


}
