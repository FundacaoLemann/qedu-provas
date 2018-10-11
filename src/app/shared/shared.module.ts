import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// Services
import { ConnectionService } from './services/connection.service';
// Directives
import { ForbiddenCharactersDirective } from './directives/forbidden-characters.directive';
// Components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PanelPageComponent } from './components/panel-page/panel-page.component';
import { ConnectionStatusComponent } from './components/connection-status/connection-status.component';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
  ],
  declarations: [
    ForbiddenCharactersDirective,
    HeaderComponent,
    FooterComponent,
    PanelPageComponent,
    ConnectionStatusComponent,
    LogoComponent
  ],
  providers: [
    ConnectionService,
  ],
  exports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    PanelPageComponent,
    // Directives
    ForbiddenCharactersDirective,
    // Components
    HeaderComponent,
    FooterComponent,
    PanelPageComponent,
    ConnectionStatusComponent,
  ],
})

export class SharedModule {
}
