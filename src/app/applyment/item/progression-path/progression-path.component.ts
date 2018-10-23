import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplymentService } from '../../shared/applyment.service';
import Answer from '../../../shared/model/answer';

@Component({
  selector: 'qp-progression-path',
  templateUrl: './progression-path.component.html',
  styleUrls: ['./progression-path.component.sass'],
})
export class ProgressionPathComponent implements OnInit {
  @Input() questionsLength = 0;
  answers: Answer[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private applymentService: ApplymentService,
  ) {}

  ngOnInit() {
    this.answers = this.applymentService.getAllAnswers();
    this.applymentService
      .answersAsObservable()
      .subscribe(answers => (this.answers = answers));
  }

  buttonTitle(answer: Answer, index: number): string {
    return answer.isAnswered()
      ? `Questão ${index} respondida`
      : `Questão ${index} sem resposta`;
  }

  // Events
  onItemClick(index: number) {
    this.router.navigate([
      'prova',
      this.route.snapshot.params['token'],
      'questao',
      index.toString(),
    ]);
  }
}
