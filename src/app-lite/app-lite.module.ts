import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ItemModule } from '../app/applyment/item/item.module';
import { bootstrapCustomElements } from './custom-elements/bootstrap-custom-elements.function';

@NgModule({
  imports: [BrowserModule, ItemModule],
  declarations: [AppComponent],
  entryComponents: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppLiteModule {
  constructor(private injector: Injector) {
    bootstrapCustomElements(ItemModule, this.injector);
    bootstrapCustomElements(AppLiteModule, this.injector);
  }

  ngDoBootstrap() {
  }
}
