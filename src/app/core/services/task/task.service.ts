import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Task } from '../../models/task';
import { format } from 'src/app/utils/date-utils';
import { Subtask } from '../../models/subtask';

const api = 'http://103.221.220.183:8081/tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private httpClient: HttpClient) {}

  getTaskList(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(api).pipe(
      tap((task) => {
        console.log('Successfully retrieved: ', task);
      }),
      catchError(this.handleError)
    );
  }

  getTaskById(taskId: string): Observable<Task> {
    return this.httpClient.get<Task>(`${api}/${taskId}`).pipe(
      tap((taskId) => {
        console.log('Find task with id successfully', taskId);
      }),
      catchError(this.handleError)
    );
  }

  createTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(api, task).pipe(
      tap((task) => {
        console.log('Create task successfully:', task);
      }),
      catchError(this.handleError)
    );
  }

  updateTask(task: Task): Observable<Task> {
    return this.httpClient.patch<Task>(`${api}/${task.taskId}`, task).pipe(
      tap((task) => {
        console.log('Updated task successfully:', task);
      }),
      catchError(this.handleError)
    );
  }

  deleteTask(taskId: string): Observable<Task> {
    return this.httpClient.delete<Task>(`${api}/${taskId}`).pipe(
      tap((taskId) => {
        console.log(`Delete task ${taskId} successfully`);
      })
    );
  }

  getSubtaskList(taskId: string): Observable<Subtask[]> {
    return this.httpClient.get<Subtask[]>(`${api}/${taskId}/subtasks`).pipe(
      tap((subTasks) => {
        console.log('Successfully retrieved subtask by taskId: ', subTasks);
      }),
      catchError(this.handleError)
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
