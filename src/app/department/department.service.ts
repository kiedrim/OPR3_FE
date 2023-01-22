import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Department} from './department';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiServerUrl}/departments/all`);
  }

  public addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.apiServerUrl}/departments/add`, department);
  }

  public updateDepartment(department: Department, depId: number): Observable<Department> {
    return this.http.put<Department>(`${this.apiServerUrl}/departments/edit/${depId}`, department);
  }

  public deleteDepartment(depId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/departments/delete/${depId}`);
  }
}
