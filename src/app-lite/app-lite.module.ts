import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ItemModule } from '../app/applyment/item/item.module';

import { bootstrapCustomElements } from './custom-elements/bootstrap-custom-elements.function';
import { customElementsRepository } from './custom-elements-repository';

@NgModule({
  imports: [BrowserModule, ItemModule],
  declarations: [AppComponent],
  entryComponents: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppLiteModule {
  constructor(private injector: Injector) {
    bootstrapCustomElements(customElementsRepository, this.injector);
  }

  ngDoBootstrap() {
  }
}
