import { Component, OnInit} from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    public employees : Employee[] = [];
    public editEmployee? : Employee;

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

    public onOpenModal(employee : any, mode : string){
      const container = document.getElementById("main-container");
      const button = document.createElement("button");
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle','modal');
      if(mode == 'add'){
        button.setAttribute('data-target','#addEmployeeModal');
      }
      if(mode == 'edit'){
        this.editEmployee = employee;
        button.setAttribute('data-target','#updateEmployeeModal');
      }
      if(mode == 'delete'){
        button.setAttribute('data-target','#deleteEmployeeModal');
      }
      container?.appendChild(button);
      button.click();
    }

    public onAddEmployee(addForm : NgForm) : void {
      document.getElementById("add-employee-form")?.click();
      this.employeeService.addEmployee(addForm.value).subscribe(
        {
          next: (employee : Employee) => {
            console.log(employee);
            this.getEmployees();
          },
          error: (e) => alert(e.message)
        }
      )
    }

    public onUpdateEmployee(employee : Employee) : void {
      this.employeeService.updateEmployee(employee).subscribe(
        {
          next: (employee : Employee) => {
            console.log(employee);
            this.getEmployees();
          },
          error: (e) => alert(e.message)
        }
      )
      }
  
}
