import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

declare let customElements: any;

export function bootstrapCustomElements(module: any, injector: Injector) {
  const entryComponents: any[] = module.__annotations__[0].entryComponents;

  if (!entryComponents) {
    return;
  }

  entryComponents
    .filter((componentDecorator: any) =>
      componentDecorator.__annotations__[0].hasOwnProperty('customTagName'),
    )
    .map((filteredComponentDecorator: any) => {
      const tagName =
        filteredComponentDecorator.__annotations__[0].customTagName;
      const element = createCustomElement(filteredComponentDecorator, {
        injector,
      });
      customElements.define(tagName, element);
    });
}
