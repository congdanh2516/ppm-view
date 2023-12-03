import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { ToastBoxModalService } from 'src/app/core/services/toast-box-modal.service';
import { AdminProcessComponent } from 'src/app/feature/admin/admin-process/admin-process.component';
import { ProcessDetailComponent } from 'src/app/feature/admin/admin-process/components/process-detail/process-detail.component';
import { AdminProcessService } from 'src/app/feature/admin/admin-process/services/admin-process/admin-process.service';

@Component({
  selector: 'app-notification-delete-process',
  templateUrl: './notification-delete-process.component.html',
  styleUrls: ['./notification-delete-process.component.scss'],
})
export class NotificationDeleteProcessComponent {
  faTriangleExclamation = faTriangleExclamation;
  isLoading = false;
  idDeletedTask: string;
  isTask: boolean;

  constructor(
    public dialogRef: MatDialogRef<AdminProcessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminProcessSV: AdminProcessService,
    private toastSV: ToastBoxModalService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteProcess() {
    this.adminProcessSV
      .deleteProcessById(this.data.projectId)
      .subscribe(() => {});
    this.toastSV.sendMessage({
      isDisplay: true,
      message: 'Xóa quy trình thành công',
      icon: 'success',
    });
    this.dialogRef.close();
  }
}
