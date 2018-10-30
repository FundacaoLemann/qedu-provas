import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidationComponent } from './validation.component';
import { MatrixSearchPageComponent } from './pages/matrix-search-page/matrix-search-page.component';
import { ItemPageComponent } from './pages/item-page/item-page.component';
import { ApprovalPageComponent } from './pages/approval-page/approval-page.component';

const routes: Routes = [
  {
    path: 'validacao', component: ValidationComponent,
    children: [
      { path: '', component: MatrixSearchPageComponent },
      { path: ':id/item/:itemIndex', component: ItemPageComponent },
      { path: ':id/aprovacao', component: ApprovalPageComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidationRoutingModule {
}
