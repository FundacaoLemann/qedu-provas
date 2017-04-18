import {Component, EventEmitter} from '@angular/core';
import {AssessmentService} from '../../../core/shared/assessment.service';

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

  constructor(private _assessmentService: AssessmentService) {
  }

  close() {
    this.onClose.emit();
  }

  download() {
    if (this.downloadCode === this._assessmentService.downloadCode) {
      this.onDownload.emit(this.downloadCode);
      this.error = false;
    } else {
      this.error = true;
    }
    this.downloadCode = '';
  }
}
