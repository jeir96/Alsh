
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TBLShamelOvertimeEmployeeModifyComponent } from '../../tblShamelOvertimeEmployee/tblshamel-overtime-employee-modify/tblshamel-overtime-employee-modify.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import * as moment from 'moment';
import { TBLShamelOvertimeEmployee } from 'src/app/modules/shared/models/finance_department/broker/TBLShamelOvertimeEmployee';
import { TBLShamelOvertimeEmployeeService } from 'src/app/modules/shared/services/finance_department/broker/tblshamel-overtime-employee.service';
import { ConfirmationDialogComponent } from '../../common/confirmation-dialog/confirmation-dialog.component';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { TBLShamelSex } from 'src/app/modules/shared/models/employees_department/TBLShamelSex';
import { debounceTime, finalize, forkJoin, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { TBLShamelSexService } from 'src/app/modules/shared/services/employees_department/tblshamel-sex.service';

@Component({
  selector: 'app-tblshamel-overtime-employee-list',
  templateUrl: './tblshamel-overtime-employee-list.component.html',
  styleUrls: ['./tblshamel-overtime-employee-list.component.scss']
})
export class TBLShamelOvertimeEmployeeListComponent implements OnInit {

  rowClicked: number;

  changeTableRowColor(idx: any) { 
    if(this.rowClicked === idx) this.rowClicked = -1;
    else this.rowClicked = idx;
  }


  //To Load Data From Server Based On PageIndex
  PageIndex: number = 1;


  // Reactive Filter Form 
  Form: FormGroup;


  rowInPage = 100;
  pageIndex = 1;


  List_SEX_NAME: TBLShamelSex[] = [];
  List_SEX_NAME_Filter: Observable<TBLShamelSex[]> = of([]);

    
  // List For Table
  overtime_employee_Name_List: TBLShamelOvertimeEmployee[] = [];
  overtime_employee_Name_List_Filter: Observable< TBLShamelOvertimeEmployee[] > = of([]);


  overtime_employee_List: TBLShamelOvertimeEmployee[] = [];


  // Selected  overtime_employee
  selected_overtime_employee: TBLShamelOvertimeEmployee;

  //Table Column To Dispaly
  displayedColumns: string[] = ['serial', 'fname', 'lname', 'father', 'mother', 'birthdate',
    'sexname', 'servicedayes', 'action'];

  //Data Source For MatTable
  dataSource = new MatTableDataSource<TBLShamelOvertimeEmployee>(this.overtime_employee_List);


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<TBLShamelOvertimeEmployee>;



  // constructor First Method Call 
  constructor(public ShamelOvertimeEmployeeService: TBLShamelOvertimeEmployeeService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer,
    private frmBuilder : FormBuilder,
    private tblShamelSexService: TBLShamelSexService
  ) {

    // Init dataSource
    this.dataSource = new MatTableDataSource<TBLShamelOvertimeEmployee>(this.overtime_employee_List);

    this.Form = this. frmBuilder.group({
      serial: new FormControl<number|undefined|null>(null),
      fname: new FormControl<string|undefined|null>(null),
      lname: new FormControl<string|undefined|null>(null),
      father: new FormControl<string|undefined|null>(null),
      mother: new FormControl<string|undefined|null>(null),
      birthdate: new FormControl<Date|undefined|null>(null),
      sex_name: new FormControl<string|undefined|null>(null),
      servicedayes: new FormControl<number|undefined|null>(null),     
      servicedayes_operator: new FormControl<string|undefined|null>(null),
      fullname: new FormControl<string|undefined|null>(null)
    });

    this.LoadData();
    
    


    // Init Selected overtime_employee_List
    this.selected_overtime_employee = {
      serial: 0,
      fname: '',
      lname: '',
      father: '',
      mother: '',
      birthdate: moment("01- 01-2022", 'MM-DD-YYYY').toDate(),
      sex_name: '',
      servicedayes: 0,
    };

  


  }

Load_Sex() : Observable<TBLShamelSex[]>
{
  if (this.tblShamelSexService.List_TBLShamelSex == null ||
    this.tblShamelSexService.List_TBLShamelSex == undefined ||
    this.tblShamelSexService.List_TBLShamelSex .length == 0)
    return this.tblShamelSexService.list();

    return of (this.tblShamelSexService.List_TBLShamelSex );
}

  LoadData() {

    forkJoin(
      [this.Load_Sex()]
    ).subscribe(res => {
      this.List_SEX_NAME = res[0];
      this.List_SEX_NAME_Filter = of(res[0]);

    
      if (this.Form != null) {




         this.Form.controls['fullname']
          .valueChanges
          .pipe(
            debounceTime(300),
            tap(() => {}),
            switchMap((value: string) => this.ShamelOvertimeEmployeeService.EmployeeFullName(value)
              .pipe(
                finalize(() => {}),
              )
            )
          )
          .subscribe(emps => {
            if (emps != null && (emps as TBLShamelOvertimeEmployee[]).length > 0
            ) {
              this.overtime_employee_Name_List = emps as TBLShamelOvertimeEmployee[];
              this.overtime_employee_Name_List_Filter = of(this.overtime_employee_List);

            }
          });


        this.List_SEX_NAME_Filter = this.Form.controls['sex_name'].valueChanges
          .pipe(
            startWith(''),
            map(value => value && typeof value === 'string' ? this._Filtered_SEX_NAME(value) : this.List_SEX_NAME.slice())
          );


         
      }


    },
      (error) => console.log(error));

  }
    
  private _Filtered_SEX_NAME(value: string): TBLShamelSex[] {
    if (value != null && this.List_SEX_NAME!= null && this.List_SEX_NAME.length>0) {
      const filterValue = value;
      return this.List_SEX_NAME.filter(obj => obj.Sex_Name.includes(filterValue));
    }
    return this.List_SEX_NAME.slice();
  }



  public displaySexNameProperty(value: string): string {
    if (value!= null  && this.List_SEX_NAME!= null ) {
      let tBLShameSex: any = this.List_SEX_NAME.find(crs => crs.Sex_Name== value);
      if (tBLShameSex!= null)
        return tBLShameSex.Sex_Name;
    }
    return '';
  }
    
  ngAfterViewInit() {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {
 
  }


  ngOnInit(): void {

  }

  
  onScroll() {

    this.pageIndex = this.pageIndex + 1;

    this.overtime_employee_List = []; 

    this.FillTable();
  }

  // Call Server to Fetch Data And Then To Concat to Result Output List 
  public async FillTable() {


    try {

      console.log(this.Form.value);
      // call Search
      this.ShamelOvertimeEmployeeService.Search(this.Form.value, this.PageIndex).subscribe(
        (data: TBLShamelOvertimeEmployee[] )=> {

         
          // if Success 
          if (data != null && data .length >0) {
            this.overtime_employee_List = this.overtime_employee_List.concat(data);
          }
          this.dataSource.data = this.overtime_employee_List;

        }
      )

    } catch (ex: any) { }


  }

  OnSearch()
  {
    this.PageIndex =1;
    this.overtime_employee_List = [];
    this.dataSource.data = this.overtime_employee_List;
    this.FillTable();
  }

  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }












  Add(name: string): void {
    // Init selected_overtime_employee
    this.selected_overtime_employee = {
      serial: 0,
      fname: '',
      lname: '',
      father: '',
      mother: '',
      birthdate: moment("01- 01-2022", 'MM-DD-YYYY').toDate(),
      sex_name: '',
      servicedayes: 0,
    };

    const dialogRef = this.dialog.open(TBLShamelOvertimeEmployeeModifyComponent, {
      height: '60%',
      width: '60%',
      data: { obj: this.selected_overtime_employee }
    });

    dialogRef.afterClosed().toPromise().then(result => {
      console.log(result);
      if (result) {
        this.FillTable();
        this.dataSource.paginator = this.paginator;
        this.snackBar.open('تمت الإضافة', '', {
          duration: 2000,
        });
      }
    });
  }


  async Delete(element: TBLShamelOvertimeEmployee) {
    try {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'هل أنت متأكد من الحذف?',
          buttonText: {
            ok: 'نعم',
            cancel: 'لا'
          }
        }
      });



      dialogRef.afterClosed().toPromise().then((confirmed: boolean) => {
        if (confirmed) {
          if (element?.serial != null && element.serial > 0)
            this.ShamelOvertimeEmployeeService.delete(element?.serial).subscribe
              (
                data => {
                  this.FillTable();
                }

              )




          this.dataSource.paginator = this.paginator;
          this.snackBar.open('تم الحذف', '', {
            duration: 2000,
          });



        }
      });
    } catch (ex: any) {

    }

  }


  async Update(element: TBLShamelOvertimeEmployee) {
    if (element) {
      this.selected_overtime_employee = element;

      const dialogRef = this.dialog.open(TBLShamelOvertimeEmployeeModifyComponent, {
        height: '60%',
        width: '80%',
        data: { obj: this.selected_overtime_employee }
      });

      dialogRef.afterClosed().toPromise().then(result => {
        this.FillTable();

        if (result)
          this.snackBar.open('تم التعديل', '', {
            duration: 2000,
          });
      });

    }


  }
 
  
}
