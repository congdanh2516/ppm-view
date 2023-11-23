import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskCreationComponent } from '../task-creation/task-creation.component'; 
import { TaskModificationComponent } from '../task-modification/task-modification.component';

@Component({
  selector: 'app-process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.scss']
})
export class ProcessDetailComponent {
  constructor(public dialog: MatDialog) {}
  openCreateTaskDialog(): void {
    this.dialog.open(TaskCreationComponent, {
      disableClose: true
    });
  }
  openModifyTaskDialog(): void {
    this.dialog.open(TaskModificationComponent, {
      disableClose: true
    });
  }
  
}
