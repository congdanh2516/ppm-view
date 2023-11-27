import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminProcessComponent } from "./admin-process.component";
import { ProcessDetailComponent } from "./components/process-detail/process-detail.component";

const routes: Routes = [
    {path: 'list', component: AdminProcessComponent},
    {path: 'detail', component: ProcessDetailComponent},
    // {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'task-creation', component: AdminProcessComponent},
    {path: 'detail/:id', component: ProcessDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminProcessRoutingModule {}
