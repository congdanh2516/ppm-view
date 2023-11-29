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
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotificationBoxDeleteComponent } from './notificationBox/notification-box-delete/notification-box-delete.component';
import { NotificationBoxUpdateComponent } from './notificationBox/notification-box-update/notification-box-update.component';
import { TaskCreationComponent } from '../task-creation/task-creation.component';
import { NotificationBoxUpdateDateComponent } from './notificationBox/notification-box-update-date/notification-box-update-date.component';
import { format, time } from 'src/app/utils/date-utils';
import { Subtask } from 'src/app/core/models/subtask';
import { TaskModificationComponent } from '../task-modification/task-modification.component';
import { NotificationBoxCreateSubtaskComponent } from './notificationBox/notification-box-create-subtask/notification-box-create-subtask.component';
import { SubtaskService } from 'src/app/core/services/subtask/subtask.service';
import { NotificationBoxUpdateSubtaskComponent } from './notificationBox/notification-box-update-subtask/notification-box-update-subtask.component';
import { NotificationBoxMessageComponent } from './notificationBox/notification-box-message/notification-box-message.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/feature/authentication/services/authentication.service';

@Component({
  selector: 'app-process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.scss'],
})
export class ProcessDetailComponent implements OnInit {
  isDisabledName: boolean = true;
  isDisabledInfor: boolean = true;
  isSubtasks: Array<string> = [];

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
  @Input() task: Task;
  @Input() tasklist: Task[] = [];
  @Input() subtasklist: Subtask[] = [];
  @Input() subtask: Subtask;
  @Input() projectList: Project[] = [];


