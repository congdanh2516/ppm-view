import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProcessDetailComponent } from '../../process-detail.component';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { Project } from 'src/app/core/models/project';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { ToastBoxModalService } from 'src/app/core/services/toast-box-modal.service';

@Component({
  selector: 'app-notification-box-update',
  templateUrl: './notification-box-update.component.html',
  styleUrls: ['./notification-box-update.component.scss'],
})
export class NotificationBoxUpdateComponent {
  faTriangleExclamation = faTriangleExclamation;
  isLoading: boolean = false;
  idDeletedTask: string = '';
  isTask: boolean = true; //subtask: false;

  constructor(
    public dialogRef: MatDialogRef<ProcessDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project,
    private projectService: ProjectService,
    private toastSV: ToastBoxModalService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateProject(): void {
    this.isLoading = false;
    this.projectService.updateProject(this.data).subscribe((data: any) => {
      this.data = data;
      this.toastSV.sendMessage({
        isDisplay: true,
        message: 'Cập nhật tên quy trình thành công',
        icon: 'success',
      });
    });
    this.dialogRef.close();
  }
}
