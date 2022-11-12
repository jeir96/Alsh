
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ViewTBLShamelEmployeeService } from 'src/app/modules/shared/services/employees_department/view-tbl-shamel-employee.service';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { ViewTBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/ViewTBLSamelEmployee';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee-seach-dialog',
  templateUrl: './employee-seach-dialog.component.html',
  styleUrls: ['./employee-seach-dialog.component.scss']
})
export class EmployeeSeachDialogComponent implements OnInit {

  totalRows : number;

  datasource=new MatTableDataSource<ViewTBLShamelEmployee>([]) ;
  displayedColumns: string[] = ['fname', 'lname', 'mother', 'father'];
  selectedEmployee:ViewTBLShamelEmployee;
   Form:FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private frmBuilder:FormBuilder,
    private dialogRef: MatDialogRef<EmployeeSeachDialogComponent>,
    public viewTBLShamelEmployeeService:ViewTBLShamelEmployeeService) { 
      this.BuildForm();
  }
  BuildForm() {
    this.Form = this.frmBuilder.group({
      'fname': new FormControl<string | null>(null),
      'lname': new FormControl<string | null>(null),
      'mother': new FormControl<string | null>(null),
      'father': new FormControl<string | null>(null),  
      'pageindex': new FormControl<number | null>(null),  
      'pagesize': new FormControl<number | null>(null),  
    });
  }
  ngOnInit(): void {    
    this.datasource.paginator = this.paginator;
  }

  btnSearchClick ()
  {
    
    if (this.Form != null && this.Form.controls['pageIndex']!= null && this.Form.controls['pageIndex'].value == null)
     this.Form.controls['pageIndex'].setValue(0);
     if (this.Form != null && this.Form.controls['pagesize']!= null && this.Form.controls['pagesize'].value == null)
     this.Form.controls['pagesize'].setValue(50);

    
    this.viewTBLShamelEmployeeService.search_by_employee_name_info(this.Form.value).subscribe(
      (data:any) => {    
      this.datasource.data=data ;
    });


  }

  OnBtnSelect(emp:ViewTBLShamelEmployee){
    
    this.selectedEmployee = emp;
    this.dialogRef.close(this.selectedEmployee);
   
}

close() {
  this.dialogRef.close(this.selectedEmployee);
}

PageEvent($event:PageEvent)
{
  this.Form.controls['pageIndex'].setValue($event.pageIndex);
  this.Form.controls['pagesize'].setValue($event.pageSize);
  this.btnSearchClick();
}

}
