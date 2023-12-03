import { Component, Inject } from '@angular/core';
import { ProcessDetailComponent } from '../../process-detail.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubtaskService } from 'src/app/core/services/subtask/subtask.service';

@Component({
  selector: 'app-information-subtask',
  templateUrl: './information-subtask.component.html',
  styleUrls: ['./information-subtask.component.scss'],
})
export class InformationSubtaskComponent {
  constructor(
    public dialogRef: MatDialogRef<ProcessDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subTaskSV: SubtaskService
  ) {
    this.getSubtaskById();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getSubtaskById() {
    this.subTaskSV.getSubtaskById(this.data.subtaskId).subscribe({
      next: (data: any) => {
        this.data = data;
        console.log('test result', this.data);
      },
    });
  }
}
