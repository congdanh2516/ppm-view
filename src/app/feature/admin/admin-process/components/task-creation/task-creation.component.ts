import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.scss'],
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
export class TaskCreationComponent {
  name: string | undefined;
  description: string | undefined;
  data: any;
  tasks = new FormControl('');
  taskList: string[] = ['task-1','task-2','task-3'];
  duration: number | undefined;
  constructor(public dialog: MatDialog) {}
  openCreateTaskDialog() {
    this.dialog.open(TaskCreationComponent, {
      data: {name: this.name, description: this.description, duration: this.duration},
      disableClose: true
    });
  }
  closeCreateTaskDialog(){
    this.dialog.closeAll();
  }
}
