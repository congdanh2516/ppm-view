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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [
    AdminProcessComponent,
    ProcessDetailComponent,
    ExampleComponent,
    TaskCreationComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AdminProcessRoutingModule,
    MatDialogModule,
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatButtonModule, 
    MatSelectModule, 
    ReactiveFormsModule, 
    MatNativeDateModule, 
    MatDatepickerModule, 
    MatDialogModule,
    CommonModule,
    MatExpansionModule //copy ten đe xuong day

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AdminProcessModule { }
