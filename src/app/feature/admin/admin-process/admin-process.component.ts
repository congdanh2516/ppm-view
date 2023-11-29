import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProcessCreationComponent } from './components/process-creation/process-creation.component';
import { TaskCreationComponent } from './components/task-creation/task-creation.component';
import { AdminProcessService } from './services/admin-process/admin-process.service';

@Component({
  selector: 'app-admin-process',
  templateUrl: './admin-process.component.html',
  styleUrls: ['./admin-process.component.scss']
})
export class AdminProcessComponent {

  processList: Array<any> = [];

  constructor(public dialog: MatDialog, private adminProcessSV: AdminProcessService) {
    this.getProcessList();
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
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProcessList();
    });
  }

  getProcessList() {
    this.adminProcessSV.getProcessList().subscribe((data: any) => {
      this.processList = data;
    })
  }
}
