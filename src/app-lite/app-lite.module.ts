import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ItemModule } from '../app/applyment/item/item.module';
import { bootstrapCustomElements } from './custom-elements/bootstrap-custom-elements.function';
import { QuestionViewComponent } from '../app/applyment/item/question-view/question-view.component';

@NgModule({
  imports: [BrowserModule, ItemModule],
  declarations: [AppComponent],
  entryComponents: [AppComponent, QuestionViewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppLiteModule {
  constructor(private injector: Injector) {
    bootstrapCustomElements(AppLiteModule, this.injector);
  }

  ngDoBootstrap() {
  }
}
