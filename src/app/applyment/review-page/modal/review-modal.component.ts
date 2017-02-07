import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'qp-review-modal',
  templateUrl: 'review-modal.component.html',
  styleUrls: ['review-modal.component.sass']
})
export class ReviewModalComponent implements OnInit {
  onClose: EventEmitter<null> = new EventEmitter<null>();

  constructor (private router: Router,
               private route: ActivatedRoute) {
  }

  ngOnInit () {
  }

  finish () {
    const uuid = this.route.snapshot.params['uuid'];
    this.router.navigate(['prova', uuid , 'parabens']);
  }

  close () {
    this.onClose.emit();
  }

}
