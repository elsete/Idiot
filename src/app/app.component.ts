import { Component, OnInit } from '@angular/core';
import { DeckService, IDeckType } from '../app/services/DeckService';
import { Card } from './model/Card';
import { Player } from './model/Player';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('flyInOut', [
      state('enter', style({transform: 'translateX(0)'})),
      transition('void => in', [
        animate(3000, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0}),
        ]))
      ]),
      transition('void => in2', [
        animate(1000, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0}),
        ]))
      ]),
      transition('void => *', [
        animate(300, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0}),
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
          style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0}),
        ]))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  title = 'app';

  public deck: IDeckType;
  public player: Player;

  constructor(public deckService: DeckService) {

  }

  ngOnInit(): void {

    this.player = new Player();
    this.deck = this.deckService.deckFactory();

    //Mezclar
    this.shuffle();

    //Dar todas las cartas
    //while (this.dealOneCard()) {}
  }

  public shuffle() {
    this.deck.shuffle();
  }

  public dealOneCard() {
    let nextCard = this.deck.dealOneCard();
    if (nextCard) {
      // add the card to the dealt array to bind to the UI
      this.player.hand.push(nextCard);
    }

    return nextCard;
  }

  public dealCards(count: number) {
    let nextCards: Card[] = this.deck.dealCards(count, true);
    if (nextCards) {
      // add the card to the dealt array to bind to the UI
      this.player.hand = this.player.hand.concat(nextCards);
    }

    return nextCards;
  }

  public animationStarted(e) {
    console.log(e);
  }
}


