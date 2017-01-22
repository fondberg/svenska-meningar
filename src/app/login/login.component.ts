import { Component, OnInit } from '@angular/core';
import {DataBaseService} from '../database.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public dataBaseService : DataBaseService) { }

  ngOnInit() {
    console.log("Login component");
  }

  loginGoogle() {
    this.dataBaseService.login();
  }

}
