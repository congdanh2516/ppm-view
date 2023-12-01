import { Component, Inject } from '@angular/core';
import { ProcessDetailComponent } from '../../process-detail.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/core/models/task';
import { TaskService } from 'src/app/core/services/task/task.service';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { ToastBoxModalService } from 'src/app/core/services/toast-box-modal.service';
import { SubtaskService } from 'src/app/core/services/subtask/subtask.service';

@Component({
  selector: 'app-notification-box-delete',
  templateUrl: './notification-box-delete.component.html',
  styleUrls: ['./notification-box-delete.component.scss'],
})
export class NotificationBoxDeleteComponent {

  faTriangleExclamation=faTriangleExclamation;
  isLoading: boolean = false;
  idDeletedTask: string = '';
  isTask: boolean = true; //subtask: false;

  constructor(
    public dialogRef: MatDialogRef<ProcessDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskSV: TaskService,
    private subTaskSV: SubtaskService,
    private toastSV: ToastBoxModalService
  ) {
    this.idDeletedTask = data.taskId !== undefined? data.taskId : data.subTaskId;
    if(data.taskId !== undefined) {
      this.idDeletedTask = data.taskId;
    } else {
      this.idDeletedTask = data.subTaskId;
      this.isTask = false;
    }

    console.log("data: ", this.idDeletedTask);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteTask() {
    this.isLoading = true;
    if(this.isTask) {
      this.taskSV.deleteTask(this.idDeletedTask).subscribe({
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
          this.toastSV.sendMessage({
            isDisplay: true,
            message: "Thất bại. Vui lòng thử lại sau!",
            icon: 'error'
          })
        }
      })
    } else {
      this.subTaskSV.deleteSubtask(this.idDeletedTask).subscribe({
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
          this.toastSV.sendMessage({
            isDisplay: true,
            message: "Thất bại. Vui lòng thử lại sau!",
            icon: 'error'
          })
        }
      })
    }
  }
}
