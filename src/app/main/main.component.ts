import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../database.service';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  meningar: FirebaseListObservable<any>;
  constructor(private dataBaseService : DataBaseService) { 
  }
  
  ngOnInit() {
    console.log("MainComponent");
  }

}
