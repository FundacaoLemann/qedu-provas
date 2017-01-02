import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-review-modal',
  templateUrl: 'review-modal.component.html',
  styleUrls: ['review-modal.component.sass']
})
export class ReviewModalComponent implements OnInit {
  onClose: EventEmitter<null> = new EventEmitter<null>();

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.onClose.emit();
  }

}
