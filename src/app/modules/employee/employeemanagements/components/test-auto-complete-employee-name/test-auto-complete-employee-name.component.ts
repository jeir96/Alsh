import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { IEmployeeNameList } from 'src/app/modules/shared/models/employees_department/IEmployeeNameList';
import { EmployeeServiceService } from 'src/app/modules/shared/services/employees_department/employee-service.service';
import { ViewTBLShamelEmployeeService } from 'src/app/modules/shared/services/employees_department/view-tbl-shamel-employee.service';

@Component({
  selector: 'app-test-auto-complete-employee-name',
  templateUrl: './test-auto-complete-employee-name.component.html',
  styleUrls: ['./test-auto-complete-employee-name.component.scss']
})
export class TestAutoCompleteEmployeeNameComponent implements OnInit {
  EmployeeNameList:IEmployeeNameList[] = [];
  Form: UntypedFormGroup;
  ctrAutoCompleteName:UntypedFormControl = new UntypedFormControl();

  constructor( private fb: UntypedFormBuilder,
    public restApi:EmployeeServiceService,

    public viewTBLShamelEmployeeService:ViewTBLShamelEmployeeService,
   
    ) {

      this.Form = fb.group({});
      this.Form.addControl('AutoCompleteEmployeeName',this.ctrAutoCompleteName );

     
        this.viewTBLShamelEmployeeService.getEmpFullName("").subscribe(
          (data:any) => {
          
          this.EmployeeNameList=data;   
           console.log(data);
    
        });
    
      

     }

  ngOnInit(): void {
  }

selectedOption(emp :any){
   console.log(emp) // here we can get the selected option
}
}
