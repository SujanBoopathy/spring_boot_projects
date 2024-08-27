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
    public deleteEmployee? : Employee;
    public searchText? : string;

    public constructor(private employeeService : EmployeeService){}


    ngOnInit(): void {
      this.getEmployees();
    }

    public searchEmployee(key : String) : void {
      console.log(key)
      const results : Employee[] = [];
      for(const employee  of this.employees ){
        if(
             employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || employee.phoneNumber.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1        
        ){
            results.push(employee);
        }       
      }

      this.employees = results;
      if(results.length === 0 || !key){
        this.getEmployees();
      }
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
        this.deleteEmployee = employee;
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
            addForm.reset();
          },
          error: (e) => {
            alert(e.message);
            addForm.reset();
          }
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

    public onDeleteEmployee(employeeId : number | undefined) : void {
      if(employeeId != undefined){
        this.employeeService.deleteEmployee(employeeId).subscribe(
          {
            next: (response : void) => {
              console.log(response);
              this.getEmployees();
            },
            error: (e) => alert(e.message)
          }
        )
      }
    }
  
}
