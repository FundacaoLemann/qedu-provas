import {Component, EventEmitter} from '@angular/core';
import {environment} from '../../../../environments/environment';

const {DOWNLOAD_CODE} = environment;

@Component({
  selector: 'qp-no-connection-modal',
  templateUrl: 'no-connection-modal.component.html',
  styleUrls: ['no-connection-modal.component.sass']
})
export class NoConnectionModalComponent {
  onClose: EventEmitter<any> = new EventEmitter();
  onDownload: EventEmitter<any> = new EventEmitter();
  downloadCode = '';
  error = false;

  constructor() {
  }

  close() {
    this.onClose.emit();
  }

  download() {
    if (this.downloadCode === DOWNLOAD_CODE) {
      this.onDownload.emit(this.downloadCode);
      this.error = false;
    } else {
      this.error = true;
    }
    this.downloadCode = '';
  }
}
