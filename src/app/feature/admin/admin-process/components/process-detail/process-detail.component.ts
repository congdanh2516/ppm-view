import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Task } from 'src/app/core/models/task';
import { TaskService } from 'src/app/core/services/task/task.service';
import { Project } from 'src/app/core/models/project';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.scss'],
})
export class ProcessDetailComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  @Input() project: Project;
  @Input() tasklist: Task[] = [];
  @Input() projectList: Project[] = [];
  isDisabledName: boolean = true;
  isDisabledInfor: boolean = true;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
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

  handleUpdate(event: Event) {
    if (!this.isDisabledName) {
      this.project.projectName = (event.target as HTMLInputElement).value;
      this.isDisabledName = true;
      this.updateProject(this.project);
    }
    if (!this.isDisabledInfor) {
      this.project.projectStartAt = (event.target as HTMLInputElement).value;
      this.isDisabledInfor = true;
      this.updateProject(this.project);
    }
  }

  getTaskList() {
    this.taskService.getTaskList().subscribe({
      next: (task: any) => {
        this.tasklist = task;
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
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
