import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewTBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/ViewTBLSamelEmployee';
import { TblShamelSearchByEmployeeNameInfo } from 'src/app/modules/shared/models/finance_department/payrol/tblShamelSearchByEmployeeNameInfo';
import { ViewTBLShamelEmployeeService } from 'src/app/modules/shared/services/employees_department/view-tbl-shamel-employee.service';

@Component({
  selector: 'app-search-employee-dialog',
  templateUrl: './search-employee-dialog.component.html',
  styleUrls: ['./search-employee-dialog.component.scss']
})
export class SearchEmployeeDialogComponent implements OnInit, AfterViewInit {

  Form = new FormGroup({
    fcl_FirstName: new FormControl(''),
    fcl_LastName: new FormControl(''),
    fcl_Father: new FormControl(''),
    fcl_Mother: new FormControl(''),
  });

  dataSource = new MatTableDataSource<ViewTBLShamelEmployee>();
  displayedColumns: string[] = [
    'id','firstName','lastName','father','mother','accounterName'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(public dialogRef: MatDialogRef<SearchEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private viewTBLShamelEmployeeService: ViewTBLShamelEmployeeService) { }

  ngOnInit(): void {
    // console.log("val",this.Form.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  view(){
    this.viewTBLShamelEmployeeService.search_by_employee_name_info(
      {fname: this.Form.get('fcl_FirstName').value, lname:this.Form.get('fcl_LastName').value,
      mother: this.Form.get('fcl_Mother').value, father: this.Form.get('fcl_Father').value}
    ).subscribe(
      res =>{
        this.dataSource.data= res;
      }
    );
  }

  
}
