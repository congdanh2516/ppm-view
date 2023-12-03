import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProcessCreationComponent } from './components/process-creation/process-creation.component';
import { TaskCreationComponent } from './components/task-creation/task-creation.component';
import { AdminProcessService } from './services/admin-process/admin-process.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ToastBoxModalService } from 'src/app/core/services/toast-box-modal.service';
import { truncateString } from 'src/app/utils/truncateString';
import { NotificationDeleteProcessComponent } from 'src/app/shared/notification-delete-process/notification-delete-process.component';

@Component({
  selector: 'app-admin-process',
  templateUrl: './admin-process.component.html',
  styleUrls: ['./admin-process.component.scss'],
})
export class AdminProcessComponent {
  processList: Array<any> = [];

  constructor(
    public dialog: MatDialog,
    private adminProcessSV: AdminProcessService,
    private router: Router,
    private localStorageSV: LocalStorageService,
    private toastSV: ToastBoxModalService
  ) {
    this.getProcessList();
  }

  handleOnClick(event: Event): void {
    event.stopPropagation();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskCreationComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openCreationProcessDialog() {
    const dialogRef = this.dialog.open(ProcessCreationComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getProcessList();
    });
  }

  getProcessList() {
    this.adminProcessSV.getProcessList().subscribe((data: any) => {
      this.processList = data.map((item: any) => ({
        ...item,
        projectName: truncateString(item.projectName, 15),
      }));
    });
  }

  openDetail(projectId: any) {
    this.router.navigateByUrl(`/admin/process/list/${projectId}`);
    this.localStorageSV.setItem('project', { projectId: projectId });
  }

  deleteProcess(project: any): void {
    const dialogRef = this.dialog.open(NotificationDeleteProcessComponent, {
      data: {
        projectId: project.projectId,
        projectName: project.projectName,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getProcessList();
    });
  }
}
