import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { startWith, map, debounceTime, switchMap, tap, finalize, forkJoin, Observable, of } from 'rxjs';
import { ViewTBLShamelEmployeeService } from 'src/app/modules/shared/services/employees_department/view-tbl-shamel-employee.service';
import { EmployeeServiceService } from 'src/app/modules/shared/services/employees_department/employee-service.service';
import { SearchEmployeeDialogComponent } from 'src/app/modules/finance/payrol/componenets/employee/search-employee-dialog/search-employee-dialog.component';
import { TblShamelNewPayrolAddPageServiceService } from 'src/app/modules/finance/payrol/componenets/newpayroladd/TbLShamelNewPayrol/tbl-shamel-new-payrol-add-page-service.service';
import { ITBLShamelAccounter } from 'src/app/modules/shared/models/employees_department/TBLShamelAccounter';
import { TBLShamelMonth } from 'src/app/modules/shared/models/employees_department/TBLShamelMonth';
import { TBLShamelYear } from 'src/app/modules/shared/models/employees_department/TBLShamelYear';
import { ViewTBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/ViewTBLSamelEmployee';
import { TBLShamelAccounterService } from 'src/app/modules/shared/services/employees_department/tblshamel-accounter.service';
import { TBLShamelMonthService } from 'src/app/modules/shared/services/employees_department/tblshamel-month.service';
import { TBLShamelYearService } from 'src/app/modules/shared/services/employees_department/tblshamel-year.service';
import { EmployeeSeachDialogComponent } from '../employee-seach-dialog/employee-seach-dialog.component';

@Component({
  selector: 'app-employee-search-bar',
  templateUrl: './employee-search-bar.component.html',
  styleUrls: ['./employee-search-bar.component.scss']
})
export class EmployeeSearchBarComponent implements OnInit {

  _Selected_Employee: ViewTBLShamelEmployee;
  set Selected_Employee(obj:ViewTBLShamelEmployee)
  {
    this._Selected_Employee = obj;
    if (this._Selected_Employee.id!= null && this._Selected_Employee.id >0)
    {
      this.employeeService.search_by_id(this._Selected_Employee.id.toString()).
      subscribe(res => {
        this.pageService.TBLShamelEmployee = res;
      });
    }


    this.bindValue ();

  }
  get  Selected_Employee():ViewTBLShamelEmployee
  {
return this._Selected_Employee;
  }

  // Filtering

  List_Employee: ViewTBLShamelEmployee[];
  List_Employee_Filter: Observable<ViewTBLShamelEmployee[]>;
  Form: FormGroup;
  
  constructor(
    public dialog: MatDialog,
    private frmBuilder: FormBuilder,
 
    public viewTBLShamelEmployeeService: ViewTBLShamelEmployeeService,
    public employeeService: EmployeeServiceService,
    public pageService: TblShamelNewPayrolAddPageServiceService
  ) {
    this.BuildForm();
  }

  ngOnInit(): void {
  }

  BuildForm() {
    this.Form = this.frmBuilder.group({
      'global_id': new FormControl<number | null>(null),
      'computer_id': new FormControl<number | null>(null),
      'id': new FormControl<number | null>(null),
      'fullname': new FormControl<ViewTBLShamelEmployee | null>(null),
      'malakstate_name': new FormControl<string | null>(null)
    });
    if (this.Form != null) {
      this.Form.controls['fullname']
        .valueChanges
        .pipe(
          debounceTime(200),
          tap(() => { }),
          switchMap((value: string) => this.viewTBLShamelEmployeeService.getEmpFullName2(value)
            .pipe(
              finalize(() => { }),
            )
          )
        )
        .subscribe(emps => {
          if (emps != null && emps.length > 0
          ) {
            this.List_Employee = emps;
            this.List_Employee_Filter = of(emps);
           
          }
        });

    }
  }

  bindValue ()
  {
    if (this.Selected_Employee == null || this.Selected_Employee.id == null)
    {
      this.Form.reset();
      return;

    }
   
    
    if (this.Selected_Employee != null ) 
      this.Form.controls['fullname'].setValue(this.Selected_Employee);
  

    if (this.Selected_Employee.id != null && this.Selected_Employee.id > 0) 

      this.Form.controls['id'].setValue(this.Selected_Employee.id);
  

  if (this.Selected_Employee.id != null && this.Selected_Employee.id > 0) {
    this.Form.controls['id'].setValue(this.Selected_Employee.id);

    if (this.Selected_Employee != null && this.Selected_Employee.global_id != null && this.Selected_Employee.global_id != null)
      this.Form.controls['global_id'].setValue(this.Selected_Employee.global_id);

    if (this.Selected_Employee != null && this.Selected_Employee.computer_id != null && this.Selected_Employee.computer_id != null)
      this.Form.controls['computer_id'].setValue(this.Selected_Employee.computer_id);

    if (this.Selected_Employee != null && this.Selected_Employee.malakstate_name != null && this.Selected_Employee.malakstate_name != null)
      this.Form.controls['malakstate_name'].setValue(this.Selected_Employee.malakstate_name);

   
  }
  }

  displayEmployeeFn(emp: ViewTBLShamelEmployee) {
    if (emp != null && emp.id > 0) {
      return emp.fullname;
    }
    return '';
  }


  onEmployeeSelected(emp: any) {

    

    this.Selected_Employee = emp;

   
  }

  searchEmployee() {
    const dialogRef = this.dialog.open(EmployeeSeachDialogComponent, {
      width: '750px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.Selected_Employee = result;

    });
  }

  next_global_id() {
    if (this.Selected_Employee != null &&
      this.Selected_Employee.global_id != null) {

      this.viewTBLShamelEmployeeService.next_global_id(this.Selected_Employee.global_id).subscribe(
        res => {
          this.Selected_Employee = res;
        }
      );
    }

  }

  previous_global_id() {

    if (this.Selected_Employee != null &&
      this.Selected_Employee.global_id != null &&
      this.Selected_Employee.global_id != null) {


      this.viewTBLShamelEmployeeService.prev_global_id(this.Selected_Employee.global_id).subscribe(
        res => {
          this.Selected_Employee = res;
        }
      );
    }
  }


  previous_computer_id() {
    if (this.Selected_Employee != null &&
      this.Selected_Employee.computer_id != null) {
        this.viewTBLShamelEmployeeService.prev_computer_id(this.Selected_Employee.computer_id.toString()).subscribe(
        res => {
          this.Selected_Employee = res;
        }
      );
    }

  }

  next_computer_id() {

    if (this.Selected_Employee != null &&
      this.Selected_Employee.computer_id != null &&
      this.Selected_Employee.computer_id != null) {

      this.viewTBLShamelEmployeeService.next_computer_id(this.Selected_Employee.computer_id.toString()).subscribe(
        res => {
          this.Selected_Employee = res;
        }
      );
    }
  }

  computer_id_Changed() {
    if (this.Form != null &&
      this.Form.controls['computer_id'].value != null &&
      this.Form.controls['computer_id'].value != null) {
      this.viewTBLShamelEmployeeService.Search_computer_id(this.Form.controls['computer_id'].value).subscribe(
        res => {
          this.Selected_Employee = res;
        }
      );
    }
  }

  global_id_Changed() {
    if (this.Form != null &&
      this.Form.controls['global_id'].value != null &&
      this.Form.controls['global_id'].value != null) {
      this.viewTBLShamelEmployeeService.Search_global_id(this.Form.controls['global_id'].value ).subscribe(
        res => {
          this.Selected_Employee = res;
        }
      );
    }
  }

  nextId() {
    if (this.Selected_Employee != null &&
      this.Selected_Employee.id != null) {
      this.viewTBLShamelEmployeeService.next_id(this.Selected_Employee.id.toString()).subscribe(
        res => {
          this.Selected_Employee = res;
        }
      );
    }
  }

  previousId() {
    if (this.Selected_Employee != null &&
      this.Selected_Employee.id != null) {
      this.viewTBLShamelEmployeeService.prev_id(this.Selected_Employee.id.toString()).subscribe(
        res => {
          this.Selected_Employee = res;
        }
      );
    }
  }

  idChanged() {

    if (this.Form != null &&
      this.Form.controls['id'].value != null &&
      this.Form.controls['id'].value != null)  {
      this.viewTBLShamelEmployeeService.search_by_id(this.Form.controls['id'].value.toString()).subscribe(
        res => {
          this.Selected_Employee = res;
        }
      );
    }
  }

}
