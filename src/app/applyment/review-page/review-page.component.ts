import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from '../../core/shared/assessment.service';
import { ConnectionService } from '../../core/shared/connection.service';
import { HasModal } from '../../core/shared/has-modal/has-modal';
import { ConnectionError } from '../../shared/errors/connection-error';
import Answer from '../../shared/model/answer';
import { Assessment } from '../../shared/model/assessment';
import { Item } from '../../shared/model/item';
import { Student } from '../../shared/model/student';
import { ApplymentService } from '../shared/applyment.service';
import { ErrorModalComponent } from '../shared/error-modal/error-modal.component';
import { NoConnectionModalComponent } from '../shared/no-connection-modal/no-connection-modal.component';
import { ReviewModalComponent } from './modal/review-modal.component';

@Component({
  selector: 'qp-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.sass'],
  entryComponents: [
    ReviewModalComponent,
    NoConnectionModalComponent,
    ErrorModalComponent
  ]
})
export class ReviewPageComponent extends HasModal implements OnInit {
  questions: Item[];
  answers: Answer[] = [];
  notAnswered: number[] = [];
  answersLength = 0;
  questionsLength = 0;
  assessment: Assessment;
  student: Student;

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
    if (this.assessment.token === undefined || this.assessment.token == null) {
      this._router.navigate(['']);
    }
    this.student = this._applymentService.getStudent();
    this.questions = this._applymentService.getItems();
    this.questionsLength = this.questions.length;
    const answers = this._applymentService.getAllAnswers();
    this.answers = answers;
    this.setNotAnswered(answers);
    this.answersLength = answers.length - this.notAnswered.length;
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
        },
        onDownload: (code) => {
          this._assessmentService.downloadBackup(code);
        }
      });
    }, 300);
  }

  submit() {
    const answers = this._applymentService.getAllAnswers().filter(answer => answer);

    const onError = (error: any) => {
      console.log(error);
      if (error instanceof ConnectionError) {
        this.openNoConnectionModal();
      } else {
        this.openErrorModal(error.message);
      }
    };

    this._assessmentService
        .postAnswers(this.assessment.token, this.student.token, answers)
        .subscribe(
          this.finishAndRedirect.bind(this),
          onError.bind(this)
        );
  }

  finishAndRedirect() {
    this._assessmentService
        .finishAssessment(this.assessment.token, this.student.token)
        .subscribe(
          () => {
            this._router.navigate(['prova', this.assessment.token, 'parabens']);
          },
          this.openErrorModal.bind(this)
        );
  }

  deliver() {
    this.modalRef.instance.isSubmitting = true;
    this.writeBackup();

    this._connection
        .getStatusOnce()
        .subscribe(status => {
          if (status) {
            this.submit();
          } else {
            this.openNoConnectionModal();
          }
        });
  }

  writeBackup() {
    const answers = this._applymentService.getAllAnswers().filter(answer => answer);
    window.localStorage.setItem('studentToken', this.student.token);
    window.localStorage.setItem('assessmentToken', this.assessment.token);
    window.localStorage.setItem('answers-' + this.student.token, btoa(JSON.stringify(answers)));
  }

  setNotAnswered(allAnswers: Answer[]) {
    this.notAnswered = [];
    allAnswers.map((answer, index) => {
      if (!answer) {
        this.notAnswered.push(index + 1);
      }
    });
  }
}
