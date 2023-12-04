import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminProcessComponent } from "./admin-process.component";
import { GranttChartComponent } from "./components/grantt-chart/grantt-chart.component";
import { ProcessDetailComponent } from "./components/process-detail/process-detail.component";

const routes: Routes = [
    {path: 'list', component: AdminProcessComponent},
    {path: 'detail', component: ProcessDetailComponent},
    // {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'task-creation', component: AdminProcessComponent},
    {path: 'list/detail', component: ProcessDetailComponent },
    {path: 'list/grantt', component: GranttChartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminProcessRoutingModule {}
