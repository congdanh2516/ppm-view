import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification-box-message',
  templateUrl: './notification-box-message.component.html',
  styleUrls: ['./notification-box-message.component.scss'],
})
export class NotificationBoxMessageComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
