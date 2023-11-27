import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { TaskService } from 'src/app/core/services/task/task.service';
import { FormControl } from '@angular/forms';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-task-modification',
  templateUrl: './task-modification.component.html',
  styleUrls: ['./task-modification.component.scss'],
})
export class TaskModificationComponent {
  @Input() task: Task;

  prerequisitesList: string[] = [];

  prerequisites = new FormControl<string[]>([]);

  constructor(
    public dialogRef: MatDialogRef<TaskModificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService,
    private taskService: TaskService
  ) {
    this.task = this.data.task;
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
    this.dialogRef.close({
      task: this.task,
    });
  }
}
