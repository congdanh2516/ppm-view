import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProcessDetailComponent } from '../../process-detail.component';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { Project } from 'src/app/core/models/project';

@Component({
  selector: 'app-notification-box-update',
  templateUrl: './notification-box-update.component.html',
  styleUrls: ['./notification-box-update.component.scss'],
})
export class NotificationBoxUpdateComponent {
  constructor(
    public dialogRef: MatDialogRef<ProcessDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project,
    private projectService: ProjectService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
