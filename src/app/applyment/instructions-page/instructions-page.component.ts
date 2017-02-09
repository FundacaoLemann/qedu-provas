import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, Type } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Assessment } from '../../shared/model/assessment';
import { AssessmentService } from '../../core/shared/assessment.service';
import { InstructionsModalComponent } from './modal/instructions-modal.component';
import { ApplymentService } from '../../core/shared/applyment.service';
import { ConnectionService } from '../../core/shared/connection.service';
import { NoConnectionModalComponent } from '../shared/no-connection-modal/no-connection-modal.component';
import { HasModal } from "../../core/shared/has-modal/has-modal";

@Component({
  selector: 'qp-instructions-page',
  templateUrl: 'instructions-page.component.html',
  styleUrls: ['instructions-page.component.sass'],
  entryComponents: [NoConnectionModalComponent]
})
export class InstructionsPageComponent extends HasModal implements OnInit {
  assessment: Assessment;

  constructor(private assessmentService: AssessmentService,
              private router: Router,
              private route: ActivatedRoute,
              private applymentService: ApplymentService,
              private connection: ConnectionService,
              private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) {
    super(viewContainerRef, componentFactoryResolver);
  }

  ngOnInit() {
    const assessmentUUID = this.route.snapshot.params['uuid'];
    this.assessmentService.getAssessment(assessmentUUID).subscribe(
      assessment => this.assessment = assessment,
      error => this.assessment = null
    );
  }

  /**
   * Start the assessment
   */
  initAssessment() {
    this.applymentService.initAnswers(this.assessment.itemsCount);
    this.router.navigate(['prova', this.route.snapshot.params['uuid'], 'questao', '1']);
  }

  /**
   * Open the modal to confirm start
   */
  openModalProceed() {
    this.openModal(InstructionsModalComponent, {
      onConfirm: () => {
        this.connection.getStatusOnce().subscribe((status) => {
          if ( status ) {
            this.initAssessment();
          } else {
            this.closeModal();
            setTimeout(() => {
              this.openModalConnectionError();
            }, 300);
          }
        });
      },
      onClose: () => {
        this.closeModal();
      }
    });
  }

  /**
   * Show no-connection modal
   */
  openModalConnectionError() {
    this.openModal(NoConnectionModalComponent, {
      onClose: () => {
        this.closeModal();
      }
    });
  }
}
