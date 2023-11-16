import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from './feature/admin/admin-process/components/example/example.component';

const routes: Routes = [
  {path: 'example', component: ExampleComponent},
  {path: 'admin',
    loadChildren: () => import('../app/feature/admin/admin.module').then(x => x.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
