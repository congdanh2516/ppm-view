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
import { NotificationBoxUpdateComponent } from './components/process-detail/notificationBox/notification-box-update/notification-box-update.component';
import { NotificationBoxDeleteComponent } from './components/process-detail/notificationBox/notification-box-delete/notification-box-delete.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NotificationBoxUpdateDateComponent } from './components/process-detail/notificationBox/notification-box-update-date/notification-box-update-date.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NotificationBoxCreateSubtaskComponent } from './components/process-detail/notificationBox/notification-box-create-subtask/notification-box-create-subtask.component';
import { NotificationBoxUpdateSubtaskComponent } from './components/process-detail/notificationBox/notification-box-update-subtask/notification-box-update-subtask.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationBoxMessageComponent } from './components/process-detail/notificationBox/notification-box-message/notification-box-message.component';
import { GranttChartComponent } from './components/grantt-chart/grantt-chart.component';
import { ProcessingBarComponent } from './components/grantt-chart/processing-bar/processing-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AdminProcessComponent,
    ProcessDetailComponent,
    TaskCreationComponent,
    TaskModificationComponent,
    ExampleComponent,
    ProcessCreationComponent,
    NotificationBoxUpdateComponent,
    NotificationBoxDeleteComponent,
    NotificationBoxUpdateDateComponent,
    NotificationBoxCreateSubtaskComponent,
    NotificationBoxUpdateSubtaskComponent,
    NotificationBoxMessageComponent,
    GranttChartComponent,
    ProcessingBarComponent,
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
    SharedModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    HttpClientModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminProcessModule {}
