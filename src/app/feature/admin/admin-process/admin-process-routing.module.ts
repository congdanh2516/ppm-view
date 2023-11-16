import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminProcessComponent } from "./admin-process.component";
import { ProcessDetailComponent } from "./components/process-detail/process-detail.component";
import { TaskCreationComponent } from "./components/task-creation/task-creation.component";
import { TaskModificationComponent } from "./components/task-modification/task-modification.component";

const routes: Routes = [
    {path: 'detail', component: ProcessDetailComponent},
    {path: '', redirectTo: 'detail', pathMatch: 'full'},
    {path: 'task-creation', component: AdminProcessComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminProcessRoutingModule { }