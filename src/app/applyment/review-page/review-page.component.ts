import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild, ComponentRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../shared/model/question';
import { AssessmentService } from '../../core/shared/assessment.service';
import { ReviewModalComponent } from './review-modal.component';
import { ApplymentService } from '../../core/shared/applyment.service';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.sass']
})
export class ReviewPageComponent implements OnInit {
  questions: Question[];
  answersLength: number = 0;
  questionsLength: number = 0;
  @ViewChild('modal') modalRef: ComponentRef<ReviewModalComponent>;

  constructor (private router: Router,
               private route: ActivatedRoute,
               private viewContainer: ViewContainerRef,
               private componentFactoryResolver: ComponentFactoryResolver,
               private assessmentService: AssessmentService,
               private applymentService: ApplymentService) {
  }

  ngOnInit () {
    this.assessmentService.getQuestions('1')
      .subscribe(
        (questions) => {
          this.questions = questions;
          this.questionsLength = questions.length;
          this.answersLength = this.applymentService.getAnswers()
              .filter(answer => (answer) ? answer : null)
              .length;
        },
        error => this.questions = []
      );
  }

  back () {
    let uuid = this.route.snapshot.params['uuid'];
    this.router.navigate(['prova', uuid, 'questao', this.questions.length]);
  }

  openDialog () {
    this.closeDialog();
    let modalFactory = this.componentFactoryResolver.resolveComponentFactory(ReviewModalComponent);
    this.modalRef = this.viewContainer.createComponent(modalFactory);
    this.modalRef.instance.onClose.subscribe(() => {
      this.viewContainer.clear();
    });
  }

  closeDialog () {
    this.viewContainer.clear();
  }

}
