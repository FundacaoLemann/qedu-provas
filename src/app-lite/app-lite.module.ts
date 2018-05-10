import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  entryComponents: [AppComponent],
})
export class AppLiteModule {
  constructor(public injector: Injector) {
    const AppElement = createCustomElement(AppComponent, {injector: this.injector});
    customElements.define('qp-app', AppElement);
  }

  ngDoBootstrap() {
  }
}
