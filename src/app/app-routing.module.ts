import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { MainComponent } from './note/components/main/main.component';

import { LoginComponent } from './user/components/login/login.component';
import { RegisterComponent } from './user/components/register/register.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'noteList',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registration',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
