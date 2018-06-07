
export class Card {

  public Id: String;
  public suit: any;
  public letter: String;
  public name: String;
  public displayName: String;
  public flipped: boolean;

  constructor(suit: any, letter: String = '', name: String = '', flipped: boolean) {
    this.Id = `${ suit.name}-${ letter }`;
    this.suit = suit;
    this.letter = letter,
    this.name = name || letter,
    this.displayName = `${ this.name } de ${ suit.name }`;
    this.flipped = flipped;
  }

  public flip() {
    this.flipped = !this.flipped;
  }
}
