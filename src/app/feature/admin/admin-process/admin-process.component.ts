import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProcessCreationComponent } from './components/process-creation/process-creation.component';
import { TaskCreationComponent } from './components/task-creation/task-creation.component';

@Component({
  selector: 'app-admin-process',
  templateUrl: './admin-process.component.html',
  styleUrls: ['./admin-process.component.scss']
})
export class AdminProcessComponent {
  constructor(public dialog: MatDialog) {
    // this.openCreationProcessDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskCreationComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openCreationProcessDialog() {
    const dialogRef = this.dialog.open(ProcessCreationComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
