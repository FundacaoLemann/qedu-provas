import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ForbiddenCharactersDirective } from './directives/forbidden-characters.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    HttpModule
  ],
  exports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule
  ],
  declarations: [
    ForbiddenCharactersDirective
  ],
  providers: []
})

export class SharedModule {
}
