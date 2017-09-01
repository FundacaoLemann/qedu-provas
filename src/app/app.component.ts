import {Component, HostListener, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {StoreService} from './core/shared/store.service';
import { Angulartics2GoogleAnalytics } from 'angulartics2';

@Component({
  selector: 'qp-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.sass']
})

export class AppComponent implements OnInit {
  current_date: Date;

  @HostListener('window:beforeunload', ['$event']) beforeUnload(e) {
    return false;
  }

  constructor (public store: StoreService, private _router: Router, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {
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
