import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, finalize, forkJoin, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { ITBLShamelAccounter } from 'src/app/modules/shared/models/employees_department/TBLShamelAccounter';
import { TBLShamelMonth } from 'src/app/modules/shared/models/employees_department/TBLShamelMonth';
import { TBLShamelYear } from 'src/app/modules/shared/models/employees_department/TBLShamelYear';
import { ViewTBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/ViewTBLSamelEmployee';
import { EmployeeServiceService } from 'src/app/modules/shared/services/employees_department/employee-service.service';
import { TBLShamelAccounterService } from 'src/app/modules/shared/services/employees_department/tblshamel-accounter.service';
import { TBLShamelMonthService } from 'src/app/modules/shared/services/employees_department/tblshamel-month.service';
import { TBLShamelYearService } from 'src/app/modules/shared/services/employees_department/tblshamel-year.service';
import { ViewTBLShamelEmployeeService } from 'src/app/modules/shared/services/employees_department/view-tbl-shamel-employee.service';

import { TblShamelNewPayrolAddPageServiceService } from '../../newpayroladd/TbLShamelNewPayrol/tbl-shamel-new-payrol-add-page-service.service';
import { SearchEmployeeDialogComponent } from '../search-employee-dialog/search-employee-dialog.component';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.scss']
})
export class EmployeeSearchComponent implements OnInit {
  // Filtering
  List_Accounter: ITBLShamelAccounter[] = [];
  List_Accounter_Filter: Observable<ITBLShamelAccounter[]> = of([]);

  List_Employee: ViewTBLShamelEmployee[];
  List_Employee_Filter: Observable<ViewTBLShamelEmployee[]>;

  Fixed_Month: TBLShamelMonth;
  Fixed_Year: TBLShamelYear;
  Form: FormGroup;



  constructor(
    public dialog: MatDialog,
    private frmBuilder: FormBuilder,
    private ShamelAccounterService: TBLShamelAccounterService,
    public ShamelMonthService: TBLShamelMonthService,
    public ShamelYearService: TBLShamelYearService,
    public viewTBLShamelEmployeeService: ViewTBLShamelEmployeeService,
    public employeeService: EmployeeServiceService,
    public pageService: TblShamelNewPayrolAddPageServiceService
  ) {
    this.BuildForm();
    this.LoadData();
  }

  ngOnInit(): void {
  }

  BuildForm() {
    this.Form = this.frmBuilder.group({
      'Accounter_ID': new FormControl<number | null>(null),
      'AccounterSerial': new FormControl<string | null>(null),
      'id': new FormControl<string | null>(null),
      'FullName': new FormControl<string | null>(null)
    });
  }



  LoadAccounter(): Observable<ITBLShamelAccounter[]> {
    if (this.ShamelAccounterService.List_TBLShamelAccounter == null ||
      this.ShamelAccounterService.List_TBLShamelAccounter == undefined ||
      this.ShamelAccounterService.List_TBLShamelAccounter.length == 0)
      return this.ShamelAccounterService.list();
    return of(this.ShamelAccounterService.List_TBLShamelAccounter);
  }
  LoadMonth(): Observable<TBLShamelMonth> {
    return this.ShamelMonthService.GetMonthFixed();

  }


