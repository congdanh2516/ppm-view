import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { count } from 'console';
import { format } from '../../../../../utils/date-utils';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { TaskService } from 'src/app/core/services/task/task.service';

@Component({
  selector: 'app-grantt-chart',
  templateUrl: './grantt-chart.component.html',
  styleUrls: ['./grantt-chart.component.scss'],
})
export class GranttChartComponent {
  taskList: Array<any> = [];
  projectInfo: any;
  projectStartAt: any;
  projectEndAt: any;
  dateList: Array<any> = [];
  datePerMonth: Array<any> = [];
  unitWidth: number = 40;
  monthNames: Array<any> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor(
    private taskSV: TaskService,
    private localStorageSV: LocalStorageService,
    private projectSV: ProjectService,
    private router: Router
  ) {
    let projectId = this.localStorageSV.getItem('project')?.projectId;
    this.projectSV.getProjectById(projectId).subscribe((res: any) => {
      this.projectInfo = res;
      this.projectStartAt = format(res.projectStartAt);
      this.projectEndAt = format(res.projectEndAt);
      console.log('period project: ', res);
      let dstartDateProject = new Date(res.projectStartAt);
      let dendDatePoject = new Date(res.projectEndAt);
      console.log('dend: ', res.projectEndAt);
      this.dateList.push(dstartDateProject);
      let countDate = 1;
      while (dstartDateProject.getTime() !== dendDatePoject.getTime()) {
        let nextDate = new Date(dstartDateProject);
        nextDate.setDate(dstartDateProject.getDate() + 1);
        console.log(
          'compare: ',
          dstartDateProject.getMonth(),
          ' ',
          nextDate.getMonth()
        );
        if (dstartDateProject.getMonth() === nextDate.getMonth()) {
          countDate++;
        } else {
          this.datePerMonth.push({
            month: dstartDateProject.getMonth(),
            year: dstartDateProject.getFullYear(),
            amount: countDate,
          });
          countDate = 1;
        }
        if (nextDate.getTime() === dendDatePoject.getTime()) {
          this.datePerMonth.push({
            month: dstartDateProject.getMonth(),
            year: dstartDateProject.getFullYear(),
            amount: countDate + 1,
          });
        }
        console.log('date per month: ', this.datePerMonth);
        this.dateList.push(nextDate);
        dstartDateProject = new Date(nextDate);
      }
      console.log('date list: ', this.dateList);
    });
    this.taskSV.getTaskListByProjectId(projectId).subscribe((res: any) => {
      this.taskList = res;
    });
  }

  openDetail() {
    this.router.navigateByUrl(`/admin/process/list/detail`);
  }
}
