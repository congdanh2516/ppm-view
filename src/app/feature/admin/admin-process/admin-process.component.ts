import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskCreationComponent } from './components/task-creation/task-creation.component';

@Component({
  selector: 'app-admin-process',
  templateUrl: './admin-process.component.html',
  styleUrls: ['./admin-process.component.scss']
})
export class AdminProcessComponent {
  constructor(public dialog: MatDialog) {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskCreationComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
