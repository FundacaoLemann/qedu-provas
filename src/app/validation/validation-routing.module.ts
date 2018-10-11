import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidationComponent } from './validation.component';

const routes: Routes = [
  {
    path: 'validacao', component: ValidationComponent,
    children: [
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidationRoutingModule {
}
