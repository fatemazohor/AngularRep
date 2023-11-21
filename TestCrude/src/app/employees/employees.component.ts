import { Component } from '@angular/core';
import { EmployeeModel } from './employees.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
    employeeModel:EmployeeModel=new EmployeeModel();
}
