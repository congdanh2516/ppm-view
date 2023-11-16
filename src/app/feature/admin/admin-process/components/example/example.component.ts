import { Component } from '@angular/core';

import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {

  panelOpenState = false;

  tempAvatar = faCircleUser;

}
