import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-task-modification',
  templateUrl: './task-modification.component.html',
  styleUrls: ['./task-modification.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatButtonModule, 
    MatSelectModule, 
    ReactiveFormsModule, 
    MatNativeDateModule, 
    MatDatepickerModule, 
    MatDialogModule,
    CommonModule
  ],
})
export class TaskModificationComponent {
  description: string | undefined;
  data: any;
  tasks = new FormControl('');
  taskList: string[] = ['task-1','task-2','task-3'];
  duration: number | undefined;
  constructor(public dialog: MatDialog) {}
  openTaskModifyDialog() {
    this.dialog.open(TaskModificationComponent, {
      data: {description: this.description, duration: this.duration},
    });
  }
}
