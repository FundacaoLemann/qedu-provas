import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Assessment } from '../../shared/model/assessment';
import { AssessmentService } from '../../core/shared/assessment.service';

@Component({
  selector: 'app-instructions-page',
  templateUrl: 'instructions-page.component.html',
  styleUrls: ['instructions-page.component.sass']
})
export class InstructionsPageComponent implements OnInit {
  assessment: Assessment;

  constructor (private assessmentService: AssessmentService,
               private router: Router,
               private route: ActivatedRoute,) {
  }

  ngOnInit () {
    let assessmentUUID = this.route.snapshot.params['uuid'];
    this.assessmentService.getAssessment(assessmentUUID).subscribe(
      assessment => this.assessment = assessment,
      error => this.assessment = null
    );
  }

  startAssessment () {
    this.router.navigate(['prova', this.assessment.id, 'questao', '1']);
  }
}
