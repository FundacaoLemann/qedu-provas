import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../shared/model/item';
import { AssessmentService } from '../../core/shared/assessment.service';
import { ReviewModalComponent } from './modal/review-modal.component';
import { ApplymentService } from '../shared/applyment.service';
import { NoConnectionModalComponent } from '../shared/no-connection-modal/no-connection-modal.component';
import { HasModal } from '../../core/shared/has-modal/has-modal';
import { ConnectionService } from '../../core/shared/connection.service';
import 'rxjs/add/operator/catch';
import { Assessment } from '../../shared/model/assessment';
import Answer from '../../shared/model/answer';

@Component({
  selector: 'qp-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.sass'],
  entryComponents: [
    ReviewModalComponent,
    NoConnectionModalComponent
  ]
})
export class ReviewPageComponent extends HasModal implements OnInit {
  questions: Item[];
  answers: Answer[] = [];
  answersLength = 0;
  questionsLength = 0;
  assessment: Assessment;

  constructor(protected _viewContainer: ViewContainerRef,
              protected _componentFactoryResolver: ComponentFactoryResolver,
              private _applymentService: ApplymentService,
              private _assessmentService: AssessmentService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _connection: ConnectionService) {
    super(_viewContainer, _componentFactoryResolver);
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.assessment = this._applymentService.getAssessment();
    this.questions = this._applymentService.getItems();
    this.questionsLength = this.questions.length;
    this.answers = this._applymentService.getAllAnswers();
    this.answersLength = this.answers.filter((answer) => !!answer).length;
  }

  back() {
    const uuid = this._route.snapshot.params['token'];
    this._router.navigate(['prova', uuid, 'questao', this.questions.length]);
  }

  navigate(questionNumber: number) {
    this._router.navigate(['prova', this._route.snapshot.params['token'], 'questao', questionNumber.toString()]);
  }

  openFinishModal() {
    this.openModal(ReviewModalComponent, {
      'onConfirm': () => {
        this.deliver();
      },
      'onCancel': () => {
        this.closeModal();
      }
    });
  }

  openNoConnectionModal() {
    this.closeModal();
    setTimeout(() => {
      this.openModal(NoConnectionModalComponent, {
        onClose: () => {
          this.closeModal();
        }
      });
    }, 300);
  }

  submit() {
    const assessmentToken = this._route.snapshot.params['token'];
    const studentToken = this._applymentService.getStudent().token;
    const answers = this._applymentService.getAllAnswers().filter(answer => answer);

    this._assessmentService
        .postAnswers(assessmentToken, studentToken, answers)
        .subscribe(
          response => {
            if (response.status === 200 || response.status === 201) {
              this._router.navigate(['prova', assessmentToken, 'parabens']);

            } else {
              /**
               * TODO
               * Treat response error
               * QP-57
               * QP-131
               */
              console.log(response);
            }
          },
          (error) => {
            /**
             * TODO
             * Treat response error
             * QP-57
             * QP-131
             */
            console.log(error);
          }
        );
  }

  finish() {

  }

  deliver() {
    this.modalRef.instance.isSubmitting = true;
    this._connection
        .getStatusOnce()
        .subscribe(status => {
          status ? this.submit() : this.openNoConnectionModal();
        });
  }

}
