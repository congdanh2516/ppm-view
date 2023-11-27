import { Component, Input } from '@angular/core';

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


  
}
