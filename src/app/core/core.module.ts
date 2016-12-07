import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from "@angular/http";
import { StoreService } from "./shared/store.service";

@NgModule({
  imports: [
    HttpModule
  ],
  declarations: [],
  providers: [StoreService]
})
export class CoreModule { }
