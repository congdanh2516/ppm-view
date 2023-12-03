import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subtask } from '../../models/subtask';
import { Observable, catchError, tap, throwError } from 'rxjs';

const api = 'http://103.221.220.183:8081/subtasks';

@Injectable({
  providedIn: 'root',
})
export class SubtaskService {
  constructor(private httpClient: HttpClient) {}

  getSubtaskById(subtaskId: string) {
    return this.httpClient.get(`${api}/${subtaskId}`);
  }

  createSubtask(subtask: Subtask): Observable<Subtask> {
    return this.httpClient.post<Subtask>(api, subtask).pipe(
      tap((subtask) => {
        console.log('Create task successfully:', subtask);
      }),
      catchError(this.handleError)
    );
  }

  updateSubtask(subtask: Subtask): Observable<Subtask> {
    return this.httpClient
      .patch<Subtask>(`${api}/${subtask.subTaskId}`, subtask)
      .pipe(
        tap((subtask) => {
          console.log('Updated task successfully:', subtask);
        }),
        catchError(this.handleError)
      );
  }

  deleteSubtask(subtaskId: string): Observable<Subtask> {
    return this.httpClient.delete<Subtask>(`${api}/${subtaskId}`).pipe(
      tap((subTaskId) => {
        console.log(`Delete task ${subTaskId} successfully`);
      })
    );
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
