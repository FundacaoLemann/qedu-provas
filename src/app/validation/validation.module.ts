import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ValidationRoutingModule } from './validation-routing.module';
import { ValidationComponent } from './validation.component';

@NgModule({
  imports: [
    SharedModule,
    ValidationRoutingModule
  ],
  declarations: [ValidationComponent]
})
export class ValidationModule { }
