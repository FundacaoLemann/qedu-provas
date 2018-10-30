import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidationComponent } from './validation.component';
import { MatrixSearchPageComponent } from './pages/matrix-search-page/matrix-search-page.component';
import { ItemPageComponent } from './pages/item-page/item-page.component';
import { ApprovalPageComponent } from './pages/approval-page/approval-page.component';
import { RouterGuardService } from './services/router-guard.service';

const routes: Routes = [
  {
    path: 'validacao',
    component: ValidationComponent,
    children: [
      { path: '', component: MatrixSearchPageComponent },
      {
        path: ':id/item/:itemIndex',
        component: ItemPageComponent,
        canActivate: [RouterGuardService],
      },
      {
        path: ':id/aprovacao',
        component: ApprovalPageComponent,
        canActivate: [RouterGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidationRoutingModule {}
