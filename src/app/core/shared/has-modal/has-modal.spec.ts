import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { HasModal } from './has-modal';
import { ViewContainerRef, Component, ComponentFactoryResolver } from '@angular/core';


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
  entryComponents: [ModalComponent]
})
class HasModalComponentImpl extends HasModal {
  constructor(viewContainerRef: ViewContainerRef, componentFactoryResolver: ComponentFactoryResolver) {
    super(viewContainerRef, componentFactoryResolver);
  }
}

describe('HasModal', () => {
  let component: HasModalComponentImpl;
  let fixture: ComponentFixture<HasModalComponentImpl>;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          HasModalComponentImpl,
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
    fixture = TestBed.createComponent(HasModalComponentImpl);
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
      const newMessage = 'New message error after init';

      component.openModal(ModalComponent, {}, (modalComponent) => {
        modalComponent.message = newMessage;
      });

      expect(component.modalRef.instance.message).toEqual(newMessage);
    });
  });
});
