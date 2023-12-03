import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/core/services/task/task.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Task } from 'src/app/core/models/task';
import { ProcessDetailComponent } from '../process-detail/process-detail.component';
import { ToastBoxModalService } from 'src/app/core/services/toast-box-modal.service';
import { Dependency } from 'src/app/core/models/dependency';
import { DependencyService } from 'src/app/core/services/dependency/dependency.service';

@Component({
  selector: 'app-task-modification',
  templateUrl: './task-modification.component.html',
  styleUrls: ['./task-modification.component.scss'],
})
export class TaskModificationComponent {
  prerequisitesList: any[] = [];
  selectedPrerequisites: any[] = [];
  prerequisites = new FormControl<any[]>([]);
  prerequisitesBackup: any;
  modificationForm: FormGroup;
  isLoading: boolean = false;
  dependency: Dependency;
  tmp: any;
  prerequisiteList: any[] = [];
  prerequisiteIdList: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ProcessDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private taskSV: TaskService,
    private toastSV: ToastBoxModalService,
    private dependencySV: DependencyService
  ) {
    this.modificationForm = this.fb.group({
      taskName: [''],
      taskDescription: '',
      taskDuration: [],
    });
    this.createDependency();
    this.getDependencies();

    this.taskSV.getTaskById(data.taskId).subscribe((task: any) => {
      console.log('taskInfo: ', task);
      this.modificationForm.get('taskName')?.setValue(task.taskName);
      this.modificationForm
        .get('taskDescription')
        ?.setValue(task.taskDescription);
      this.modificationForm.get('taskDuration')?.setValue(task.taskDuration);
    });
    this.getTaskByProjectId();
  }

  updateTask() {
    this.isLoading = true;
    let modificationTask: any = this.modificationForm.value;
    modificationTask.taskId = this.data.taskId;
    this.taskSV.updateTask(modificationTask).subscribe({
      next: (res) => {
        this.createDependency();
        setTimeout(() => {
          this.onNoClick();
          this.isLoading = false;
        }, 2000);
        this.toastSV.sendMessage({
          isDisplay: true,
          message: 'Cập nhật công việc thành công',
          icon: 'success',
        });
      },
      error: (error) => {
        console.log(error);
        this.toastSV.sendMessage({
          isDisplay: true,
          message: 'Thất bại. Vui lòng thử lại sau.',
          icon: 'error',
        });
      },
    });
  }

  removeTopping(selectedPrerequisite: any): void {
    if (selectedPrerequisite !== null) {
      const currentValues = this.prerequisites.value;

      if (Array.isArray(currentValues)) {
        const index = currentValues.indexOf(selectedPrerequisite);

        if (index >= 0) {
          const newPrerequisites = [...currentValues];
          newPrerequisites.splice(index, 1);
          this.prerequisites.setValue(newPrerequisites);
        }
      }
    }
  }

  onNoClick(): void {
    this.data = 'abc';
    this.dialogRef.close();
  }

  showOption() {
    console.log('prerequiste: ', this.prerequisites);
  }

  getTaskByProjectId() {
    this.taskSV.getTaskListByProjectId(this.data.projectId).subscribe({
      next: (data: any) => {
        this.prerequisitesList = this.prerequisitesList.concat(
          data
            .filter((item: any) => item.taskId !== this.data.taskId)
            .map((item: any) => {
              return { taskId: item.taskId, taskName: item.taskName };
            })
        );
      },
    });
  }

  createDependency() {
    if (this.prerequisites.value && this.prerequisites.value.length > 0) {
      this.prerequisites.value.forEach((item: any) => {
        const newDependency = {
          dependencyType: 'FS',
          taskId: this.data.taskId,
          dependentTaskId: item.taskId,
        };
        console.log('Dependency:', newDependency);
        this.dependencySV.createDependency(newDependency);
      });
    } else {
      console.warn('Không có prerequisites nào được chọn.');
    }
  }

  getDependencies() {
    this.dependencySV.getDependencies().subscribe({
      next: (item: any) => {
        this.selectedPrerequisites = item;
        console.log("item length ", item.length);
        for (let i = 0; i < this.selectedPrerequisites.length; i++) {
          console.log(i);
          if (this.selectedPrerequisites[i].taskId == this.data.taskId) {
            console.log("call api times: ");
            this.taskSV
              .getTaskById(this.selectedPrerequisites[i].taskDependentId)
              .subscribe({
                next: (res: any) => {
                  console.log('res: ', res);
                  // this.prerequisiteList.push({ ...res });
                  // console.log('task id: ', this.prerequisiteList);
                  this.prerequisiteIdList.push({ ...res }.taskId);
                  console.log('test finished', this.prerequisiteIdList);
                  // console.log('selectedPrerequisites', this.prerequisiteList);
                  // this.prerequisites.setValue([...this.prerequisiteList]);
                  // console.log('prerequisites', this.prerequisites);
                },
              });
          }
        }
      },
    });
  }
}
