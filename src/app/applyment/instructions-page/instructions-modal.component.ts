import { Component, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-instructions-modal',
  templateUrl: 'instructions-modal.component.html',
  styleUrls: ['instructions-modal.component.sass']
})
export class InstructionsModalComponent {
  onClose: EventEmitter<any> = new EventEmitter();

  constructor (private router: Router,
               private route: ActivatedRoute) {
  }

  close () {
    this.onClose.emit();
  }

  confirmStart () {
    let uuid = this.route.snapshot.params['uuid'];
    this.router.navigate(['prova', uuid, 'questao', '1']);
  }

}
