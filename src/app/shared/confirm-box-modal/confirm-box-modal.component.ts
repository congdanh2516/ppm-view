import { Component, Input, SimpleChanges } from '@angular/core';
import { ConfirmBoxModalService } from 'src/app/core/services/confirm-box-modal.service';

@Component({
  selector: 'app-confirm-box-modal',
  templateUrl: './confirm-box-modal.component.html',
  styleUrls: ['./confirm-box-modal.component.scss']
})
export class ConfirmBoxModalComponent {

  @Input()cancel_var: boolean = false;
  @Input()message: any = {title: 'Bạn có muốn xóa công việc này không?', description: 'Công việc sẽ được xóa vĩnh viễn và không thể khôi phục lại'};
  @Input()isLoading: boolean = false;
  @Input()isDisplay: boolean = false;
  approval: boolean = false;
  fadeBackground: boolean = false;

  constructor(private confirmSV: ConfirmBoxModalService) {
    this.confirmSV.getMessage().subscribe(data7 => {
      // console.log("data7: ", data7);
      this.message=data7.message;
      if(data7.action=='close') {
        // console.log("close");
        this.cancel_var=true;
        this.fadeBackground=false;
        setTimeout(() => {
          this.isDisplay=false;
        }, 500);
      } else {
        // console.log("open");
        this.cancel_var=false;
        this.isDisplay=data7.isDisplay;
      }
    })
  } 

  ngOnInit(): void {
    
  }

  cancel() {
    this.confirmSV.sendMessage({
      action:'close',
      acceptance: false
    })
  }

  accept() {
    this.confirmSV.sendMessage({
      action:'close',
      acceptance: true
    })
  }

}