  taskList: Array<any> = [];
  projectId: string = "";

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private subtaskService: SubtaskService,
    private _snackBar: MatSnackBar,
    private authenticationSV: AuthenticationService
  ) {
    this.route.params.subscribe((params: any) => {
      this.projectId = params.id;
      this.getProjectById(params.id);
    });
    this.getTaskList();
    this.getProjectList();
  }

  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  handleOnClick(event: Event): void {
    event.stopPropagation();
  }

  private detectChanges(): void {
    this.route.params.subscribe((params: any) => {
      this.getProjectById(params.id);
      this.getProjectList();
      this.getTaskList();
    });
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    
  }

  getTaskList() {
    this.taskService.getTaskList().subscribe({
      next: (task: any) => {
        console.log("task list: ", task);
        // task.forEach((item: any) => {
          
        // })
        this.taskList = task;
        for(let i=0; i<this.taskList.length; i ++) {
          this.taskService.getSubtaskList(this.taskList[i].taskId).subscribe((subtaskList) => {
            this.taskList[i].substask = subtaskList;
            console.log("subtask: ", subtaskList);
          })
        }

        console.log("task - subtask: ", task);


        const tasks = task.map((item: any) => {
          return {
            ...item,
            taskStartAt: item.taskStartAt ? format(item.taskStartAt) : null,
            taskEndAt: item.taskEndAt ? format(item.taskEndAt) : null,
          };
        });
        console.log('task', tasks);
        this.tasklist = tasks;
        console.log('call api get all tasks successfully!' + task);
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

  deleteDialogSubTask(subTask: Subtask): void {
    const dialogRef = this.dialog.open(NotificationBoxDeleteComponent, {
      width: '500px',
      data: {
        taskId: subTask.subTaskId,
        taskName: subTask.subTaskName,
      },
    });
    dialogRef.afterClosed().subscribe((response) => {
      console.log('Dialog closed with result:', response.taskId);
      this.subtaskService.deleteSubtask(response.taskId).subscribe(() => {
        this.subtasklist = this.subtasklist.filter(
          (item) => item.subTaskId !== response.taskId
        );
        console.log('taskList handle delete' + this.tasklist);
      });
    });
  }

  updateDialogProjectName(project: Project) {
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

  updateDialogTask(task: Task) {
    const dialogRef = this.dialog.open(TaskModificationComponent, {
      disableClose: true,
      width: '500px',
      data: {
        task: task,
      },
    });

    dialogRef.afterClosed().subscribe((response) => {
      console.log('TaskModificationComponent id: ' + task.taskId);
    });
    this.detectChanges();
  }

  updateDialogSubtask(subtask: Subtask, task: Task) {
    const dialogRef = this.dialog.open(NotificationBoxUpdateSubtaskComponent, {
      disableClose: true,
      width: '500px',
      data: {
        subtask: subtask,
        taskId: task.taskId,
        taskName: task.taskName,
      },
    });

    dialogRef.componentInstance.cancelUpdate.subscribe(() => {
      this.detectChanges();
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        const updatedSubtaskIndex = this.subtasklist.findIndex(
          (item) => item.subTaskId === subtask.subTaskId
        );
        if (updatedSubtaskIndex !== -1) {
          this.subtasklist[updatedSubtaskIndex] = { ...data };
        }
        this.handleUpdateSubtask(data);
      }
      this.detectChanges();
    });
  }

  updateDialogProjectDate(project: Project) {
    const dialogRef = this.dialog.open(NotificationBoxUpdateDateComponent, {
      width: '500px',
      data: {
        projectStartAt: project.projectStartAt,
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

  createDialogSubtask(task: Task) {
    const dialogRef = this.dialog.open(NotificationBoxCreateSubtaskComponent, {
      width: '500px',
      data: {
        taskId: task.taskId,
        taskName: task.taskName,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        // Kiểm tra xem có dữ liệu được trả về từ hộp thoại không
        // Nếu có, thêm subtask mới vào subtasklist
        console.log('test data', data);
        this.subtasklist = [...this.subtasklist, { ...data }];

        // Các công việc khác bạn muốn thực hiện trong hàm này
        this.handleCreateSubtask(data);
      }
    });
  }

  createDialogTask(projectId: any) {
    const dialogRef = this.dialog.open(TaskCreationComponent, {
      disableClose: true,
      width: '500px',
      height : 'auto',
      data: {
        projectId: projectId,
        task: this.task,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.tasklist = [
        ...this.tasklist,
        {
          ...data,
          taskStartAt: format(new Date(data.taskStartAt)),
          taskEndAt: format(new Date(data.taskEndAt)),
          taskId: data.taskId,
        },
      ];
      data = {
        ...data,
        taskStartAt: time(data.taskStartAt),
        taskEndAt: time(data.taskEndAt),
      };
      this.handleCreateTask(data);
    });
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

  handleDelete(projectId: string) {
    this.deleteTask(projectId);
  }

  handleCreateTask(task: Task) {
    this.createTask(task);
    this.cdr.detectChanges();
  }

  handleCreateSubtask(subtask: Subtask) {
    this.createSubtask(subtask);
    this.cdr.detectChanges();
  }

  handleUpdateSubtask(subtask: Subtask) {
    this.updataSubtask(subtask);
    this.cdr.detectChanges();
  }

  createSubtask(subtask: Subtask) {
    this.subtaskService.createSubtask(subtask).subscribe({
      next: (subtask: any) => {
        this.subtask = subtask;
        this.route.params.subscribe((params: any) => {
          this.getProjectById(params.id);
          this.taskService.getTaskList();
        });
        this.reloadComponent();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  createTask(task: Task) {
    this.taskService.createTask(task).subscribe({
      next: (task: any) => {
        this.task = task;
        this.route.params.subscribe((params: any) => {
          this.getProjectById(params.id);
          this.taskService.getTaskList();
        });
        // this.reloadComponent();
      },
      error: (error) => {
        console.log(error);
      },
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
  getSubtasks(taskId: any) {
    console.log('taskId: ', taskId);

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

  updataSubtask(subtask: Subtask) {
    this.subtaskService.updateSubtask(subtask).subscribe({
      next: (subtask: any) => {
        this.subtask = subtask;
        this.route.params.subscribe((params: any) => {
          this.getProjectById(params.id);
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  // horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  // verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  // openSnackBar(duration: number, message: string) {
  //   this._snackBar.openFromComponent(NotificationBoxMessageComponent, {
  //     duration: duration * 1000,
  //     data: { message: message },
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition, // Truyền dữ liệu message vào component
  //   });
  // }
}
