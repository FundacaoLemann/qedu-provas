import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../shared/model/item';
import { ApplymentService } from '../shared/applyment.service';
import { AnalyticsService } from '../../core/shared/analytics.service';
import { Assessment } from '../../shared/model/assessment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import Answer from '../../shared/model/answer';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'qp-question-page',
    templateUrl: './question-page.component.html',
    styleUrls: ['./question-page.component.sass'],
})
export class QuestionPageComponent implements OnInit {
    question: Item;
    questionText: SafeHtml = null;
    questionIndex = 0;
    questionsLength: number;
    options: any[];
    checkedAnswer: number = null;
    assessment: Assessment;
    initialTime: number;

    constructor(private _route: ActivatedRoute,
                private _analyticsService: AnalyticsService,
                private _router: Router,
                private _applymentService: ApplymentService,
                private _sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.assessment = this._applymentService.getAssessment();

        // Update question based on the url change
        this._route.params
            .switchMap(params => Observable.of(+params['question_id'] - 1))
            .subscribe(
                questionIndex => {
                    try {
                        const questions = this._applymentService.getItems();
                        this.questionIndex = questionIndex;
                        this.questionsLength = questions.length;
                        this.question = questions[this.questionIndex];
                        this.questionText = this.questionHTMLText();
                        this.options = this.question.answers;
                        this.initialTime = new Date().getTime();
                        document.body.scrollTop = 0;
                    } catch (err) {
                        this.question = new Item();
                        this.options = [];
                    } finally {
                        const answer = this._applymentService.getAnswer(this.questionIndex);
                        this.checkedAnswer = (answer && answer.optionId) ? answer.optionId : 0;
                    }
                },
                error => {
                    this.question = new Item();
                    this.options = [];
                },
            );
    }

    questionHTMLText(): SafeHtml {
        let questionText = this.question.text;

        this.question.media.map(media => {
            switch (media.type) {
                case 'image':
                    questionText = questionText.replace(`{{${media.id}}}`,
                        `<p><img class="img-responsive center-block" src="${media.source}" /></p>`);
                    break;
            }
        });

        return this._sanitizer.bypassSecurityTrustHtml(questionText);
    }

    updateChecked(optionId: number) {
        const answer = new Answer();
        answer.optionId = optionId;
        answer.itemId = this.question.id;

        this.checkedAnswer = optionId;
        this._applymentService.setAnswer(this.questionIndex, answer);
    }

    submitAnswerAndNavigateNext() {
        this.postAnswer();
        const nextQuestion = +this._route.snapshot.params['question_id'] + 1;
        const token = this._route.snapshot.params['token'];
        if (nextQuestion > this.questionsLength) {
            this._router.navigate(['prova', token, 'revisao']);
        } else {
            this._router.navigate(['prova', token, 'questao', nextQuestion]);
        }
        this._analyticsService.eventTrack(this.assessment.token, window.localStorage.getItem('studentToken'), this.questionIndex, this.initialTime);
    }

    submitAnswerAndNavigateBack() {
        this.postAnswer();
        const prevQuestion = +this._route.snapshot.params['question_id'] - 1;
        if (prevQuestion >= 1) {
            const uuid = this._route.snapshot.params['token'];
            this._router.navigate(['prova', uuid, 'questao', prevQuestion]);
        }
        this._analyticsService.eventTrack(this.assessment.token, window.localStorage.getItem('studentToken'), this.questionIndex, this.initialTime);
    }

    postAnswer() {
        const applymentStatus = this._applymentService.getApplymentStatus();
    }
}
