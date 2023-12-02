import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { TaskService } from 'src/app/core/services/task/task.service';

@Component({
  selector: 'app-grantt-chart',
  templateUrl: './grantt-chart.component.html',
  styleUrls: ['./grantt-chart.component.scss']
})
export class GranttChartComponent {

  taskList: Array<any> = [];
  projectInfo: any;
  dateList: Array<any> = [];

  constructor(private taskSV: TaskService,
              private localStorageSV: LocalStorageService,
              private projectSV: ProjectService  
  ) {
    let projectId = this.localStorageSV.getItem("project")?.projectId;
    this.projectSV.getProjectById(projectId).subscribe((res: any) => {
      this.projectInfo = res;
      console.log("period project: ", res);
      let dstartDateProject = new Date(res.projectStartAt);
      let dendDatePoject = new Date(res.projectEndAt);
      this.dateList.push(dstartDateProject);
      while(dstartDateProject.getTime()!==dendDatePoject.getTime()) {
        let nextDate = new Date(dstartDateProject);
        nextDate.setDate(dstartDateProject.getDate() + 1);
        this.dateList.push(nextDate);
        dstartDateProject = new Date(nextDate);
      }
      console.log("date list: ", this.dateList);
    })
    this.taskSV.getTaskListByProjectId(projectId).subscribe((res: any) => {
      this.taskList = res;
    });
  }
}
