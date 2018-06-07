import { Card } from './Card';


export class Player {

  public hand: Card[];
  public table: Card[];

  constructor() {
    this.hand = new Array<Card>();
    this.table = new Array<Card>();
   }


}
