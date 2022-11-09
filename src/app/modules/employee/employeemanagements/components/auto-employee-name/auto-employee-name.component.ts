import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { IEmployeeNameList } from 'src/app/modules/shared/models/employees_department/IEmployeeNameList';
import { EmployeeServiceService } from 'src/app/modules/shared/services/employees_department/employee-service.service';
import { ViewTBLShamelEmployeeService } from 'src/app/modules/shared/services/employees_department/view-tbl-shamel-employee.service';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import {
  startWith, map, debounceTime, filter, switchMap, exhaustMap, tap, scan,
  takeWhile
} from "rxjs/operators";




import { finalize} from 'rxjs/operators';
import { ViewTBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/ViewTBLSamelEmployee';


@Component({
  selector: 'app-auto-employee-name',
  templateUrl: './auto-employee-name.component.html',
  styleUrls: ['./auto-employee-name.component.scss']
})
export class AutoEmployeeNameComponent implements OnInit {
 Form: UntypedFormGroup;
Autocomplete_EmployeeName_Ctrl = new UntypedFormControl('', []);
filteredEmployeeNameList: ViewTBLShamelEmployee[] = [];
isLoading = false;
  constructor(private fb: UntypedFormBuilder,
    public viewTBLShamelEmployeeService:ViewTBLShamelEmployeeService,   
) { 
    this.Form = this.fb.group({
      
    })
    this.Form.addControl('autocomplete_EmployeeName', this.Autocomplete_EmployeeName_Ctrl);


    this.Autocomplete_EmployeeName_Ctrl
   
    .valueChanges
    .pipe(
      debounceTime(300),
      tap(() => this.isLoading = true),
      switchMap((value:string) => this.viewTBLShamelEmployeeService.getEmpFullName2( value)
      .pipe(
        finalize(() => this.isLoading = false),
        )
      )
    )
    .subscribe(emps => this.filteredEmployeeNameList = emps);
}

displayFn(emp: IEmployeeNameList) {

  if (emp) { return emp.fullname; }
  return '';
}

  ngOnInit(): void {
  }

}
