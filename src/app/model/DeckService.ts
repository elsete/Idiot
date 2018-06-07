import { Injectable } from '@angular/core';
import { Card } from './Card';

export interface IDeckType {
  cards: Array<Card>,
  shuffle,
  dealOneCard,
  dealCards,
  cut,
  cutInPlace,
  reset
}


@Injectable()
export class DeckService {

  constructor() {}

  public deck: IDeckType = {
    cards: new Array<Card>(),
    shuffle: null, //: this.shuffle,
    dealOneCard: null, // this.dealOneCard,
    dealCards:  null, //this.dealCards,
    cut: this.cut,
    cutInPlace: this.cutInPlace,
    reset: null
  };

  // array to keep track of card suits
  public suits = [{
    name: 'Trébol',
    color: 'black',
    glyph: '&#x2663;'
  }, {
    name: 'Picas',
    color: 'black',
    glyph: '&#x2660;'
  }, {
    name: 'Corazones',
    color: 'red',
    glyph: '&#x2665;'
  }, {
    name: 'Diamantes',
    color: 'red',
    glyph: '&#x2666;'
  }];

//constructor ($sce)
public deckFactory (): IDeckType {

    this.deck.cards = new Array<Card>();

    this.deck.shuffle = () => {
        // repeat 20 times for a new deck
        for (var i = 0; i < 20; i++) {
          // cut the cards in half
          var halves = this.cut(this.deck.cards);
          // we will stack both halves into this pile
          var pile = [];
          while (halves.top.length > 0 || halves.bottom.length > 0) {
            // a random number of cards to take from the top
            var take = this.randomInt(1, 5);
            // take that many cards from the top and put in the pile
            pile = pile.concat(halves.top.splice(0, take));
            // a random number of cards to take from the bottom
            take = this.randomInt(1, 5);
            // take that many cards from the bottom and put in the pile
            pile = pile.concat(halves.bottom.splice(0, take));
          }
          // put the bottom onto the top so cards are mixed up more
          this.deck.cards = this.cutInPlace(pile);
        }
     };

    this.deck.dealCards = (count: number, flip: boolean = false) => {
      let cards: Card[] = new Array<Card>();
      for (let index = 0; index < count; index++) {
        cards.push(this.deck.dealOneCard(flip));
      }
      return cards;
    };

     this.deck.dealOneCard = (flip: boolean = false) => {
      //return this.deck.cards.shift();
      let card: Card = this.deck.cards.pop();

      if (flip) {
        card.flip();
      }

      return card;
    };

    this.reset();

    return this.deck;
    /*
    // returning the public interface for deckFactory
    return {
      createNewDeck: Deck
    };
    */
  }

  // helper function to generate a randmon int between a min and max
  public randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public reset() {
    this.deck.cards = new Array<Card>();

    this.suits.forEach(function(suit) {

      this.deck.cards.push(new Card(suit, 'A', 'As', true));
      for (var i = 2; i <= 10; i++) {
        this.deck.cards.push(new Card(suit, i.toString(), '', true));
      }
      this.deck.cards.push(new Card(suit, 'J', 'Jota', true));
      this.deck.cards.push(new Card(suit, 'Q', 'Cu', true));
      this.deck.cards.push(new Card(suit, 'K', 'Rey', true));
    }, this);
  }

  // function to shuffle the cards using a real-world algorithm
  public shuffle2() {
    // repeat 20 times for a new deck
    for (var i = 0; i < 20; i++) {
      // cut the cards in half
      var halves = this.cut(this.deck.cards);
      // we will stack both halves into this pile
      var pile = [];
      while (halves.top.length > 0 || halves.bottom.length > 0) {
        // a random number of cards to take from the top
        var take = this.randomInt(1, 5);
        // take that many cards from the top and put in the pile
        pile = pile.concat(halves.top.splice(0, take));
        // a random number of cards to take from the bottom
        take = this.randomInt(1, 5);
        // take that many cards from the bottom and put in the pile
        pile = pile.concat(halves.bottom.splice(0, take));
      }
      // put the bottom onto the top so cards are mixed up more
      this.deck.cards = this.cutInPlace(pile);
    }
  }

  // function that cuts the cards and puts the bottom on the top
  public cutInPlace(pile) {
    var halves = this.cut(pile);
    return halves.bottom.concat(halves.top);
  }

   // function that cuts the cards and returns a top and bottom pile
   public cut(cards) {
    if (!cards || !cards.length) {
      return {
        top: [],
        bottom: []
      };
    } else if (cards.length === 1) {
      return {
        top: [cards[0]],
        bottom: []
      };
    } else {
      // find the middle, with a random variance of +/- 6
      var middle = Math.floor(cards.length / 2);
      var variance = this.randomInt(0, 12) - 6;
      middle += variance;
      middle = Math.max(middle, 1);
      return {
        top: cards.slice(0, middle),
        bottom: cards.slice(middle)
      };
    }
  }
}
