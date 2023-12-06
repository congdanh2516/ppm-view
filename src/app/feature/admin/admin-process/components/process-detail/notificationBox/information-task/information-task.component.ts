import { Component, Inject } from '@angular/core';
import { ProcessDetailComponent } from '../../process-detail.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/core/services/task/task.service';
import { format } from 'src/app/utils/date-utils';
import { DependencyService } from 'src/app/core/services/dependency/dependency.service';

@Component({
  selector: 'app-information-task',
  templateUrl: './information-task.component.html',
  styleUrls: ['./information-task.component.scss'],
})
export class InformationTaskComponent {
  selectedPrerequisites: any[] = [];
  prerequisiteList: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<ProcessDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskSV: TaskService,
    private dependencySV: DependencyService
  ) {
    this.getTaskById();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  getTaskById() {
    this.taskSV.getTaskById(this.data.taskId).subscribe({
      next: (data: any) => {
        this.data = {
          ...data,
          taskStartAt: data.taskStartAt ? format(data.taskStartAt) : null,
          taskEndAt: data.taskEndAt ? format(data.taskEndAt) : null,
        };
        this.getDependencies(this.data.taskId);
      },
    });
  }

  // getDependencies() {
  //   this.dependencySV.getDependencies().subscribe({
  //     next: (item: any) => {
  //       this.selectedPrerequisites = item;
  //       for (let i = 0; i < this.selectedPrerequisites.length; i++) {
  //         if (this.selectedPrerequisites[i].taskId == this.data.taskId) {
  //           this.taskSV
  //             .getTaskById(this.selectedPrerequisites[i].taskDependentId)
  //             .subscribe({
  //               next: (res) => {
  //                 this.prerequisiteList.push(res);
  //                 console.log('selectedPrerequisites', this.prerequisiteList);
  //               },
  //             });
  //         }
  //       }
  //     },
  //   });
  // }

  getDependencies(taskId: string) {
    this.taskSV.getAllDependencyByTaskId(taskId).subscribe({
      next: (res: any) => {
        console.log('get all dependencies');
        this.prerequisiteList = res;
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }
}
