import { Component, Input } from '@angular/core';
import { start } from 'repl';

@Component({
  selector: 'app-processing-bar',
  templateUrl: './processing-bar.component.html',
  styleUrls: ['./processing-bar.component.scss']
})
export class ProcessingBarComponent {
  @Input() unitWidth: number = 30;
  @Input() startDateTask: string;
  @Input() endDateTask: string;
  @Input() startDateProcess: string;
  @Input() color: string;

  marginLeft: number;
  widthProcessingBar: number;
  
  ngOnChanges () {
    console.log(this.startDateTask);
    console.log("yyyy, mm, dd", this.startDateTask?.substring(0, 4), ' ',  this.startDateTask?.substring(5, 7), ' ', this.startDateTask?.substring(8, 10));
    let dstartDateTask = new Date(Number(this.startDateTask?.substring(0, 4)), Number(this.startDateTask?.substring(5, 7)), Number(this.startDateTask?.substring(8, 10)));
    let dendDateTask = new Date(Number(this.endDateTask?.substring(0, 4)), Number(this.endDateTask?.substring(5, 7)), Number(this.endDateTask?.substring(8, 10)))
    let dstartDateProcess = new Date(Number(this.startDateProcess?.substring(0, 4)), Number(this.startDateProcess?.substring(5, 7)), Number(this.startDateProcess?.substring(8, 10)));
    console.log("abcd: ", dstartDateProcess, dendDateTask, dstartDateTask);

    console.log("duration: ", this.dateDuration(dstartDateTask, dendDateTask));

    this.marginLeft = this.dateDuration(dstartDateProcess, dstartDateTask) * this.unitWidth;
    this.widthProcessingBar = this.dateDuration(dstartDateTask, dendDateTask) * this.unitWidth;
  }

  constructor() {
    let d1= new Date(2023, 11, 28);
    let d2= new Date(2023, 12, 31);
     // console.log(this.dateDuration(d1, d2));
    //  this.marginLeft = 30;
    //  this.widthProcessingBar = 60;
   
  }

  dateDuration(startDate: Date, endDate: Date) {
    let msStartDate = startDate.getTime();
    let msEndDate = endDate.getTime();
    return Math.ceil((msEndDate-msStartDate)/(24*60*60*1000));
  }
  
}
