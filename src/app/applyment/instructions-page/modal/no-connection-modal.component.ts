import {Component, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'qp-no-connection-modal',
  templateUrl: 'no-connection-modal.component.html',
  styles: []
})
export class NoConnectionModalComponent implements OnInit {
  onConfirm: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  confirm() {
    this.onConfirm.emit();
  }
}
