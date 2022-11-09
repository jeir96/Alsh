import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime, finalize, map, Observable, startWith, switchMap, tap } from 'rxjs';
import { IEmployeeNameList } from 'src/app/modules/shared/models/employees_department/IEmployeeNameList';
import { TBLShamelShatebHealth } from 'src/app/modules/shared/models/finance_department/shatebtax/TBLShamelShatebHealth';
import { ViewTBLShamelEmployeeService } from 'src/app/modules/shared/services/employees_department/view-tbl-shamel-employee.service';

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-health-insert-dialog',
  templateUrl: './health-insert-dialog.component.html',
  styleUrls: ['./health-insert-dialog.component.scss']
})

export class HealthInsertDialogComponent implements OnInit {

  Form = new FormGroup({
    fcl_id: new FormControl(''),
    fcl_fullName: new FormControl(''),
    fcl_healthnosalary_name: new FormControl(''),
    fcl_duration: new FormControl(''),
    fcl_startdate: new FormControl(''),
    fcl_documenttype_id: new FormControl(''),
    fcl_documentnum: new FormControl(''),
    fcl_documentdate: new FormControl(''),
    fcl_salary: new FormControl(''),
    fcl_amount: new FormControl(''),
  });
  
  filteredEmployeeNameList: IEmployeeNameList[] = [];
  isLoading = false;
  
  options2: string[] = ["بلا أجر", "صحية"];
  filteredOptions2: Observable<string[]>;

  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options2.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  docTypes: Type[] = [
    {value: '0', viewValue: 'قانون'},
    {value: '1', viewValue: 'مرسوم'},
    {value: '2', viewValue: 'مرسوم تشريعي'},
    {value: '3', viewValue: 'قرار مجلس الوزراء'},
    {value: '4', viewValue: 'تعميم مجلس الوزراء'},
    {value: '5', viewValue: 'قرار'},
    {value: '6', viewValue: 'قرار وزير'},
    {value: '7', viewValue: 'قرار معاون وزير'},
    {value: '8', viewValue: 'قرار محافظ'},
    {value: '9', viewValue: 'قرار مدير'},
    {value: '10', viewValue: 'كتاب'},
    {value: '11', viewValue: 'كتاب وزير'},
    {value: '12', viewValue: 'كتاب محافظ'},
    {value: '13', viewValue: 'كتاب معاون وزير'},
    {value: '14', viewValue: 'كتاب مدير'},
    {value: '15', viewValue: 'أمر إداري'},
    {value: '16', viewValue: 'قرار هيئة الرقابة والتفتيش'},
    {value: '17', viewValue: 'عقد'},
    {value: '18', viewValue: 'تعميم'},
    {value: '19', viewValue: 'أمر إداري محافظ'},
    {value: '20', viewValue: 'كتاب نقابة معلمين'},
    {value: '21', viewValue: 'رئيس الجهاز المركزي للرقابة'},
    {value: '22', viewValue: 'تعميم وزارة التربية'},
  ];
  
  constructor(public viewTBLShamelEmployeeService:ViewTBLShamelEmployeeService, public dialogRef: MatDialogRef<HealthInsertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TBLShamelShatebHealth) { 
      data.tblShamelEmployee= {};

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
    }

  ngOnInit(): void {
    this.filteredOptions2 = this.Form.get('fcl_healthnosalary_name').valueChanges.pipe(
      startWith(''),
      map(value => this._filter2(value || '')),
    );
  }

  displayFn(emp: IEmployeeNameList) {

    if (emp) { return emp.fullname; }
    return '';
  }

  employeeSelected(value: IEmployeeNameList){
  this.data.tblShamelEmployee.fullname= value.fullname;
  this.data.tblShamelEmployee.id= value.id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
