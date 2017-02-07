import {
  Component, OnInit, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver,
  Type
} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Assessment} from '../../shared/model/assessment';
import {AssessmentService} from '../../core/shared/assessment.service';
import {InstructionsModalComponent} from './modal/instructions-modal.component';
import {ApplymentService} from '../../core/shared/applyment.service';
import {ConnectionService} from '../../core/shared/connection.service';
import {NoConnectionModalComponent} from './modal/no-connection-modal.component';

@Component({
  selector: 'qp-instructions-page',
  templateUrl: 'instructions-page.component.html',
  styleUrls: ['instructions-page.component.sass']
})
export class InstructionsPageComponent implements OnInit {
  assessment: Assessment;
  @ViewChild('modal') modalRef: ComponentRef<any>;

  constructor(private assessmentService: AssessmentService,
              private router: Router,
              private route: ActivatedRoute,
              private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private applymentService: ApplymentService,
              private connection: ConnectionService) {
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
    this.openModal(InstructionsModalComponent, () => {
      this.connection.getStatusOnce().subscribe((status) => {
        console.log(status);
        if (status) {
          this.initAssessment();
        } else {
          this.closeModal();
          setTimeout(() => {
            this.openModalConnectionError();
          }, 300);
        }
      });
    });
  }

  /**
   * Show no-connection modal
   */
  openModalConnectionError() {
    this.openModal(NoConnectionModalComponent, () => {
      this.closeModal();
    });
  }

  /**
   * Generic function to open modal
   * @param modalComponent Modal component to be appended
   * @param onProceed callback to onProceed emission
   */
  private openModal(modalComponent: Type<Component>, onProceed: Function) {
    const modalFactory = this.componentFactoryResolver.resolveComponentFactory(modalComponent);
    this.modalRef = this.viewContainerRef.createComponent(modalFactory);

    // Clear modal when child.onClose is emitted
    if (this.modalRef.instance.onClose) {
      this.modalRef.instance.onClose.subscribe(() => {
        this.viewContainerRef.clear();
      });
    }

    this.modalRef.instance.onConfirm.subscribe(onProceed);
  }

  /**
   * Clear the modal
   */
  private closeModal() {
    this.viewContainerRef.clear();
  }
}
