import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'qp-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  public question = {
    id: '1',
    text: 'What is the best <b>starting</b> Pokémon?',
    answers: [
      { id: 1, text: 'Squirtle' },
      { id: 2, text: 'Bulbasaur' },
      { id: 3, text: 'Charmander' },
      { id: 4, text: 'Pikachu' }
    ],
    media: []
  };

  constructor() { }

  ngOnInit() {
  }

}
