import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.scss'],
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
}
