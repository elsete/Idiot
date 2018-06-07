import { Component, OnInit } from '@angular/core';
import { DeckService, IDeckType } from '../app//model/DeckService';
import { Card } from './model/Card';
import { Player } from './model/Player';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
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
}