  LoadYear(): Observable<TBLShamelYear> {

    return this.ShamelYearService.GetYearFixed();

  }
  LoadData() {
    forkJoin(
      [this.LoadAccounter(),
      this.LoadYear(),
      this.LoadMonth()
      ]
    ).subscribe(res => {


      this.List_Accounter = res[0];
      this.ShamelAccounterService.List_TBLShamelAccounter = res[0];
      this.ShamelAccounterService.List_TBLShamelAccounter_BehaviorSubject.next(res[0]);





      this.Fixed_Month = res[2];
      this.Fixed_Year = res[1];



      if (this.Form != null) {




        this.Form.controls['FullName']
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
              console.log(emps);
            }
          });





        this.List_Accounter_Filter = this.Form.controls['Accounter_ID'].valueChanges
          .pipe(
            startWith(''),
            map(value => value && typeof value === 'string' ? this._filteredAccounter(value) : this.List_Accounter.slice())
          );


      }


    },
      (error) => console.log(error));

  }



  displayFn(emp: ViewTBLShamelEmployee) {
    if (emp != null && emp.id > 0) {

      return emp.fullname;
    }
    return '';
  }

  displayAccounter(accounter_id: number) {
    if (accounter_id > 0 && this.List_Accounter!=null && this.List_Accounter.length>0) {
      var Accounter = this.List_Accounter.filter(x=>x.accounter_id == accounter_id);
      if (Accounter!= null && Accounter.length>0)
      return Accounter[0].accounter_name;
    }
    return '';
  }

  

  onEmployeeSelected(emp: any) {

    if (emp == null || emp.id == null )
      return;

  

    const id = emp.id;

    if (id != null && id > 0) {
      this.Form.controls['id'].setValue(id);

    if (emp!= null && emp.accounter_id!= null && emp.accounter_name!= null )  
      this.Form.controls['Accounter_ID'].setValue( emp.accounter_id);

      if (emp!= null && emp.accounterserial!= null && emp.accounterserial!= null )  
      this.Form.controls['AccounterSerial'].setValue( emp.AccounterSerial);
      
      this.employeeService.search_by_id_mini(id).
        subscribe(res => {
          this.pageService.TBLShamelEmployee = res;
        });

    }
  }







  private _filteredAccounter(value: string): ITBLShamelAccounter[] {
    if (value) {
      const filterValue = value;
      return this.List_Accounter.filter(obj => obj.accounter_name.includes(filterValue));

    }
    return this.List_Accounter.slice();
  }



  searchEmployee() {
    const dialogRef = this.dialog.open(SearchEmployeeDialogComponent, {
      width: '750px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  nextSerial() {
    if (this.pageService.TBLShamelEmployee != null &&
      this.pageService.TBLShamelEmployee.AccounterSerial != null) {

      this.viewTBLShamelEmployeeService.next_accounter(this.pageService.TBLShamelEmployee.id, ++this.pageService.TBLShamelEmployee.AccounterSerial).subscribe(
        res => {
          this.pageService.TBLShamelEmployee = res;
        }
      );
    }

  }

  previousSerial() {

    if (this.pageService.TBLShamelEmployee != null &&
      this.pageService.TBLShamelEmployee.Accounter_ID != null &&
      this.pageService.TBLShamelEmployee.AccounterSerial != null) {

      this.viewTBLShamelEmployeeService.next_accounter(this.pageService.TBLShamelEmployee.Accounter_ID, --this.pageService.TBLShamelEmployee.AccounterSerial).subscribe(
        res => {
          this.pageService.TBLShamelEmployee = res;
        }
      );
    }
  }

  serialChanged() {
    if (this.pageService.TBLShamelEmployee != null &&
      this.pageService.TBLShamelEmployee.Accounter_ID != null &&
      this.pageService.TBLShamelEmployee.AccounterSerial != null) {


      this.viewTBLShamelEmployeeService.search_by_accounter(this.pageService.TBLShamelEmployee.Accounter_ID, this.pageService.TBLShamelEmployee.AccounterSerial).subscribe(
        res => {
          this.pageService.TBLShamelEmployee = res;
        }
      );
    }
  }

  nextId() {

    if (this.pageService.TBLShamelEmployee != null &&
      this.pageService.TBLShamelEmployee.id != null) {



      this.employeeService.next_id(this.pageService.TBLShamelEmployee.id.toString()).subscribe(
        res => {
          this.pageService.TBLShamelEmployee = res;
        }
      );
    }
  }

  previousId() {
    if (this.pageService.TBLShamelEmployee != null &&
      this.pageService.TBLShamelEmployee.id != null) {



      this.employeeService.prev_id(this.pageService.TBLShamelEmployee.id.toString()).subscribe(
        res => {
          this.pageService.TBLShamelEmployee = res;
        }
      );
    }
  }

  idChanged() {

    if (this.pageService.TBLShamelEmployee != null &&
      this.pageService.TBLShamelEmployee.id != null) {



      this.employeeService.search_by_id(this.pageService.TBLShamelEmployee.id.toString()).subscribe(
        res => {
          this.pageService.TBLShamelEmployee = res;
        }
      );
    }
  }

}
