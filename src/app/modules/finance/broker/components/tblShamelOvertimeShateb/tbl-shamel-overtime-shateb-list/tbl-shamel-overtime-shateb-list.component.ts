import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, finalize, forkJoin, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { JobServiceDataAdjustPrintDialogComponent } from 'src/app/modules/employee/employeemanagements/components/job-service-data-adjust-print-dialog/job-service-data-adjust-print-dialog.component';
import { TBLShamelArea } from 'src/app/modules/shared/models/employees_department/TBLShamelArea';
import { TBLShamelMonth } from 'src/app/modules/shared/models/employees_department/TBLShamelMonth';
import { TBLShamelYear } from 'src/app/modules/shared/models/employees_department/TBLShamelYear';
import { TblShamelBrokerShateb } from 'src/app/modules/shared/models/finance_department/broker/TblShamelBrokerShateb';
import { TBLShamelOvertimeEmployee } from 'src/app/modules/shared/models/finance_department/broker/TBLShamelOvertimeEmployee';
import { TBLShamelOverTimeShateb } from 'src/app/modules/shared/models/finance_department/broker/TBLShamelOverTimeShateb';
import { TBLShamelAreaService } from 'src/app/modules/shared/services/employees_department/tblshamel-area.service';
import { TBLShamelMonthService } from 'src/app/modules/shared/services/employees_department/tblshamel-month.service';
import { TBLShamelYearService } from 'src/app/modules/shared/services/employees_department/tblshamel-year.service';
import { TblShamelMoneyM3PayDestService } from 'src/app/modules/shared/services/finance_department/broker/tbl-shamel-money-m3-pay-dest.service';
import { TBLShamelOvertimeEmployeeService } from 'src/app/modules/shared/services/finance_department/broker/tblshamel-overtime-employee.service';
import { TBLShamelOverTimeShatebService } from 'src/app/modules/shared/services/finance_department/broker/tblshamel-overtime-shateb.service';
import { TblShamelMoneyM3PayDest } from 'src/app/modules/shared/services/finance_department/broker/TblShamelMoneyM3PayDest';
import { ConfirmationDialogComponent } from '../../common/confirmation-dialog/confirmation-dialog.component';
import { TblShamelOvertimeShatebModifyComponent } from '../tbl-shamel-overtime-shateb-modify/tbl-shamel-overtime-shateb-modify.component';

@Component({
  selector: 'app-tbl-shamel-overtime-shateb-list',
  templateUrl: './tbl-shamel-overtime-shateb-list.component.html',
  styleUrls: ['./tbl-shamel-overtime-shateb-list.component.scss']
})
export class TblShamelOvertimeShatebListComponent implements OnInit {

  rowClicked: number;

  changeTableRowColor(idx: any) { 
    if(this.rowClicked === idx) this.rowClicked = -1;
    else this.rowClicked = idx;
  }
  
  overtime_shateb_List: TBLShamelOverTimeShateb[] = [];
  selected_overtime_shateb: TBLShamelOverTimeShateb;

  PageIndex: number = 1;
  rowInPage = 100;

  dataSource = new MatTableDataSource<TBLShamelOverTimeShateb>(this.overtime_shateb_List);


  TblShamelBrokerShateb_List: TBLShamelOverTimeShateb[] = [];
  Selected_TBLShamelOverTimeShateb: TBLShamelOverTimeShateb;

  displayedColumns: string[] = ['area_id', 'payrol_id', 'year_id', 'month_id', 'school_id', 'broker_id',
    'daycount'];

  Form: FormGroup;
  Fixed_Month: TBLShamelMonth;
  Fixed_Year: TBLShamelYear;
  List_Area_Id: TBLShamelArea[] = [];
  List_Area_Id_Filter: Observable<TBLShamelArea[]> = of([]);
  List_Overtime_employee_Name: TBLShamelOvertimeEmployee[] = [];
  List_Overtime_employee_Name_Filter: Observable<TBLShamelOvertimeEmployee[]> = of([]);
  List_ShamelMoneyM3PayDest: TblShamelMoneyM3PayDest[];
  List_ShamelMoneyM3PayDest_Filter: Observable<TblShamelMoneyM3PayDest[]>;
  List_TBLShamelMonth: TBLShamelMonth[];
  List_TBLShamelMonth_Filter: Observable<TBLShamelMonth[]> = of([]);
  List_TBLShamelYear: TBLShamelYear[];
  List_TBLShamelYear_Filter: Observable<TBLShamelYear[]> = of([]);

