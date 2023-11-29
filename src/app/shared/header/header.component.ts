import { Component } from '@angular/core';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/feature/authentication/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faArrowRightFromBracket = faArrowRightFromBracket;

  signOutDialogOpening: boolean;
  signOutDialogOpeningTimeOut: any;

  constructor(private authenticationSV: AuthenticationService) {}

  openSignOutDialog() {
    this.closeSignOutDialogTimeOutOnHover();
    this.signOutDialogOpening === undefined ? this.signOutDialogOpening = true : this.signOutDialogOpening = !this.signOutDialogOpening;
    this.setSignOutDialogTimeOut();
  }

  closeSignOutDialogTimeOutOnHover() {
    clearTimeout(this.signOutDialogOpeningTimeOut);
  }

  setSignOutDialogTimeOut() {
    this.signOutDialogOpeningTimeOut = setTimeout(() => {
      this.signOutDialogOpening = false;
    }, 3000)
  }

  logOut() {
    this.authenticationSV.logOut();
  }
  
}
