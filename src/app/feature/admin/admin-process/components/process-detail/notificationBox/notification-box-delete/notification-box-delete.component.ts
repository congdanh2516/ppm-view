import { Component, Inject } from '@angular/core';
import { ProcessDetailComponent } from '../../process-detail.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/core/models/task';
import { TaskService } from 'src/app/core/services/task/task.service';

@Component({
  selector: 'app-notification-box-delete',
  templateUrl: './notification-box-delete.component.html',
  styleUrls: ['./notification-box-delete.component.scss'],
})
export class NotificationBoxDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<ProcessDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private taskService: TaskService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
