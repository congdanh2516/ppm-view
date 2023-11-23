import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminProcessModule } from './admin-process/admin-process.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AdminProcessModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}
