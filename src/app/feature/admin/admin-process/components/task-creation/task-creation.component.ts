import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProcessDetailComponent } from '../process-detail/process-detail.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { TaskService } from 'src/app/core/services/task/task.service';

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

  constructor(
    public dialogRef: MatDialogRef<ProcessDetailComponent>,
    private fb: FormBuilder
  ) {
    this.creationForm = this.fb.group({

    })
  }

  creatTask() {
    
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
