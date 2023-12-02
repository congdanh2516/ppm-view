import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProcessDetailComponent } from '../process-detail/process-detail.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { TaskService } from 'src/app/core/services/task/task.service';
import { AdminProcessService } from '../../services/admin-process/admin-process.service';
import { ToastBoxModalService } from 'src/app/core/services/toast-box-modal.service';

@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.scss'],
})
export class TaskCreationComponent {
  prerequisitesList: string[] = [
    'task 1 abcdefshjadg',
    'task 2',
    'task 3',
    'task 4',
    'task 5',
    'task 5',
    'task 5',
    'task 5',
    'task 5',
    'task 5',
  ];

  prerequisites = new FormControl<string[]>([]);
  creationForm: FormGroup;
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<ProcessDetailComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminProcessSV: AdminProcessService,
    private toastSV: ToastBoxModalService
  ) {
    console.log('datata: ', data);
    this.creationForm = this.fb.group({
      taskName: ['', [Validators.required]],
      taskDescription: [''],
      taskDuration: [],
      projectId: this.data.projectId,
    });
  }

  creatTask() {
    this.isLoading = true;
    this.adminProcessSV
      .createTask(this.creationForm.value)
      .subscribe((data: any) => {
        this.adminProcessSV
          .scheduleProcess(this.data.projectId)
          .subscribe((data2) => {
            console.log('schedule: ', data2);
          });
        this.toastSV.sendMessage({
          isDisplay: true,
          message: 'Thêm công viêc thành công',
          icon: 'success',
        });
        setTimeout(() => {
          this.onNoClick();
          this.isLoading = false;
        }, 2000);
      });
  }

  removeTopping(prerequisites: string): void {
    if (prerequisites !== null) {
      const currentValues = this.prerequisites.value;

      if (Array.isArray(currentValues)) {
        const index = currentValues.indexOf(prerequisites);

        if (index >= 0) {
          const newPrerequisites = [...currentValues];
          newPrerequisites.splice(index, 1);
          this.prerequisites.setValue(newPrerequisites);
        }
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  showOption() {
    console.log('prerequiste: ', this.prerequisites);
  }
}
