import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Employee} from './employee';
import {Observable} from 'rxjs';
import {Project} from '../project/project';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
  }

  public getEmployeesProject(): Observable<Project[]>{
    return this.http.get<Project[]>(`${this.apiServerUrl}/employee/getEmployeeProject`);
  }

  public addEmployee(employee: Employee, depId: number): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add/` + depId, employee);
  }

  public updateEmployee(employee: Employee, empId: number): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/update/` + empId, employee);
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }
}
