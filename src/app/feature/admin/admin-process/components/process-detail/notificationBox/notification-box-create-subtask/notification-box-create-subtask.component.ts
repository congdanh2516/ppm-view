import { Component, Inject, Input } from '@angular/core';
import { ProcessDetailComponent } from '../../process-detail.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { Subtask } from 'src/app/core/models/subtask';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-notification-box-create-subtask',
  templateUrl: './notification-box-create-subtask.component.html',
  styleUrls: ['./notification-box-create-subtask.component.scss'],
})
export class NotificationBoxCreateSubtaskComponent {
  @Input() taskParentName: string | undefined;
  constructor(
    public dialogRef: MatDialogRef<ProcessDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public subtask: Subtask,
    private projectService: ProjectService
  ) {
    this.taskParentName = data.taskName;
    subtask.taskParentId = data.taskId;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
