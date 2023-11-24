import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Task } from 'src/app/core/models/task';
import { TaskService } from 'src/app/core/services/task/task.service';
import { Project } from 'src/app/core/models/project';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotificationBoxDeleteComponent } from './notificationBox/notification-box-delete/notification-box-delete.component';
import { NotificationBoxUpdateComponent } from './notificationBox/notification-box-update/notification-box-update.component';

@Component({
  selector: 'app-process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.scss'],
})
export class ProcessDetailComponent implements OnInit {
  isDisabledName: boolean = true;
  isDisabledInfor: boolean = true;

  removeDisabledName() {
    if (this.isDisabledName) {
      this.isDisabledName = false;
    } else {
      this.isDisabledName = true;
    }
  }

  removeDisabledInfor() {
    if (this.isDisabledInfor) {
      this.isDisabledInfor = false;
    } else {
      this.isDisabledInfor = true;
    }
  }

  @ViewChild(MatMenuTrigger)
  trigger!: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }

  @Input() project: Project;
  @Input() tasklist: Task[] = [];
  @Input() projectList: Project[] = [];

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  private detectChanges(): void {
    this.route.params.subscribe((params: any) => {
      this.getProjectById(params.id);
    });
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.getProjectById(params.id);
    });
    this.getTaskList();
    this.getProjectList();
  }
  getTaskList() {
    this.taskService.getTaskList().subscribe({
      next: (task: any) => {
        this.tasklist = task;
        console.log('call api get all tasks successfully!');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getProjectList() {
    this.projectService.getProjectList().subscribe({
      next: (project: any) => {
        this.projectList = project;
        console.log('call api get all projects successfully!');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getProjectById(projectId: string) {
    this.projectService.findProjectById(projectId).subscribe({
      next: (project: any) => {
        this.project = project;
        console.log('call api find project by id successfully', project);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteDialogTask(task: Task): void {
    const dialogRef = this.dialog.open(NotificationBoxDeleteComponent, {
      width: '500px',
      data: {
        taskId: task.taskId,
        taskName: task.taskName,
      },
    });
    dialogRef.afterClosed().subscribe((response) => {
      console.log('Dialog closed with result:', response.taskId);
      this.taskService.deleteTask(response.taskId).subscribe(() => {
        this.tasklist = this.tasklist.filter(
          (task) => task.taskId !== response.taskId
        );
        console.log('taskList handle delete' + this.tasklist);
        this.route.params.subscribe((params: any) => {
          this.getProjectById(params.id);
        });
      });
    });
  }

  updateDialogProject(project: Project) {
    const dialogRef = this.dialog.open(NotificationBoxUpdateComponent, {
      width: '500px',
      data: {
        projectName: project.projectName,
        projectId: project.projectId,
      },
    });
    dialogRef.afterClosed().subscribe((response) => {
      console.log('updated project successfully: ' + response);
      this.projectService.updateProject(response).subscribe(() => {
        console.log('handle update successfully:' + this.project);
        this.route.params.subscribe((params: any) => {
          this.getProjectById(params.id);
        });
      });
    });
    this.detectChanges();
  }

  handleUpdateName(event: Event): void {
    if (!this.isDisabledName) {
      this.project.projectName = (event.target as HTMLInputElement).value;
      this.isDisabledName = true;
      this.updateDialogProject(this.project);
    }
  }
  handleUpdateInfor(event: Event): void {
    if (!this.isDisabledInfor) {
      this.project.projectStartAt = (event.target as HTMLInputElement).value;
      this.isDisabledInfor = true;
      this.updateProject(this.project);
    }
  }

  handleDelete(projectId: string) {
    this.deleteTask(projectId);
  }

  updateProject(project: Project) {
    this.projectService.updateProject(project).subscribe({
      next: (project: any) => {
        this.project = project;
        this.route.params.subscribe((params: any) => {
          this.getProjectById(params.id);
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  deleteTask(projectId: string) {
    this.taskService.deleteTask(projectId).subscribe({
      next: (project: any) => {
        this.project = project;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
