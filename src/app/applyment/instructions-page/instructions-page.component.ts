import { Component, OnInit, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Assessment } from '../../shared/model/assessment';
import { AssessmentService } from '../../core/shared/assessment.service';
import { InstructionsModalComponent } from './instructions-modal.component';

@Component({
  selector: 'app-instructions-page',
  templateUrl: 'instructions-page.component.html',
  styleUrls: ['instructions-page.component.sass']
})
export class InstructionsPageComponent implements OnInit {
  assessment: Assessment;
  @ViewChild('modal') modalRef: ComponentRef<InstructionsModalComponent>;

  constructor (private assessmentService: AssessmentService,
               private router: Router,
               private route: ActivatedRoute,
               private viewContainerRef: ViewContainerRef,
               private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit () {
    let assessmentUUID = this.route.snapshot.params['uuid'];
    this.assessmentService.getAssessment(assessmentUUID).subscribe(
      assessment => this.assessment = assessment,
      error => this.assessment = null
    );
  }

  openDialog () {
    let modalFactory = this.componentFactoryResolver.resolveComponentFactory(InstructionsModalComponent);
    this.modalRef = this.viewContainerRef.createComponent(modalFactory);

    // Clear modal when child.onClose is clicked
    this.modalRef.instance.onClose.subscribe(() => {
      this.viewContainerRef.clear();
    });
  }
}
