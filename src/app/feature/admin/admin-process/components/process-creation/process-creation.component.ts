import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/feature/authentication/services/authentication.service';
import { AdminProcessService } from '../../services/admin-process/admin-process.service';

@Component({
  selector: 'app-process-creation',
  templateUrl: './process-creation.component.html',
  styleUrls: ['./process-creation.component.scss']
})
export class ProcessCreationComponent {

  date : any = new Date();
  processCreationForm: FormGroup;
  isLoading: boolean = false;
  
  constructor(private fb: FormBuilder, 
              public dialogRef: MatDialogRef<ProcessCreationComponent>, 
              private authenSV: AuthenticationService,
              private adminProcessSV: AdminProcessService
  ) {
    this.date = this.date.getFullYear() + '-' + this.date.getMonth() + '-' + this.date.getDate();
  
    this.processCreationForm = this.fb.group({
      projectName: ['', [Validators.required]],
      // description: [''],
      projectDuration: [90],
      projectStartAt: [this.date],
      projectCreatorId: ['']
    })
  }

  createProcess() {
    this.isLoading=true;
    this.processCreationForm.get('projectCreatorId')?.setValue(this.authenSV.userId);
    console.log("abc: ", this.processCreationForm.value);
    this.adminProcessSV.createProcess(this.processCreationForm.value).subscribe({
      next: (data) => {
        console.log("creation task: ", data);
        setTimeout(() => {
          this.isLoading=false;
          this.onNoclick();
        }, 2000)
      },
      error: (error) => {
        console.log("error: ", error)
      }
    })
  }

  onNoclick() {
    this.dialogRef.close();
  }
}
