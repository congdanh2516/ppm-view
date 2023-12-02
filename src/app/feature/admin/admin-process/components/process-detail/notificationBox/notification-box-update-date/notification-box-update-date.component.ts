import { Component, Inject } from '@angular/core';
import { ProcessDetailComponent } from '../../process-detail.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { Project } from 'src/app/core/models/project';
import { format } from '../../../../../../../utils/date-utils';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { ToastBoxModalService } from 'src/app/core/services/toast-box-modal.service';

@Component({
  selector: 'app-notification-box-update-date',
  templateUrl: './notification-box-update-date.component.html',
  styleUrls: ['./notification-box-update-date.component.scss'],
})
export class NotificationBoxUpdateDateComponent {
  faTriangleExclamation = faTriangleExclamation;
  isLoading: boolean = false;
  idDeletedTask: string = '';
  isTask: boolean = true; //subtask: false;
  name: any = format(this.data.projectStartAt);

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
    this.projectService.updateProject(this.data).subscribe((data: any) => {
      this.data = data;
      this.toastSV.sendMessage({
        isDisplay: true,
        message: 'Cập nhật ngày quy trình thành công',
        icon: 'success',
      });
    });
    this.dialogRef.close();
  }
}
