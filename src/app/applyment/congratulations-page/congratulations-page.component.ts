import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-congratulations-page',
  templateUrl: './congratulations-page.component.html',
  styleUrls: ['./congratulations-page.component.sass']
})
export class CongratulationsPageComponent implements OnInit {
  home: string = 'home';

  constructor() {
  }

  ngOnInit() {
  }
}
