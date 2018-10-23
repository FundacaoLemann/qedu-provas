import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ValidationRoutingModule } from './validation-routing.module';
import { ValidationComponent } from './validation.component';
// Components
import { MatrixSearchPageComponent } from './pages/matrix-search-page/matrix-search-page.component';
import { ItemPageComponent } from './pages/item-page/item-page.component';
import { MatrixInfoComponent } from './components/matrix-info/matrix-info.component';
// Services
import { ValidationStateService } from './services/validation-state.service';
// External Modules
import { ItemModule } from '../applyment/item/item.module';

@NgModule({
  imports: [
    SharedModule,
    ItemModule,
    ValidationRoutingModule
  ],
  providers: [
    ValidationStateService,
  ],
  declarations: [
    ValidationComponent,
    MatrixSearchPageComponent,
    MatrixInfoComponent,
    ItemPageComponent,
  ],
})
export class ValidationModule {}
