import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../../models/project';
import { Observable, catchError, tap, throwError } from 'rxjs';

const api = 'http://103.221.220.183:8081/projects';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private httpClient: HttpClient) {}

  getProjectList(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(api).pipe(
      tap((project) => {
        console.log('project', project);
      }),
      catchError(this.handleError)
    );
  }

  getProjectById(projectId: any): Observable<Project> {
    return this.httpClient.get<Project>(`${api}/${projectId}`).pipe(
      tap((project) => {
        console.log('Find project with id successfully', project);
      }),
      catchError(this.handleError)
    );
  }

  createProject(project: Project): Observable<Project> {
    return this.httpClient.post<Project>(api, project).pipe(
      tap((project) => {
        console.log('Create project successfully: ', project);
      }),
      catchError(this.handleError)
    );
  }

  updateProject(project: Project): Observable<Project> {
    return this.httpClient
      .patch<Project>(`${api}/${project.projectId}`, project)
      .pipe(
        tap((project) => {
          console.log('Update project successfully: ', project);
        }),
        catchError(this.handleError)
      );
  }

  deleteProject(projectId: string): Observable<Project> {
    return this.httpClient.delete<Project>(`${api}/${projectId}`).pipe(
      tap((projectId) => {
        console.log('Delete project successfully: ', projectId);
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
