import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { HasModal } from './has-modal';
import { ViewContainerRef, Component, ComponentFactoryResolver } from '@angular/core';
import { ErrorModalComponent } from '../../applyment/shared/error-modal/error-modal.component';

@Component({
  selector: 'qp-modal',
  template: '<div class="modal"></div>'
})
class ModalComponent {
  message = '';
}

@Component({
  selector: 'qp-has-modal',
  template: '<div class="has-modal"></div>',
  entryComponents: [ModalComponent, ErrorModalComponent]
})
class HasModalComponent extends HasModal {
  constructor(viewContainerRef: ViewContainerRef, componentFactoryResolver: ComponentFactoryResolver) {
    super(viewContainerRef, componentFactoryResolver);
  }
}

describe('HasModal', () => {
  let component: HasModalComponent;
  let fixture: ComponentFixture<HasModalComponent>;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          HasModalComponent,
          ErrorModalComponent,
          ModalComponent
        ],
        providers: [
          ViewContainerRef,
          ComponentFactoryResolver
        ]
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('openModal()', () => {
    it('should create a ModalComponent', () => {
      component.openModal(ModalComponent, {});

      const modalRefInstance = component.modalRef.instance;
      expect(modalRefInstance).toBeTruthy();
      expect(modalRefInstance).toEqual(jasmine.any(ModalComponent));
    });

    it('should call afterInit callback after creating modal', () => {
      let actualCalled = false;
      let actualModal = null;

      component.openModal(ModalComponent, {}, (modalComponent) => {
        actualCalled = true;
        actualModal = modalComponent;
      });

      expect(actualCalled).toEqual(true);
      expect(actualModal).toBeTruthy();
      expect(actualModal).toEqual(jasmine.any(ModalComponent));
    });

    it('should be able to change the values of created component', () => {
      const newMessage = 'New message errors after init';

      component.openModal(ModalComponent, {}, (modalComponent) => {
        modalComponent.message = newMessage;
      });

      expect(component.modalRef.instance.message).toEqual(newMessage);
    });
  });

  describe('openErrorModal()', () => {
    it('should create a modal with custom message', () => {
      const message = 'Assessment not found.';
      component.openErrorModal(message);

      const modalInstance = component.modalRef.instance;
      expect(modalInstance).toEqual(jasmine.any(ErrorModalComponent));
      expect(modalInstance.message.replace(/"/g, '')).toEqual(message);
    });
  });
});
