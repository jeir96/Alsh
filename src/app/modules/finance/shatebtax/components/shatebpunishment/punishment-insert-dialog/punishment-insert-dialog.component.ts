import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime, finalize, switchMap, tap } from 'rxjs';
import { IEmployeeNameList } from 'src/app/modules/shared/models/employees_department/IEmployeeNameList';
import { TBLShamelShatebPunishment } from 'src/app/modules/shared/models/finance_department/shatebtax/TBLShamelShatebPunishment';
import { TblshameldocumenttypeService } from 'src/app/modules/shared/services/employees_department/tblshameldocumenttype.service';
import { ViewTBLShamelEmployeeService } from 'src/app/modules/shared/services/employees_department/view-tbl-shamel-employee.service';

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-punishment-insert-dialog',
  templateUrl: './punishment-insert-dialog.component.html',
  styleUrls: ['./punishment-insert-dialog.component.scss']
})
export class PunishmentInsertDialogComponent implements OnInit {

  Form = new FormGroup({
    fcl_id: new FormControl(''),
    fcl_fullName: new FormControl(''),
    fcl_percent: new FormControl(''),
    fcl_duration: new FormControl(''),
    fcl_documenttype_id: new FormControl(''),
    fcl_documentnum: new FormControl(''),
    fcl_documentdate: new FormControl(''),
  });

  filteredEmployeeNameList: any[] = [];
  isLoading = false;

  docTypes: Type[] = [
    
  ];

  constructor(public viewTBLShamelEmployeeService:ViewTBLShamelEmployeeService, public dialogRef: MatDialogRef<PunishmentInsertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TBLShamelShatebPunishment, private tblshameldocumenttypeService: TblshameldocumenttypeService
      ) {
        data.TBLShamelEmployee= {};

        this.Form.get('fcl_fullName')
   
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
    .subscribe(emps => {this.filteredEmployeeNameList = emps; console.log("emps",emps);});

    this.tblshameldocumenttypeService.fill();
    this.tblshameldocumenttypeService.List_ITBLShamelDocumentType_BehaviorSubject.subscribe(
      data => {
        for(let i=0; i< data.length; i++)
        this.docTypes.push({value: data[i].documenttype_id+"", viewValue: data[i].documenttype_name});
      }
    );
  }

  ngOnInit(): void {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  displayFn(emp: IEmployeeNameList) {

    if (emp) { return emp.fullname; }
    return '';
     }

  employeeSelected(value: IEmployeeNameList){
  this.data.TBLShamelEmployee.FullName= value.fullname;
  this.data.TBLShamelEmployee.id= value.id;
  }
}
