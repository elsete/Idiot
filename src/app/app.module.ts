import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DeckService } from 'src/app/services/DeckService';
import { CardComponent } from './components/card/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DeckService],
  bootstrap: [AppComponent]
})
export class AppModule { }
