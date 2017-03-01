import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../shared/model/question';
import { AssessmentService } from '../../core/shared/assessment.service';
import { ReviewModalComponent } from './modal/review-modal.component';
import { ApplymentService } from '../shared/applyment.service';
import { NoConnectionModalComponent } from '../shared/no-connection-modal/no-connection-modal.component';
import { HasModal } from '../../core/shared/has-modal/has-modal';
import { ConnectionService } from '../../core/shared/connection.service';
import 'rxjs/add/operator/catch';
import { Assessment } from '../../shared/model/assessment';

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
  questions: Question[];
  answers: number[] = [];
  answersLength = 0;
  questionsLength = 0;
  assessment: Assessment;

  constructor(private viewContainer: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private assessmentService: AssessmentService,
              private applymentService: ApplymentService,
              private route: ActivatedRoute,
              private router: Router,
              private connection: ConnectionService) {
    super(viewContainer, componentFactoryResolver);
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.assessmentService
      .fetchAssessment(this.route.snapshot.params['uuid'])
      .subscribe(assessment => this.assessment = assessment);

    this.assessmentService.fetchAssessmentQuestions(this.route.snapshot.params['uuid'])
      .subscribe(
        (questions) => {
          this.questions = questions;
          this.questionsLength = questions.length;
          this.answers = this.applymentService.getAllAnswers();
          this.answersLength = this.answers.filter((answer) => !!answer).length;
        },
        error => this.questions = []
      );
  }

  back() {
    const uuid = this.route.snapshot.params['uuid'];
    this.router.navigate(['prova', uuid, 'questao', this.questions.length]);
  }

  navigate(questionNumber: number) {
    this.router.navigate(['prova', this.route.snapshot.params['uuid'], 'questao', questionNumber.toString()]);
  }

  openFinishModal() {
    this.openModal(ReviewModalComponent, {
      'onConfirm': () => {
        this.finish();
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
    // TODO
    // Send data to API
    const uuid = this.route.snapshot.params['uuid'];
    this.router.navigate(['prova', uuid, 'parabens']);
  }

  finish() {
    this.modalRef.instance.isSubmitting = true;
    this.connection
      .getStatusOnce()
      .subscribe(status => {
        status ? this.submit() : this.openNoConnectionModal();
      });
  }
}
