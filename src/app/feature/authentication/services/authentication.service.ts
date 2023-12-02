import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ToastBoxModalService } from 'src/app/core/services/toast-box-modal.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userId: string = '';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastSV: ToastBoxModalService,
    private localStorageSV: LocalStorageService
  ) {}

  signIn(account: any) {
    let api: string = environment.url + 'user/login';
    let accountCode = btoa(account.username + ':' + account.password);
    let header = new HttpHeaders().set('Authorization', `Basic ${accountCode}`);
    return this.httpClient.get(api, { headers: header }).pipe(
      tap((data: any) => {
        this.localStorageSV.setItem('name', data.username);
        this.userId = data.userId;
        this.router.navigateByUrl('/admin/process/list');
        this.toastSV.sendMessage({
          isDisplay: true,
          message: 'Đăng nhập thành công',
          icon: 'success',
        });
      }),
      catchError((): any => {
        this.toastSV.sendMessage({
          isDisplay: true,
          message: 'Lỗi. VUi lòng thử lại sau!',
          icon: 'error',
        });
      })
    );
  }

  logOut() {
    this.router.navigateByUrl('/sign-in');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
