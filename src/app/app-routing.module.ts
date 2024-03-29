import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//COMPONENTES
import { TasksComponent } from './components/tasks/tasks.component';
import { PrivateTasksComponent } from './components/private-tasks/private-tasks.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './auth.guard';
// import { LoaderComponent } from './components/loader/loader.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: TasksComponent,
  },
  {
    path: 'private-tasks',
    canActivate: [AuthGuard],
    component: PrivateTasksComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },

  {
    path: 'signup',
    component: SignupComponent,
  },
  // {
  //   path: 'loader',
  //   component: LoaderComponent
  // },
  {
    path: '**',
    redirectTo: '/tasks',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:false})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
