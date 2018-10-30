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
import { RouterGuardService } from './services/router-guard.service';
// External Modules
import { ItemModule } from '../applyment/item/item.module';
import { ApprovalPageComponent } from './pages/approval-page/approval-page.component';
import { ApprovedContentComponent } from './pages/approval-page/approved-content/approved-content.component';
import { RefusedContentComponent } from './pages/approval-page/refused-content/refused-content.component';

@NgModule({
  imports: [
    SharedModule,
    ItemModule,
    ValidationRoutingModule
  ],
  providers: [
    ValidationStateService,
    RouterGuardService
  ],
  declarations: [
    ValidationComponent,
    MatrixSearchPageComponent,
    MatrixInfoComponent,
    ItemPageComponent,
    ApprovalPageComponent,
    ApprovedContentComponent,
    RefusedContentComponent,
  ],
})
export class ValidationModule {}
