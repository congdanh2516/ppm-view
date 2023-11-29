import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { ToastBoxModalService } from 'src/app/core/services/toast-box-modal.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  faUser = faUser;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  hiddenPassword: boolean = true;
  signInForm: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private authentocationSV: AuthenticationService,
              private toastSV: ToastBoxModalService
  ) {
    this.signInForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  signIn() {
    this.isLoading=true;
    this.authentocationSV.signIn(this.signInForm.value).subscribe({
      next: (personalInfo) => {
        this.isLoading=false;
        console.log("personalInfo: ", personalInfo);
      },
      error: () => {
        console.log("Loi");
      }
    })
  }
}
