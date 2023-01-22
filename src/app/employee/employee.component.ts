import { Component, OnInit } from '@angular/core';
import {Employee} from './employee';
import {Project} from '../project/project';
import {EmployeeService} from './employee.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {Department} from '../department/department';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public employees: Employee[];
  public editEmployee: Employee;
  public deleteEmployee: Employee;
  public projects: Project[];
  public selectedProjectIds: Project[];
  public departments: Department[];
  public selectedDepartmentIds: Department;
  constructor(private employeeService: EmployeeService, private http: HttpClient){
    this.http.get('http://localhost:8080/projects/all').subscribe((response: Project[]) => {
      this.projects = response;
      console.log(this.projects);
    }, error => console.error(error));

    this.http.get('http://localhost:8080/departments/all').subscribe((response: Department[]) => {
      this.departments = response;
      console.log(this.departments);
    }, error => console.error(error));
  }

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmloyee(addForm: NgForm): void {
    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployee({
      id: addForm.value.id,
      name: addForm.value.name,
      email: addForm.value.email,
      jobTitle: addForm.value.jobTitle,
      phone: addForm.value.phone,
      imageUrl: addForm.value.imageUrl,
      employeeCode: addForm.value.employeeCode,
      projects: this.selectedProjectIds,
      empDepartment: this.selectedDepartmentIds,
    }, this.selectedDepartmentIds.id).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
        console.log('selected projects' + this.selectedProjectIds);
        console.log('selected dep Id' + this.selectedDepartmentIds);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmloyee(employee: Employee): void {
    this.employeeService.updateEmployee({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      jobTitle: employee.jobTitle,
      phone: employee.phone,
      imageUrl: employee.imageUrl,
      employeeCode: employee.employeeCode,
      projects: this.selectedProjectIds,
      empDepartment: this.selectedDepartmentIds
    }, this.editEmployee.id
    ).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmloyee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  public onOpenModal(employee: Employee, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }
}
