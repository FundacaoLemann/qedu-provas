import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import EducationalEntity from '../../../shared/model/educational-entity';
import { Assessment } from '../../../shared/model/assessment';

@Component({
  selector: 'qp-page-logos',
  templateUrl: './page-logos.component.html',
  styleUrls: ['./page-logos.component.sass']
})
export class PageLogosComponent implements OnChanges {
  @Input() assessment: Assessment;
  school: EducationalEntity;
  department: EducationalEntity;

  constructor() { }

  ngOnChanges() {
    if ( this.assessment ) {
      this.school = this.assessment.school;
      this.department = this.assessment.department;
    }
  }

}
