import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { ProcessDetailComponent } from '../../process-detail.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subtask } from 'src/app/core/models/subtask';

@Component({
  selector: 'app-notification-box-update-subtask',
  templateUrl: './notification-box-update-subtask.component.html',
  styleUrls: ['./notification-box-update-subtask.component.scss'],
})
export class NotificationBoxUpdateSubtaskComponent {
  @Output() updateData: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelUpdate: EventEmitter<void> = new EventEmitter<void>();
  @Input() taskParentName: string | undefined;
  constructor(
    public dialogRef: MatDialogRef<ProcessDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public subtask: Subtask
  ) {
    this.taskParentName = data.taskName;
    this.subtask = data.subtask;
  }

  onCancelClick() {
    this.cancelUpdate.emit();
  }
}
