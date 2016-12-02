import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { HttpModule } from "@angular/http";
import { StoreService } from "./shared/store.service";

@NgModule({
  imports: [
    HttpModule
  ],
  declarations: [CoreComponent],
  providers: [StoreService]
})
export class CoreModule { }
