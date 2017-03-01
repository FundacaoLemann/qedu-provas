import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, Type } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Assessment } from '../../shared/model/assessment';
import { InstructionsModalComponent } from './modal/instructions-modal.component';
import { ApplymentService } from '../shared/applyment.service';
import { ConnectionService } from '../../core/shared/connection.service';
import { NoConnectionModalComponent } from '../shared/no-connection-modal/no-connection-modal.component';
import { HasModal } from '../../core/shared/has-modal/has-modal';
import { AssessmentService } from '../../core/shared/assessment.service';

@Component({
  selector: 'qp-instructions-page',
  templateUrl: 'instructions-page.component.html',
  styleUrls: ['instructions-page.component.sass'],
  entryComponents: [
    NoConnectionModalComponent,
    InstructionsModalComponent
  ]
})
export class InstructionsPageComponent extends HasModal implements OnInit {
  assessment: Assessment;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _applymentService: ApplymentService,
              private _assessmentService: AssessmentService,
              private _connection: ConnectionService,
              protected _viewContainerRef: ViewContainerRef,
              protected _componentFactoryResolver: ComponentFactoryResolver) {
    super(_viewContainerRef, _componentFactoryResolver);
  }

  ngOnInit() {
    this.assessment = this._applymentService.getAssessment();
  }

  /**
   * Start the assessment
   */
  initAssessment() {
    const token = this._route.snapshot.params['uuid'];

    this._applymentService.initAnswers(this.assessment.itemsCount);
    this._assessmentService.fetchAssessmentQuestions(token)
      .subscribe(
        questions => {
          this._applymentService.setQuestions(questions);
          this._router.navigate(['prova', token, 'questao', '1']);
        },
        error => {
          this.openModalConnectionError();
        }
      );
  }

  /**
   * Open the modal to confirm start
   */
  openModalProceed() {
    this.openModal(InstructionsModalComponent, {
      onConfirm: () => {
        this._connection
          .getStatusOnce()
          .subscribe((status) => {
            if ( status ) {
              this.initAssessment();
            } else {
              this.openModalConnectionError();
            }
          });
      },
      onClose: () => {
        this.closeModal();
      }
    });
  }

  /**
   * Show no-connection modal
   */
  openModalConnectionError() {
    this.closeModal();
    setTimeout(() => {
      this.openModal(NoConnectionModalComponent, {
        onClose: () => {
          this.closeModal();
        }
      });
    }, 300);
  }
}
