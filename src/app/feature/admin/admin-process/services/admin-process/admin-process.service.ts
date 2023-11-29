import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminProcessService {

  constructor(private httpClient: HttpClient) { }

  getProcessList() {
    let api: string = environment.url + "projects?isTemplate=true";
    return this.httpClient.get(api)
            .pipe(
              tap((data) => {
                console.log("data: ", data);
              }),
              catchError(this.handleError)
            )
          
  }

  createProcess(newProcess: any) {
    let api: string = environment.url + "projects";
    return this.httpClient.post(api, newProcess);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
