import {
  Component,
  Input,
  Output,
  OnChanges,
  EventEmitter
} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'app-menings-pussel',
  templateUrl: './menings-pussel.component.html',
  styleUrls: ['./menings-pussel.component.css']
})
export class MeningsPusselComponent implements OnChanges {
  @Input() mening: String = '';
  meningWords: Array<string> = [];
  listOne:Array<string> = ['Coffee','Orange Juice','Red Wine','Unhealty drink!','Water'];

  constructor() { }

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

  ngOnChanges(changes: any) {
    console.log(changes.mening.currentValue);
    this.meningWords = this.shuffle(changes.mening.currentValue.split(' '));

  }
}