  constructor(private frmBuilder: FormBuilder,
    private tblShamelAreaService: TBLShamelAreaService,
    public ShamelOvertimeEmployeeService: TBLShamelOvertimeEmployeeService,
    public ShamelMonthService: TBLShamelMonthService,
    public ShamelYearService: TBLShamelYearService,
    public ShamelMoneyM3PayDestService: TblShamelMoneyM3PayDestService,
    private tblShamelOverTimeShatebService: TBLShamelOverTimeShatebService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,) {

    this.dataSource = new MatTableDataSource<TBLShamelOverTimeShateb>(this.overtime_shateb_List);


    this.Form = this.frmBuilder.group({

      broker_id: new FormControl<number | undefined | null>(null),
      fullname: new FormControl<TBLShamelOvertimeEmployee | undefined | null>(null),
      area_id: new FormControl<number | undefined | null>(null),
      year_id: new FormControl<number | undefined | null>(null),
      month_id: new FormControl<number | undefined | null>(null),
      school_id: new FormControl<number | undefined | null>(null),
      payrol_id_book: new FormControl<number | undefined | null>(null),
      payrol_id_shateb: new FormControl<number | undefined | null>(null),

    });

    this.LoadData();
  }

  Load_Area(): Observable<TBLShamelArea[]> {
    if (this.tblShamelAreaService.List_TBLShamelArea != null ||
      this.tblShamelAreaService.List_TBLShamelArea != undefined ||
      this.tblShamelAreaService.List_TBLShamelArea.length == 0)
      return this.tblShamelAreaService.list();

    return of(this.tblShamelAreaService.List_TBLShamelArea);
  }



  Load_School(): Observable<TblShamelMoneyM3PayDest[]> {
    if (this.ShamelMoneyM3PayDestService.List_TblShamelMoneyM3PayDest != null ||
      this.ShamelMoneyM3PayDestService.List_TblShamelMoneyM3PayDest != undefined ||
      this.ShamelMoneyM3PayDestService.List_TblShamelMoneyM3PayDest.length == 0)
      return this.ShamelMoneyM3PayDestService.list();

    return of(this.ShamelMoneyM3PayDestService.List_TblShamelMoneyM3PayDest);
  }


  LoadMonth(): Observable<TBLShamelMonth[]> {
    if (this.ShamelMonthService.List_TBLShamelMonth != null ||
      this.ShamelMonthService.List_TBLShamelMonth != undefined ||
      this.ShamelMonthService.List_TBLShamelMonth.length == 0)
      return this.ShamelMonthService.list();

    return of(this.ShamelMonthService.List_TBLShamelMonth);

  }
  LoadYear(): Observable<TBLShamelYear[]> {
    if (this.ShamelYearService.List_TBLShamelYear != null ||
      this.ShamelYearService.List_TBLShamelYear != undefined ||
      this.ShamelYearService.List_TBLShamelYear.length == 0)
      return this.ShamelYearService.list();
    return of(this.ShamelYearService.List_TBLShamelYear);

  }



