import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/model/Card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {

  @Input() public card: Card;

  constructor() { }

  ngOnInit() {


  }

}
