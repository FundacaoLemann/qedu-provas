import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { getAnnotations } from './get-annotations.function';

declare let customElements: any;

export function bootstrapCustomElements(
  module: any,
  injector: Injector,
) {
  const entryComponents: any[] = getAnnotations(module).entryComponents;

  if (!entryComponents) {
    return;
  }

  entryComponents
    .filter((componentDecorator: any) =>
      getAnnotations(componentDecorator).hasOwnProperty('customTagName'),
    )
    .map((filteredComponentDecorator: any) => {
      const tagName = getAnnotations(filteredComponentDecorator).customTagName;
      const element = createCustomElement(filteredComponentDecorator, {
        injector,
      });
      customElements.define(tagName, element);
    });
}
