import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

declare let customElements: any;

export function bootstrapCustomElements(repository: any, injector: Injector) {
  //noinspection TypeScriptUnresolvedFunction
  const entryComponents: any[] = Object.entries(repository);

  entryComponents.forEach(([tagName, component]) => {
    const element = createCustomElement(component, {
      injector,
    });
    customElements.define(tagName, element);
  });
}
