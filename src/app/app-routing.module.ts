import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './user/login/login.component';
import {RegistrationComponent} from './user/registration/registration.component';
import ActivateGuard from './activate.guard';
import {EmployeeComponent} from './employee/employee.component';
import {DepartmentComponent} from './department/department.component';
import {ProjectComponent} from './project/project.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'employees', component: EmployeeComponent, canActivate: [ActivateGuard]},
  {path: 'departments', component: DepartmentComponent, canActivate: [ActivateGuard]},
  {path: 'projects', component: ProjectComponent, canActivate: [ActivateGuard]},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
