import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {StoreService} from './core/shared/store.service';

@Component({
  selector: 'qp-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.sass']
})

export class AppComponent implements OnInit {
  current_date: Date;

  constructor (public store: StoreService, private _router: Router) {
  }

  ngOnInit () {
    this.current_date = new Date();
    this.store.asObservable().subscribe((stored) => {
      if (stored == null) {
        this._router.navigate(['']);
      }
    });

  }
}
