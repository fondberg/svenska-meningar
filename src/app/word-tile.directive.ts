import {
  Directive,
  ElementRef,
  Input,
  Renderer,
  HostListener,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[wordTile]'
})
export class WordTileDirective implements OnChanges {
  @Input('wordTile') index: number;
  @Input('wordTileMening') mening: string;
  @Input('wordTileWord') word: string;

  constructor(private el: ElementRef, private render: Renderer) {
  }

  ngOnChanges(changes: SimpleChanges): any {
    //console.log("wordTile OnChanges:", this.index);
    this.checkCorrectPosition();
  }

  checkCorrectPosition() {
    let correctWordArray: Array<string> = this.mening.split(' ');
    let goodIndex = correctWordArray.indexOf(this.word);
    if(goodIndex == this.index) {
        this.render.setElementStyle(this.el.nativeElement, 'border-bottom', '2px solid green');
    } else {
        this.render.setElementStyle(this.el.nativeElement, 'border-bottom', '2px solid red');
    }
  }


}
