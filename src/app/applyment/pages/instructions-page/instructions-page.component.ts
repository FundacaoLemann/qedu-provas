import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from '../../../core/assessment.service';
import { ConnectionService } from '../../../shared/services/connection.service';
import { HasModal } from '../../../core/has-modal/has-modal';
import { Assessment } from '../../../shared/model/assessment';
import { Item } from '../../../shared/model/item';
import { ApplymentService } from '../../shared/applyment.service';
import { NoConnectionModalComponent } from '../../shared/no-connection-modal/no-connection-modal.component';
import { InstructionsModalComponent } from './modal/instructions-modal.component';
import MESSAGES from '../../../core/messages/messages';

@Component({
  selector: 'qp-instructions-page',
  templateUrl: './instructions-page.component.html',
  styleUrls: ['./instructions-page.component.sass'],
  entryComponents: [NoConnectionModalComponent, InstructionsModalComponent],
})
export class InstructionsPageComponent extends HasModal implements OnInit {
  assessment: Assessment;
  showLoading = false;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _applymentService: ApplymentService,
    private _assessmentService: AssessmentService,
    private _connection: ConnectionService,
    protected _viewContainerRef: ViewContainerRef,
    protected _componentFactoryResolver: ComponentFactoryResolver,
  ) {
    super(_viewContainerRef, _componentFactoryResolver);
  }

  ngOnInit() {
    this.assessment = this._applymentService.getAssessment();
  }

  /**
   * Start the assessment
   */
  initAssessment() {
    this.closeModal();
    this.showLoading = true;
    const assessmentToken = this._route.snapshot.params['token'];
    const studentToken = this._applymentService.getStudent().token;

    this._assessmentService
      .fetchAssessmentQuestions(assessmentToken, studentToken)
      .subscribe(questions => {
        this._applymentService.setItems(questions);
        this._applymentService.initAnswers(questions);
        this.showLoading = false;
        this._router.navigate(['prova', assessmentToken, 'questao', '1']);
        this.loadImageCache(questions);
      }, this.openErrorModal.bind(this));
  }

  /**
   * Open the modal to confirm start
   */
  openModalProceed() {
    this.openModal(InstructionsModalComponent, {
      onConfirm: () => {
        this._connection.getStatusOnce().subscribe(status => {
          if (status) {
            this.initAssessment();
          } else {
            this.openErrorModal(MESSAGES.SYSTEM_NOT_AVAILABLE);
          }
        });
      },
      onClose: () => {
        this.closeModal();
      },
    });
  }

  openModalConnectionError() {
    this.closeModal();
    setTimeout(() => {
      this.openModal(NoConnectionModalComponent, {
        onClose: () => {
          this.closeModal();
        },
      });
    }, 300);
  }

  loadImageCache(questions: Item[]) {
    function injectLinkPrefetch(media: any) {
      const element = document.createElement('link');
      element.rel = 'prefetch';
      element.href = media.source;
      document.getElementsByTagName('head')[0].appendChild(element);
    }

    questions.map(question =>
      question.media.filter(media => !!media.source).map(injectLinkPrefetch),
    );
  }
}