  LoadData() {

    forkJoin(
      [this.Load_Area(),
      this.LoadMonth(),
      this.LoadYear(),
      this.Load_School()]
    ).subscribe(res => {
      this.List_Area_Id = res[0];
      this.List_Area_Id_Filter = of(res[0]);
      this.tblShamelAreaService.List_TBLShamelArea = this.List_Area_Id;
      this.tblShamelAreaService.List_TBLShamelArea_BehaviorSubject.next(this.List_Area_Id);
      console.log("222",this.List_Area_Id);

      this.List_TBLShamelMonth = res[1];
      this.List_TBLShamelMonth_Filter = of(res[1]);
      this.ShamelMonthService.List_TBLShamelMonth = this.List_TBLShamelMonth;
      this.ShamelMonthService.List_TBLShamelMonth_BehaviorSubject.next(this.List_TBLShamelMonth);


      this.List_TBLShamelYear = res[2];
      this.List_TBLShamelYear_Filter = of(res[2]);
      this.ShamelYearService.List_TBLShamelYear = this.List_TBLShamelYear;
      this.ShamelYearService.List_TBLShamelYear_BehaviorSubject.next(this.List_TBLShamelYear);




      this.List_ShamelMoneyM3PayDest = res[3];
      this.List_ShamelMoneyM3PayDest_Filter = of(res[3]);
      this.ShamelMoneyM3PayDestService.List_TblShamelMoneyM3PayDest = this.List_ShamelMoneyM3PayDest;
      this.ShamelMoneyM3PayDestService.List_TblShamelMoneyM3PayDest_BehaviorSubject.next(this.List_ShamelMoneyM3PayDest);



      if (this.Form != null) {

        this.Form.controls['fullname']
          .valueChanges
          .pipe(
            debounceTime(300),
            tap(() => { }),
            switchMap((value: string) => this.ShamelOvertimeEmployeeService.EmployeeFullName(value)
              .pipe(
                finalize(() => { }),
              )
            )
          )
          .subscribe(emps => {
            if (emps != null && (emps as TBLShamelOvertimeEmployee[]).length > 0
            ) {
              this.List_Overtime_employee_Name = emps as TBLShamelOvertimeEmployee[];
              this.List_Overtime_employee_Name_Filter = of(this.List_Overtime_employee_Name);

            }
          });


        this.List_Area_Id_Filter = this.Form.controls['area_id'].valueChanges
          .pipe(
            startWith(''),
            map(value => value && typeof value === 'string' ? this._Filtered_Aria_Id(value) : this.List_Area_Id.slice())
          );

        this.List_ShamelMoneyM3PayDest_Filter = this.Form.controls['school_id'].valueChanges
          .pipe(
            startWith(''),
            map(value => value && typeof value === 'string' ? this._Filtered_School_ID(value) : this.List_ShamelMoneyM3PayDest.slice())
          );

        this.List_TBLShamelMonth_Filter = this.Form.controls['month_id'].valueChanges
          .pipe(
            startWith(''),
            map(value => value && typeof value === 'string' ? this._Filtered_Month_Id(value) : this.List_TBLShamelMonth.slice())
          );


        this.List_TBLShamelYear_Filter = this.Form.controls['year_id'].valueChanges
          .pipe(
            startWith(''),
            map(value => value && typeof value === 'string' ? this._Filtered_Year_Id(value) : this.List_TBLShamelYear.slice())
          );

      }




    },
      (error) => console.log(error));

  }


  Display_OverTimeEmployee_Fn(emp: TBLShamelOvertimeEmployee) {
    if (emp != null && emp.serial > 0) {

      return emp.fullname;
    }
    return '';
  }

  private _Filtered_Month_Id(value: string): TBLShamelMonth[] {
    if (value != null) {
      const filterValue = value;
      return this.List_TBLShamelMonth.filter(obj => obj.month_name.includes(filterValue));
    }
    return this.List_TBLShamelMonth.slice();
  }

  private _Filtered_Year_Id(value: string): TBLShamelYear[] {
    if (value != null) {
      const filterValue = value;
      return this.List_TBLShamelYear.filter(obj => obj.year_name.includes(filterValue));
    }
    return this.List_TBLShamelYear.slice();
  }
  OnOverTimeEmployeeSelected(event: MatAutocompleteSelectedEvent) {
    if (event.option.value == null)
      return;
    var emp = event.option.value;

    const id = emp.serail;

    this.Form.controls['broker_id'].setValue(id);




  }


