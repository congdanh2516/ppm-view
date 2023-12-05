import { Component } from '@angular/core';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { AuthenticationService } from 'src/app/feature/authentication/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  faArrowRightFromBracket = faArrowRightFromBracket;

  signOutDialogOpening: boolean;
  signOutDialogOpeningTimeOut: any;
  username: string = '';
  today: Date;
  todayStr: string = '';
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor(
    private authenticationSV: AuthenticationService,
    private localStorageSV: LocalStorageService
  ) {
    this.username = this.localStorageSV.getItem('name');
    this.today = new Date();
    this.todayStr =
      (this.today.getDate() < 10
        ? '0' + this.today.getDate()
        : this.today.getDate()) +
      ' ' +
      this.monthNames[this.today.getMonth()] +
      ', ' +
      this.today.getFullYear();
    console.log(this.today);
  }

  openSignOutDialog() {
    this.closeSignOutDialogTimeOutOnHover();
    this.signOutDialogOpening === undefined
      ? (this.signOutDialogOpening = true)
      : (this.signOutDialogOpening = !this.signOutDialogOpening);
    this.setSignOutDialogTimeOut();
  }

  closeSignOutDialogTimeOutOnHover() {
    clearTimeout(this.signOutDialogOpeningTimeOut);
  }

  setSignOutDialogTimeOut() {
    this.signOutDialogOpeningTimeOut = setTimeout(() => {
      this.signOutDialogOpening = false;
    }, 3000);
  }

  logOut() {
    this.authenticationSV.logOut();
  }
}
