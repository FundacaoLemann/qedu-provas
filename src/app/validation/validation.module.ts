import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ValidationRoutingModule } from './validation-routing.module';
import { ValidationComponent } from './validation.component';
import { MatrixSearchPageComponent } from './matrix-search-page/matrix-search-page.component';

@NgModule({
  imports: [
    SharedModule,
    ValidationRoutingModule
  ],
  declarations: [ValidationComponent, MatrixSearchPageComponent]
})
export class ValidationModule { }
