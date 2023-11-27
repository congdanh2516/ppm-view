import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmBoxModalComponent } from './confirm-box-modal/confirm-box-modal.component';
import { ToastBoxModalComponent } from './toast-box-modal/toast-box-modal.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ErrorMessageComponent,
    ConfirmBoxModalComponent,
    ToastBoxModalComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    ErrorMessageComponent,
    HeaderComponent,
    ConfirmBoxModalComponent,
    ToastBoxModalComponent,
    LoaderComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SharedModule { }
