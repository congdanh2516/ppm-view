import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GranttChartComponent } from "./admin-process/components/grantt-chart/grantt-chart.component";
import { AdminComponent } from "./admin.component";

const routes: Routes = [
    {path: '', component: AdminComponent,
        children: [
            {path: 'process',
                loadChildren: () => import('../admin/admin-process/admin-process.module').then(x => x.AdminProcessModule)
            },
        ]
    },
    {path: 'grantt', component: GranttChartComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }