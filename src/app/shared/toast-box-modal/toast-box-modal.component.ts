import { Component, Input } from '@angular/core';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toast-box-modal',
  templateUrl: './toast-box-modal.component.html',
  styleUrls: ['./toast-box-modal.component.scss']
})
export class ToastBoxModalComponent {

  faCircleCheck=faCircleCheck;
  faCircleExclamation=faCircleExclamation;

  @Input()icon: string = "success";
  @Input()message: string = 'abc';
  constructor() { }
  

  ngOnInit(): void {
  }
  
}
