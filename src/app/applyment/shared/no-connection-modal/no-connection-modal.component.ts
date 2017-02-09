import {Component, EventEmitter} from '@angular/core';

@Component({
  selector: 'qp-no-connection-modal',
  templateUrl: 'no-connection-modal.component.html',
  styles: []
})
export class NoConnectionModalComponent {
  onClose: EventEmitter<any> = new EventEmitter();

  close() {
    this.onClose.emit();
  }
}
