import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { TaskService } from 'src/app/core/services/task/task.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/core/models/task';
import { ProcessDetailComponent } from '../process-detail/process-detail.component';
import { ToastBoxModalService } from 'src/app/core/services/toast-box-modal.service';

@Component({
  selector: 'app-task-modification',
  templateUrl: './task-modification.component.html',
  styleUrls: ['./task-modification.component.scss'],
})
export class TaskModificationComponent {
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
  prerequisitesBackup: any;
  modificationForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ProcessDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private taskSV: TaskService,
    private toastSV: ToastBoxModalService
  ) {
    this.modificationForm = this.fb.group({
      taskName: [''],
      taskDescription: '',
      taskDuration: []
    })

    this.taskSV.getTaskById(data.taskId).subscribe((task: any) => {
      console.log("taskInfo: ", task);
      this.modificationForm.get('taskName')?.setValue(task.taskName);
      this.modificationForm.get('taskDescription')?.setValue(task.taskDescription);
      this.modificationForm.get('taskDuration')?.setValue(task.taskDuration);
    })
  }

  updateTask() {
    this.isLoading = true;
    let modificationTask: any = this.modificationForm.value;
    modificationTask.taskId = this.data.taskId;
    this.taskSV.updateTask(modificationTask).subscribe({
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
        console.log(error);
        this.toastSV.sendMessage({
          isDisplay: true,
          message: "Thất bại. Vui lòng thử lại sau.",
          icon: 'error'
        })
      }
    })
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
    console.log("prerequiste: ", this.prerequisites);
  }
}
