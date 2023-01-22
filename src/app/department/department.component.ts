import { Component, OnInit } from '@angular/core';
import {Department} from './department';
import {DepartmentService} from './department.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  public departments: Department[];
  public editDepartment: Department;
  public deleteDepartment: Department;

  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  public getDepartments(): void{
    this.departmentService.getDepartments().subscribe(
      (response: Department[]) => {
        this.departments = response;
        console.log(this.departments);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddDepartment(addForm: NgForm): void {
    document.getElementById('add-department-form').click();
    this.departmentService.addDepartment(addForm.value).subscribe(
      (response: Department) => {
        console.log(response);
        this.getDepartments();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateDepartment(department: Department): void {
    this.departmentService.updateDepartment(department, department.id).subscribe(
      (response: Department) => {
        console.log(response);
        this.getDepartments();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteDepartment(depId: number): void {
    this.departmentService.deleteDepartment(depId).subscribe(
      (response: void) => {
        console.log(response);
        this.getDepartments();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchDepartments(key: string): void {
    console.log(key);
    const results: Department[] = [];
    for (const department of this.departments) {
      if (department.depName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(department);
      }
    }
    this.departments = results;
    if (results.length === 0 || !key) {
      this.getDepartments();
    }
  }

  public onOpenModal(department: Department, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addDepartmentModal');
    }
    if (mode === 'edit') {
      this.editDepartment = department;
      button.setAttribute('data-target', '#updateDepartmentModal');
    }
    if (mode === 'delete') {
      this.deleteDepartment = department;
      button.setAttribute('data-target', '#deleteDepartmentModal');
    }
    container.appendChild(button);
    button.click();
  }
}
