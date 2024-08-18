import { Component, OnInit} from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    public employees : Employee[] = [];

    public constructor(private employeeService : EmployeeService){}


    ngOnInit(): void {
      this.getEmployees();
    }


    public getEmployees() : void {
        this.employeeService.getEmployees().subscribe( (employeeResponse : Employee[]) => {
          this.employees = employeeResponse;
        }),
        (error : HttpErrorResponse) => {
          alert(error.message);
        }
    }
}
