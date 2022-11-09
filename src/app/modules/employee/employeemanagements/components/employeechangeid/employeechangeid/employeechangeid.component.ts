import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IEmployeeNameList } from 'src/app/modules/shared/models/employees_department/IEmployeeNameList';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { EmployeeServiceService } from 'src/app/modules/shared/services/employees_department/employee-service.service';
import { ViewTBLShamelEmployeeService } from 'src/app/modules/shared/services/employees_department/view-tbl-shamel-employee.service';
import { EmployeePageService } from '../../employee-page-service';

@Component({
  selector: 'app-employeechangeid',
  templateUrl: './employeechangeid.component.html',
  styleUrls: ['./employeechangeid.component.scss']
})
export class EmployeechangeidComponent implements OnInit {
  Selected_Emp: TBLShamelEmployee = {};


  ChangeEmployeeForm: UntypedFormGroup ;
  autocomplete_EmployeeName = new UntypedFormControl('',[Validators.required]);
  old_Computer_ID =new UntypedFormControl('',[Validators.required]);
  new_Computer_ID =new UntypedFormControl ('', [Validators.required]);
  SelectedEmp:TBLShamelEmployee;
  EmployeeNameList:IEmployeeNameList[] = [];
  filteredEmployeeNameList: IEmployeeNameList[];
  public height: string;
  
 
  


  constructor(
    public PageService: EmployeePageService,
    private fb: UntypedFormBuilder,
    public restApi:EmployeeServiceService,
    public viewTBLShamelEmployeeService:ViewTBLShamelEmployeeService,
    private snackBar: MatSnackBar  ) {
      this.BuildSeachForm();
      this.PageService.Subject_Selected_TBLShamelEmployee.subscribe(
        data => {
          this.Selected_Emp = data;
          console.log('ddddddddddddddddddddd');
          console.log(this.Selected_Emp.FullName);
          this.autocomplete_EmployeeName.setValue(this.Selected_Emp.FullName);
          this.old_Computer_ID.setValue( this.Selected_Emp.Computer_ID);
        }
      )

    
   
    



  
   

  
   }
   

   BuildSeachForm()
   {
    this.ChangeEmployeeForm = this.fb.group({
      });
      this.ChangeEmployeeForm .addControl('autocomplete_EmployeeName',this.autocomplete_EmployeeName);
      this.ChangeEmployeeForm .addControl('old_Computer_ID',this.old_Computer_ID);
      this.ChangeEmployeeForm .addControl('new_Computer_ID',this.new_Computer_ID);
      

   }


  
  
  
     ngOnInit() {

     


  


     }

   


public change_employee_id()
{
  console.log('دخل');
  console.log(this.old_Computer_ID);
  console.log(this.new_Computer_ID);

  if (  this.old_Computer_ID.value!= null  && this.new_Computer_ID.value!= null)

  console.log('دخل');
  this.restApi.change_employee_id(this.old_Computer_ID.value,this.new_Computer_ID.value).subscribe
  (data=>{
    
  }

  );


}



}
