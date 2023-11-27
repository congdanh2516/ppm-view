import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input()color: string = '#232b38';
  @Input()size: string = '70px';

  constructor() { }

  ngOnInit(): void {
  }

}
