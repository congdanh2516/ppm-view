import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.scss'],
})
export class ProcessDetailComponent {
  isDisabledName: boolean = true;
  isDisabledInfor: boolean = true;

  removeDisabledName() {
    this.isDisabledName = false;
  }
  removeDisabledInfor() {
    this.isDisabledInfor = false;
  }

  @ViewChild(MatMenuTrigger)
  trigger!: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }
}
