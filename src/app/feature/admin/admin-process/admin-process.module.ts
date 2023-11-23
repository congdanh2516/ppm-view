import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProcessComponent } from './admin-process.component';
import { ProcessDetailComponent } from './components/process-detail/process-detail.component';
import { TaskCreationComponent } from './components/task-creation/task-creation.component';
import { TaskModificationComponent } from './components/task-modification/task-modification.component';
import { ExampleComponent } from './components/example/example.component';

import { MatExpansionModule } from '@angular/material/expansion'; //copy tu Angular Material
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminProcessRoutingModule } from './admin-process-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ProcessCreationComponent } from './components/process-creation/process-creation.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminProcessModule {}
