import { Component, ComponentFactoryResolver, ComponentRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ErrorModalComponent } from '../../../applyment/shared/error-modal/error-modal.component';

export abstract class HasModal {
  @ViewChild('modal') modalRef: ComponentRef<any>;

  constructor(protected _viewContainerRef: ViewContainerRef,
              protected _componentFactoryResolver: ComponentFactoryResolver) {
  }

  /**
   * Generic function to open modal
   * @param modalComponent Modal component to be appended
   * @param events Object containing the events to be bound
   * @param [afterInit] callback called after creating the component, passing its instance as first param
   */
  openModal<T>(modalComponent: Type<T>, events: { [key: string]: Function }, afterInit?: Function) {
    // Close the current modal
    this.closeModal();

    // Instantiate the modal by factoring
    const modalFactory = this._componentFactoryResolver.resolveComponentFactory(modalComponent);
    this.modalRef = this._viewContainerRef.createComponent(modalFactory);

    if (afterInit && afterInit.call) {
      afterInit(this.modalRef.instance);
    }

    // Subscribe to events of modal
    this.bindEvents(events);
  }

  /**
   * Bind the event handlers of modal
   * @param events Object containing the modal events to listen
   */
  bindEvents(events: { [key: string]: Function }) {
    const viewInstance = this.modalRef.instance;

    for (const event in events) {
      if (viewInstance[event]) {
        viewInstance[event].subscribe(events[event]);
      }
    }
  }

  /**
   * Close the modal
   */
  closeModal() {
    this._viewContainerRef.clear();
  }

  openErrorModal(message: string) {
    this.closeModal();
    this.openModal(ErrorModalComponent, { 'onClose': this.closeModal.bind(this) }, (modalInstance) => {
      modalInstance.message = message;
    });
  }
}
