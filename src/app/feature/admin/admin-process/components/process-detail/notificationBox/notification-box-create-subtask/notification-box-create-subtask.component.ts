import { Component, Inject, Input } from '@angular/core';
import { ProcessDetailComponent } from '../../process-detail.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    description: '',
    taskParentId: '',
  };

  constructor(
    public dialogRef: MatDialogRef<ProcessDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subtaskSV: SubtaskService,
    private toastSV: ToastBoxModalService
  ) {
    console.log('data sub task: ', data);
    this.subTaskInfo.taskParentId = data.taskId;
    if (data.subtask != undefined) this.isModifying = true;
    if (this.isModifying) {
      console.log('subtask: ', data.subtask);
      this.subTaskInfo.taskParentId = data.task.taskId;
      this.subTaskInfo.subTaskName = data.subtask?.subTaskName;
      this.subTaskInfo.description = data.subtask.subTaskDescription;
      this.subTaskInfo.subTaskId = data.subtask?.subTaskId;
      console.log('aaa: ', this.subTaskInfo);
    }
  }

  submit() {
    if (this.isModifying) {
      this.updateSubtask();
    } else {
      this.createSubtask();
    }
  }

  createSubtask() {
    this.subtaskSV.createSubtask(this.subTaskInfo).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log('screat subtask: ', res);
        this.onNoClick();
        this.toastSV.sendMessage({
          isDisplay: true,
          message: 'Thêm tiêu chí thành công',
          icon: 'success',
        });
      },
      error: (error) => {
        this.toastSV.sendMessage({
          isDisplay: true,
          message: 'Thất bại. Vui lòng thử lại sau',
          icon: 'error',
        });
      },
    });
  }

  updateSubtask() {
    this.subtaskSV.updateSubtask(this.subTaskInfo).subscribe({
      next: (res) => {
        this.toastSV.sendMessage({
          isDisplay: true,
          message: 'Cập nhật công việc thành công',
          icon: 'success',
        });
      },
      error: (error) => {
        this.toastSV.sendMessage({
          isDisplay: true,
          message: 'Thất bại. Vui lòng thử lại sau',
          icon: 'error',
        });
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
