import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProcessDetailComponent } from '../../process-detail.component';
import { TaskService } from 'src/app/core/services/task/task.service';
import { SubtaskService } from 'src/app/core/services/subtask/subtask.service';
import { ToastBoxModalService } from 'src/app/core/services/toast-box-modal.service';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notification-box-delete',
  templateUrl: './notification-box-delete.component.html',
  styleUrls: ['./notification-box-delete.component.scss'],
})
export class NotificationBoxDeleteComponent {
  faTriangleExclamation = faTriangleExclamation;
  isLoading = false;
  idDeletedTask: string;
  isTask: boolean;

  constructor(
    public dialogRef: MatDialogRef<ProcessDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private subtaskService: SubtaskService,
    private toastService: ToastBoxModalService
  ) {
    this.idDeletedTask =
      data.taskId !== undefined ? data.taskId : data.subTaskId;
    this.isTask = data.taskId !== undefined;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteTask() {
    this.isLoading = true;
    this.isTask
      ? this.taskService.deleteTask(this.idDeletedTask).subscribe({
          next: (res) => {
            this.isLoading = false;
            this.toastService.sendMessage({
              isDisplay: true,
              message: 'Xóa công việc thành công',
              icon: 'success',
            });
          },
          error: (error) => {
            console.log(error);
            this.toastService.sendMessage({
              isDisplay: true,
              message: 'Thất bại. Vui lòng thử lại sau!',
              icon: 'error',
            });
          },
          complete: () => {
            this.dialogRef.close;
          },
        })
      : this.subtaskService.deleteSubtask(this.idDeletedTask).subscribe({
          next: (res) => {
            this.isLoading = false;
            this.toastService.sendMessage({
              isDisplay: true,
              message: 'Xóa tiêu chí thành công',
              icon: 'success',
            });
          },
          error: (error) => {
            console.log(error);
            this.toastService.sendMessage({
              isDisplay: true,
              message: 'Thất bại. Vui lòng thử lại sau!',
              icon: 'error',
            });
          },
          complete: () => {
            this.dialogRef.close;
          },
        });
  }
}