  private _Filtered_Aria_Id(value: string): TBLShamelArea[] {
    if (value != null && this.List_Area_Id != null && this.List_Area_Id.length > 0) {
      const filterValue = value;
      return this.List_Area_Id.filter(obj => obj.Area_Name.includes(filterValue));
    }
    return this.List_Area_Id.slice();
  }


  private _Filtered_School_ID(value: string): TblShamelMoneyM3PayDest[] {
    if (value != null && this.List_ShamelMoneyM3PayDest != null && this.List_ShamelMoneyM3PayDest.length > 0) {
      const filterValue = value;
      return this.List_ShamelMoneyM3PayDest.filter(obj => obj.paydest_name.includes(filterValue));
    }
    return this.List_ShamelMoneyM3PayDest.slice();
  }

  public Display_Month_Property(value: number): string {
    if (value != null && this.List_TBLShamelMonth != null && this.List_TBLShamelMonth.length > 0) {
      let Month: any = this.List_TBLShamelMonth.find(crs => crs.month_id == value);
      if (Month != null)
        return Month.documenttype_name;
    }
    return '';
  }

  public Display_Year_Property(value: number): string {
    if (value != null && this.List_TBLShamelYear != null && this.List_TBLShamelMonth.length > 0) {
      let Year: any = this.List_TBLShamelYear.find(crs => crs.year_id == value);
      if (Year != null)
        return Year.year_name;
    }
    return '';
  }


  public Display_Area_Property(value: number): string {
    if (value != null && this.List_Area_Id != null && this.List_Area_Id.length > 0) {
      let Area: any = this.List_Area_Id.find(crs => crs.Area_ID == value);
      if (Area != null)
        return Area.Area_Name;
    }
    return '';
  }

  public Display_School_Property(value: number): string {
    if (value != null && this.List_ShamelMoneyM3PayDest != null && this.List_ShamelMoneyM3PayDest.length > 0) {
      let ShamelMoneyM3PayDest: any = this.List_ShamelMoneyM3PayDest.find(crs => crs.serial == value);
      if (ShamelMoneyM3PayDest != null)
        return ShamelMoneyM3PayDest.paydest_name;
    }
    return '';
  }

  public async FillTable() {


    try {

      console.log(this.Form.value);
      // call Search
      this.tblShamelOverTimeShatebService.Search(this.Form.value, this.PageIndex).subscribe(
        (data: TBLShamelOverTimeShateb[] )=> {

         
          // if Success 
          if (data != null && data .length >0) {
            this.overtime_shateb_List = this.overtime_shateb_List.concat(data);
          }
          this.dataSource.data = this.overtime_shateb_List;

        }
      )

    } catch (ex: any) { }


  }

  onScroll() {

    this.PageIndex = this.PageIndex + 1;

    this.overtime_shateb_List = []; 

    this.FillTable();
  }

  Add() {

  }

  Refresh() {

  }
  Delete(element: TBLShamelOverTimeShateb) { 
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

          this.snackBar.open('تم الحذف', '', {
            duration: 2000,
          });

        }
      });
    } catch (ex: any) {

    }

  }

  Update(element: TBLShamelOverTimeShateb) { 
    if (element) {
      this.selected_overtime_shateb = element;

      const dialogRef = this.dialog.open(TblShamelOvertimeShatebModifyComponent, {
        height: '60%',
        width: '80%',
        data: { obj: this.selected_overtime_shateb }
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

  adjustPrintFooter(){
    const dialogRef = this.dialog.open(JobServiceDataAdjustPrintDialogComponent, {
      width: '1150px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  OnSearch()
  {
    this.PageIndex =1;
    this.overtime_shateb_List = [];
    this.dataSource.data = this.overtime_shateb_List;
    this.FillTable();
  }

  ngOnInit(): void {
  }


  OnSelectYear(event: MatAutocompleteSelectedEvent) {

  }

  OnSelectMonth(event: MatAutocompleteSelectedEvent) {

  }

  OnSelectTblShamelMoneyM3PayDest(event: MatAutocompleteSelectedEvent) {

  }
  OnSelectArea(event: MatAutocompleteSelectedEvent) {


  }
}
