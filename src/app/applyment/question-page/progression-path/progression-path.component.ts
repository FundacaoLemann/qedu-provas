import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplymentService } from '../../../core/shared/applyment.service';

@Component({
  selector: 'qp-progression-path',
  templateUrl: './progression-path.component.html',
  styleUrls: ['./progression-path.component.sass']
})
export class ProgressionPathComponent implements OnInit {
  @Input() questionsLength = 0;
  answers: number[] = [];

  constructor (private router: Router,
               private route: ActivatedRoute,
               private applymentService: ApplymentService) {
  }

  ngOnInit () {
    this.answers = this.applymentService.getAnswers();
    this.applymentService.getAnswersAsObservable().subscribe(answers => {
      this.answers = answers;
    });
  }

  buttonTitle(answered: boolean, index: number): string {
    return answered ? `Questão ${index} respondida` : `Questão ${index} sem resposta`;
  }

  // Events
  onItemClick (index: number) {
    this.router.navigate(['prova', this.route.snapshot.params['uuid'], 'questao', index.toString()]);
  }

}
