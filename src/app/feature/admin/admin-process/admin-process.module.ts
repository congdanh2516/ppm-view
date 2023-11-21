import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProcessComponent } from './admin-process.component';
import { ProcessDetailComponent } from './components/process-detail/process-detail.component';
import { TaskCreationComponent } from './components/task-creation/task-creation.component';
import { TaskModificationComponent } from './components/task-modification/task-modification.component';
import { ExampleComponent } from './components/example/example.component';

import {MatExpansionModule} from '@angular/material/expansion'; //copy tu Angular Material

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminProcessRoutingModule } from './admin-process-routing.module';
import {MatDialogModule} from '@angular/material/dialog';
import { ProcessCreationComponent } from './components/process-creation/process-creation.component';


@NgModule({
  declarations: [
    AdminProcessComponent,
    ProcessDetailComponent,
    TaskCreationComponent,
    TaskModificationComponent,
    ExampleComponent,
    ProcessCreationComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AdminProcessRoutingModule,
    MatDialogModule,

    MatExpansionModule //copy ten đe xuong day

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AdminProcessModule { }
