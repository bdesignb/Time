import { ProjectsComponent } from './projects/projects.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetialsComponent } from './project-details/project-details.component';

const routes: Routes = [
  {path: '', component: ProjectsComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'edit', component: ProjectDetialsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
