import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  signIn() {
    this.router.navigateByUrl("/admin/process/list");
  }

  logOut() {
    this.router.navigateByUrl("/sign-in");
  }
}
