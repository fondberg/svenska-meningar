import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SortablejsOptions } from 'angular-sortablejs';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { DataBaseService } from '../database.service';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-menings-pussel',
  templateUrl: './menings-pussel.component.html',
  styleUrls: ['./menings-pussel.component.css']
})
export class MeningsPusselComponent implements OnInit, OnDestroy {
  //All sentences in the current difficulty level
  meningarArray: Array<string> = [];
  //currently choosen mening TODO: convert to index?
  mening: string = "";
  //Holds the shuffles
  meningWords: Array<string> = [];
  error = '';

  difficuly: string;
  userConf: any;
  private sub: any
  private userConfSub: any
  private meningarSub: any

  constructor(
    private dataBaseService: DataBaseService,
    private route: ActivatedRoute
  ) {

    this.userConfSub = this.dataBaseService.usersConf.subscribe((userConf) => {
      this.userConf = userConf;
      if (!userConf.level) {
        this.userConf.level = 0;
        this.dataBaseService.usersConf.update({ level: 0 });
      }
      //console.log("UserConf retrieved:", this.userConf);
      this.meningarSub = this.dataBaseService.getMeningar().mergeMap((list) => {
        //check level or set it to first item
        if (this.userConf.level > list.length) {
          this.userConf.level = 0;
        }
        //extract the sentences into an array
        this.meningarArray = list.map(item => item.$value);
        //console.log("this.meningarArray:", this.meningarArray);
        this.userConfSub.unsubscribe(); // we don't want updates
        this.meningarSub.unsubscribe(); // we don't want updates
        this.startLevel();
        return list;
      }).subscribe(list => {
        //console.log("In complex:", list);
      });
    });
  }

  startLevel() {
    //store the meening to play
    this.mening = this.meningarArray[this.userConf.level];
    //console.log("entry to return:", this.mening);
    //shuffle it for playing
    this.meningWords = this.shuffle(this.mening.split(' '));
  }

  checkWordForWord() {
    let correctWordArray: Array<string> = this.mening.split(' ');
    let wordArray: Array<string> = this.meningWords;

    //check word for word how much is correct
    const len: number = correctWordArray.length;
    let answers: Array<boolean> = [];
    for (let i = 0; i < len; i++) {
      let check: boolean = false;
      if (correctWordArray[i] === wordArray[i]) {
        console.log("index:" + i + " is correct for word:" + wordArray[i]);
        check = true;
        answers.push(check);
      }
    }
  }

  checkCorrect() {
    console.log("Checking...", this.meningWords, this.mening);
    if (this.meningWords.join(' ') === this.mening) {
      this.error = 'Rätt!!!';
      this.userConf.level++;
      if (this.userConf.level >= this.meningarArray.length) {
        this.error = 'Du har klarat nivån!!!';
        this.userConf.level = 0;
      }

      this.dataBaseService.usersConf.update({ level: this.userConf.level });
      setTimeout(() => {
        this.error = '';
        this.startLevel();
      }, 2000);
    } else {
      this.checkWordForWord();
      this.error = 'Fel';
      setTimeout(() => {
        this.error = '';
      }, 1000);
    }
  }

  meningChanged(item) {
    console.log("meningChanged:", item);
  }

  shuffle(arra1) {
    let ctr = arra1.length, temp, index;
    // While there are elements in the array
    while (ctr > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * ctr);
      // Decrease ctr by 1
      ctr--;
      // And swap the last element with it
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    return arra1;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.difficuly = params['difficuly'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
