import { Component, Inject, Input } from '@angular/core';
import { ProcessDetailComponent } from '../../process-detail.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { Subtask } from 'src/app/core/models/subtask';
import { SubtaskService } from 'src/app/core/services/subtask/subtask.service';
import { ToastBoxModalService } from 'src/app/core/services/toast-box-modal.service';

@Component({
  selector: 'app-notification-box-create-subtask',
  templateUrl: './notification-box-create-subtask.component.html',
  styleUrls: ['./notification-box-create-subtask.component.scss'],
})
export class NotificationBoxCreateSubtaskComponent {

  @Input() taskParentName: string | undefined;
  isLoading: boolean = false;
  isModifying: boolean = false;

  subTaskInfo: any = {
    subTaskName: '',
    subtaskDescription: '',
    taskParentId: ''
  }

  constructor(
    public dialogRef: MatDialogRef<ProcessDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public subtask: Subtask,
    private subtaskSV: SubtaskService,
    private toastSV: ToastBoxModalService
  ) {
     this.subTaskInfo.taskParentId = data.taskId;
  }

  createSubtask() {
    this.subtaskSV.createSubtask(this.subTaskInfo).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.onNoClick();
        this.toastSV.sendMessage({
          isDisplay: true,
          message: "Cập nhật công việc thành công",
          icon: 'success'
        })
      },
      error: (error) => {

      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
