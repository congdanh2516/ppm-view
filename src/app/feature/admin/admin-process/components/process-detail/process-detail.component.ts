import { Component, Input, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Task } from 'src/app/core/models/task';
import { TaskService } from 'src/app/core/services/task/task.service';
import { Project } from 'src/app/core/models/project';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotificationBoxDeleteComponent } from './notificationBox/notification-box-delete/notification-box-delete.component';
import { NotificationBoxUpdateComponent } from './notificationBox/notification-box-update/notification-box-update.component';
import { TaskCreationComponent } from '../task-creation/task-creation.component';
import { NotificationBoxUpdateDateComponent } from './notificationBox/notification-box-update-date/notification-box-update-date.component';
import { format } from 'src/app/utils/date-utils';
import { Subtask } from 'src/app/core/models/subtask';
import { TaskModificationComponent } from '../task-modification/task-modification.component';
import { NotificationBoxCreateSubtaskComponent } from './notificationBox/notification-box-create-subtask/notification-box-create-subtask.component';
import { SubtaskService } from 'src/app/core/services/subtask/subtask.service';
import { AdminProcessService } from '../../services/admin-process/admin-process.service';

@Component({
  selector: 'app-process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.scss'],
})
export class ProcessDetailComponent {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  @Input() task: Task;
  @Input() tasklist: Task[] = [];
  @Input() subtasklist: Subtask[] = [];
  @Input() subtask: Subtask;
  @Input() projectList: Project[] = [];
  isDisabledName: boolean = true;
  isDisabledInfor: boolean = true;
  isSubtasks: Array<string> = [];
  project: any;
  taskList: Array<any> = [];
  projectId: string = '';
  panelOpenState = false;
  isLoading: boolean = false;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private subtaskService: SubtaskService,
    private adminProcessSV: AdminProcessService
  ) {
    this.route.params.subscribe((params: any) => {
      this.projectId = params.id;
      this.getProjectById(params.id);
    });
    this.getTaskList();
  }

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

  someMethod() {
    this.trigger.openMenu();
  }

  show(x: any) {
    console.log('x: ', x);
  }

  trackByFn(index: any, item: any) {
    return item.taskId;
  }

  trackByFnn(index: any, item: any) {
    return item.subTaskId;
  }

  handleOnClick(event: Event): void {
    event.stopPropagation();
  }

  handleUpdateName(event: Event): void {
    if (!this.isDisabledName) {
      this.project.projectName = (event.target as HTMLInputElement).value;
      this.isDisabledName = true;
      this.updateDialogProjectName(this.project);
    }
  }

  handleUpdateInfor(event: Event): void {
    if (!this.isDisabledInfor) {
      this.project.projectStartAt = (event.target as HTMLInputElement).value;
      this.isDisabledInfor = true;
      this.updateDialogProjectDate(this.project);
    }
  }

  handleCreateSubtask(subtask: Subtask) {
    this.createSubtask(subtask);
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

  getTaskList() {
    this.isLoading = true;
    this.taskService.getTaskListByProjectId(this.projectId).subscribe({
      next: (task: any) => {
        this.taskList = task;
        for (let i = 0; i < this.taskList.length; i++) {
          this.taskService
            .getSubtaskList(this.taskList[i].taskId)
            .subscribe((subtaskList) => {
              this.taskList[i].subtask = subtaskList;
              if (i == this.taskList.length - 1) {
                this.isLoading = false;
              }
            });
        }
        const tasks = task.map((item: any) => {
          return {
            ...item,
            taskStartAt: item.taskStartAt ? format(item.taskStartAt) : null,
            taskEndAt: item.taskEndAt ? format(item.taskEndAt) : null,
          };
        });
        console.log('task', tasks);
        this.taskList = tasks;
        console.log('call api get all tasks successfully!' + task);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getSubtasks(taskId: any) {
    if (this.isSubtasks.includes(taskId)) {
      this.isSubtasks = this.isSubtasks.filter((item) => item !== taskId);
      this.subtasklist = this.subtasklist.filter(
        (item) => item.taskParentId !== taskId
      );
    } else {
      this.taskService.getSubtaskList(taskId).subscribe({
        next: (subTasks: any) => {
          this.isSubtasks.push(taskId);
          this.subtasklist = [...this.subtasklist, ...subTasks];
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }

  getProjectListNSchedule() {
    this.adminProcessSV.scheduleProcess(this.projectId).subscribe({
      next: (res) => {
        this.getTaskList();
        this.getProjectById(this.projectId);
      },
      error: (error) => {},
    });
  }

  getProjectById(projectId: string) {
    this.adminProcessSV.scheduleProcess(this.projectId).subscribe({
      next: (res) => {
        this.projectService.getProjectById(projectId).subscribe({
          next: (project: any) => {
            this.project = project;
            console.log('call api find project by id successfully', project);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  createDialogSubtask(task: Task) {
    const dialogRef = this.dialog.open(NotificationBoxCreateSubtaskComponent, {
      width: '500px',
      data: {
        taskId: task.taskId,
        taskName: task.taskName,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.getTaskList();
    });
  }

  createDialogTask(projectId: any) {
    const dialogRef = this.dialog.open(TaskCreationComponent, {
      disableClose: true,
      width: '500px',
      height: 'auto',
      data: {
        projectId: projectId,
        task: this.task,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        this.getProjectListNSchedule();
      }
    });
  }

  createSubtask(subtask: Subtask) {
    this.subtaskService.createSubtask(subtask).subscribe({
      next: (subtask: any) => {
        this.subtask = subtask;
        this.route.params.subscribe((params: any) => {
          this.getProjectById(params.id);
          this.taskService.getTaskList();
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateDialogProjectName(project: Project) {
    const dialogRef = this.dialog.open(NotificationBoxUpdateComponent, {
      data: {
        projectName: project.projectName,
        projectId: project.projectId,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.route.params.subscribe((params: any) => {
        this.getProjectById(params.id);
      });
    });
  }

  updateDialogTask(taskId: any) {
    const dialogRef = this.dialog.open(TaskModificationComponent, {
      disableClose: true,
      width: '500px',
      data: {
        taskId: taskId,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log('data: ', data);
      if (data !== undefined) {
        this.getProjectListNSchedule();
      }
    });
  }

  updateDialogSubtask(subtask: Subtask, task: Task) {
    const dialogRef = this.dialog.open(NotificationBoxCreateSubtaskComponent, {
      disableClose: true,
      width: '500px',
      data: {
        subtask: subtask,
        task: task,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        this.getProjectListNSchedule();
      }
    });
  }

  updateDialogProjectDate(project: Project) {
    const dialogRef = this.dialog.open(NotificationBoxUpdateDateComponent, {
      data: {
        projectStartAt: project.projectStartAt,
        projectId: project.projectId,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.route.params.subscribe((params: any) => {
        this.adminProcessSV.scheduleProcess(params.id).subscribe((data) => {
          console.log('modify start date: ', data);
          this.getTaskList();
          this.getProjectById(params.id);
        });
      });
    });
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

  deleteDialogTask(task: Task): void {
    const dialogRef = this.dialog.open(NotificationBoxDeleteComponent, {
      data: task,
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response != undefined) {
        this.getTaskList();
      }
    });
  }

  deleteDialogSubTask(subTask: Subtask): void {
    const dialogRef = this.dialog.open(NotificationBoxDeleteComponent, {
      data: subTask,
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response != undefined) {
        this.getTaskList();
      }
    });
  }
}
