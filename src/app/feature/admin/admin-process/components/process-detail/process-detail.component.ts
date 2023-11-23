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
  isDisabledName: boolean = true;
  isDisabledInfor: boolean = true;

  removeDisabledName() {
    this.isDisabledName = false;
  }
  
  removeDisabledInfor() {
    this.isDisabledInfor = false;
  }

  @ViewChild(MatMenuTrigger)
  trigger!: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }

  @Input() project: Project | undefined;
  @Input() tasklist: Task[] = [];
  @Input() projectList: Project[] = [];

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
}
