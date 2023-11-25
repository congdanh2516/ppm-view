import { Component, Inject } from '@angular/core';
import { ProcessDetailComponent } from '../../process-detail.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { Project } from 'src/app/core/models/project';

@Component({
  selector: 'app-notification-box-update-date',
  templateUrl: './notification-box-update-date.component.html',
  styleUrls: ['./notification-box-update-date.component.scss'],
})
export class NotificationBoxUpdateDateComponent {
  constructor(
    public dialogRef: MatDialogRef<ProcessDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project,
    private projectService: ProjectService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
