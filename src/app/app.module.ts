import { NgModule } from '@angular/core';

import { ApplymentModule } from './applyment/applyment.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    SharedModule,
    CoreModule,
    ApplymentModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule {
}
