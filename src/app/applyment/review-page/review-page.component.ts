import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild, ComponentRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../shared/model/question';
import { AssessmentService } from '../../core/shared/assessment.service';
import { ReviewModalComponent } from './modal/review-modal.component';
import { ApplymentService } from '../../core/shared/applyment.service';
import { NoConnectionModalComponent } from "../shared/no-connection-modal/no-connection-modal.component";

@Component({
  selector: 'qp-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.sass'],
  entryComponents: [NoConnectionModalComponent]
})
export class ReviewPageComponent implements OnInit {
  questions: Question[];
  answers: number[] = [];
  answersLength = 0;
  questionsLength = 0;
  @ViewChild('modal') modalRef: ComponentRef<ReviewModalComponent>;

  constructor(private viewContainer: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private assessmentService: AssessmentService,
              private applymentService: ApplymentService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.assessmentService.getQuestions(this.route.snapshot.params['uuid'])
      .subscribe(
        (questions) => {
          this.questions = questions;
          this.questionsLength = questions.length;
          this.answers = this.applymentService.getAnswers();
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

  openDialog() {
    this.closeDialog();
    const modalFactory = this.componentFactoryResolver.resolveComponentFactory(ReviewModalComponent);
    this.modalRef = this.viewContainer.createComponent(modalFactory);
    this.modalRef.instance.onClose.subscribe(() => {
      this.viewContainer.clear();
    });
  }

  closeDialog() {
    this.viewContainer.clear();
  }

}
