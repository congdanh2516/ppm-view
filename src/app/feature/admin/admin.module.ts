import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminProcessModule } from './admin-process/admin-process.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AdminProcessModule,
    AdminRoutingModule,
    
    
  ],
  
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AdminModule { }
