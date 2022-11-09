import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime, finalize, map, Observable, startWith, switchMap, tap } from 'rxjs';
import { IEmployeeNameList } from 'src/app/modules/shared/models/employees_department/IEmployeeNameList';
import { ViewTBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/ViewTBLSamelEmployee';
import { TBLShamelShatebVartax } from 'src/app/modules/shared/models/finance_department/shatebtax/TBLShamelShatebVartax';
import { TblshameldocumenttypeService } from 'src/app/modules/shared/services/employees_department/tblshameldocumenttype.service';
import { ViewTBLShamelEmployeeService } from 'src/app/modules/shared/services/employees_department/view-tbl-shamel-employee.service';
import { TBLShamelShatebVarTaxService } from 'src/app/modules/shared/services/finance_department/shatebtax/tblshamel-shateb-var-tax.service';

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-var-tax-insert-dialog',
  templateUrl: './var-tax-insert-dialog.component.html',
  styleUrls: ['./var-tax-insert-dialog.component.scss']
})
export class VarTaxInsertDialogComponent implements OnInit {

  Form = new FormGroup({
    fcl_id: new FormControl(''),
    fcl_fullName: new FormControl(''),
    fcl_healthnosalary_name: new FormControl(''),
    fcl_duration: new FormControl(''),
    fcl_documenttype_id: new FormControl(''),
    fcl_documentnum: new FormControl(''),
    fcl_documentdate: new FormControl(''),
    fcl_amount: new FormControl(''),
  });
  
  filteredEmployeeNameList: ViewTBLShamelEmployee[] = [];
  isLoading = false;
  
  docTypes: Type[] = [];
  taxTypes: Type[] = [];
  
  constructor(public viewTBLShamelEmployeeService:ViewTBLShamelEmployeeService,
    public dialogRef: MatDialogRef<VarTaxInsertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TBLShamelShatebVartax,
    private tblshameldocumenttypeService: TblshameldocumenttypeService,
    private tblshamelvartaxService: TBLShamelShatebVarTaxService) { 
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

    /*
    this.tblshamelvartaxService.fill();
    this.tblshamelvartaxService.List_ITBLShamelVarTax_BehaviorSubject.subscribe(
      data => {
        for(let i=0; i< data.length; i++)
        this.taxTypes.push({value: data[i].vartax_id+"", viewValue: data[i].vartax_name});
      }
    );
    */
  }

  ngOnInit(): void {
    
  }

  displayFn(emp: IEmployeeNameList) {

    if (emp) { return emp.fullname; }
    return '';
  }

  employeeSelected(value: IEmployeeNameList){
  this.data.TBLShamelEmployee.fullname= value.fullname;
  this.data.TBLShamelEmployee.id= value.id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
