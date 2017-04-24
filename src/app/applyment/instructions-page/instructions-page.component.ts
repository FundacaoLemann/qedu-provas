import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from '../../core/shared/assessment.service';
import { ConnectionService } from '../../core/shared/connection.service';
import { HasModal } from '../../core/shared/has-modal/has-modal';
import { Assessment } from '../../shared/model/assessment';
import { ApplymentService } from '../shared/applyment.service';
import { NoConnectionModalComponent } from '../shared/no-connection-modal/no-connection-modal.component';
import { InstructionsModalComponent } from './modal/instructions-modal.component';

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
    const assessmentToken = this._route.snapshot.params['token'];
    const studentToken = this._applymentService.getStudent().token;

    this._applymentService.initAnswers(this.assessment.numberOfItems);

    this._assessmentService
      .fetchAssessmentQuestions(assessmentToken, studentToken)
      .subscribe(
        questions => {
          this._applymentService.setItems(questions);
          this._router.navigate(['prova', assessmentToken, 'questao', '1']);
        },
        this.openErrorModal.bind(this)
      );
    ;
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
            if (status) {
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
