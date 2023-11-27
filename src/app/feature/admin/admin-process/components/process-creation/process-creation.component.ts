import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-process-creation',
  templateUrl: './process-creation.component.html',
  styleUrls: ['./process-creation.component.scss']
})
export class ProcessCreationComponent {

  date : any = new Date();
  processCreationForm: FormGroup;
  
  constructor(private fb: FormBuilder,  public dialogRef: MatDialogRef<ProcessCreationComponent>) {
    this.date = this.date.getFullYear() + '-' + this.date.getMonth() + '-' + this.date.getDate();
  
    this.processCreationForm = this.fb.group({
      processName: ['', [Validators.required]],
      description: [''],
      startDate: [this.date]
    })
  }

  createProcess() {}

  onNoclick() {
    this.dialogRef.close();
  }
}
