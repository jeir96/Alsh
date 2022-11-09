import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import * as moment from 'moment';
import { debounceTime, distinctUntilChanged, filter, finalize, forkJoin, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { TBLShamelArea } from 'src/app/modules/shared/models/employees_department/TBLShamelArea';
import { TBLShamelMonth } from 'src/app/modules/shared/models/employees_department/TBLShamelMonth';
import { TBLShamelYear } from 'src/app/modules/shared/models/employees_department/TBLShamelYear';
import { TBLShamelOvertimeEmployee } from 'src/app/modules/shared/models/finance_department/broker/TBLShamelOvertimeEmployee';
import { TBLShamelOverTimeShateb } from 'src/app/modules/shared/models/finance_department/broker/TBLShamelOverTimeShateb';
import { TBLShamelAreaService } from 'src/app/modules/shared/services/employees_department/tblshamel-area.service';
import { TBLShamelMonthService } from 'src/app/modules/shared/services/employees_department/tblshamel-month.service';
import { TBLShamelYearService } from 'src/app/modules/shared/services/employees_department/tblshamel-year.service';
import { TblShamelMoneyM3PayDestService } from 'src/app/modules/shared/services/finance_department/broker/tbl-shamel-money-m3-pay-dest.service';
import { TBLShamelOvertimeEmployeeService } from 'src/app/modules/shared/services/finance_department/broker/tblshamel-overtime-employee.service';
import { TBLShamelOverTimeShatebService } from 'src/app/modules/shared/services/finance_department/broker/tblshamel-overtime-shateb.service';
import { TblShamelMoneyM3PayDest } from 'src/app/modules/shared/services/finance_department/broker/TblShamelMoneyM3PayDest';

@Component({
  selector: 'app-tbl-shamel-overtime-shateb-modify',
  templateUrl: './tbl-shamel-overtime-shateb-modify.component.html',
  styleUrls: ['./tbl-shamel-overtime-shateb-modify.component.scss']
})
export class TblShamelOvertimeShatebModifyComponent implements OnInit {

  _Selected_TblShamelOvertimeShateb: TBLShamelOverTimeShateb;

  set Selected_TblShamelOvertimeShateb(obj: TBLShamelOverTimeShateb) {
    this._Selected_TblShamelOvertimeShateb = obj;
  }
  get Selected_TblShamelOvertimeShateb(): TBLShamelOverTimeShateb {
    return this._Selected_TblShamelOvertimeShateb;
  }
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



  constructor(
    private frmBuilder: FormBuilder,
    private tblShamelAreaService: TBLShamelAreaService,
    public ShamelOvertimeEmployeeService: TBLShamelOvertimeEmployeeService,
    public ShamelMonthService: TBLShamelMonthService,
    public ShamelYearService: TBLShamelYearService,
    public ShamelMoneyM3PayDestService: TblShamelMoneyM3PayDestService
  ) {
    this.BuildForm();
    this.LoadData();
  }

  BuildForm() {
    this.Form = this.frmBuilder.group({
      serial: new FormControl<number | undefined | null>(null),
      broker_id: new FormControl<number | undefined | null>(null),
      area_id: new FormControl<number | undefined | null>(null),
      year_id: new FormControl<number | undefined | null>(null),
      month_id: new FormControl<number | undefined | null>(null),
      school_id: new FormControl<number | undefined | null>(null),
      payrol_id: new FormControl<number | undefined | null>(null),
      daycount: new FormControl<number | undefined | null>(null),
      enterusername: new FormControl<string | undefined | null>(null),
      enterdate: new FormControl<Date | undefined | null>(null),
      entertime: new FormControl<string | undefined | null>(null),
      modifyusername: new FormControl<string | undefined | null>(null),
      modifydate: new FormControl<Date | undefined | null>(null),
      modifytime: new FormControl<string | undefined | null>(null),

    });

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

      this.BindValue();


    },
      (error) => console.log(error));

  }

  ngOnInit(): void {


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

    const id = emp.id;

    this.Form.controls['id'].setValue(id);

    if (id != null && id > 0) {
      this.Form.controls['id'].setValue(id);
      /*
      this.ShamelNewShatebService.GetNetCash(id, this.Fixed_Year.year_id, this.Fixed_Month.month_id).subscribe
        (
          data => {
            this.Form.controls['salary'].setValue(data.netcash);
          }
        )
  */

    }

  }


  private _Filtered_Aria_Id(value: string): TBLShamelArea[] {
    if (value != null && this.List_Area_Id != null && this.List_Area_Id.length > 0) {
      const filterValue = value;
      return this.List_Area_Id.filter(obj => obj.area_name.includes(filterValue));
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
      let Area: any = this.List_Area_Id.find(crs => crs.area_id == value);
      if (Area != null)
        return Area.area_name;
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


  BindValue() {
    if (this.Selected_TblShamelOvertimeShateb != null) {

      if (this.Selected_TblShamelOvertimeShateb.broker_id != null)
        this.Form.controls['broker_id'].setValue(this.Selected_TblShamelOvertimeShateb.broker_id);


      if (this.Selected_TblShamelOvertimeShateb.serial != null)
        this.Form.controls['serial'].setValue(this.Selected_TblShamelOvertimeShateb.serial);


      if (this.Selected_TblShamelOvertimeShateb.area_id != null)
        this.Form.controls['area_id'].setValue(this.Selected_TblShamelOvertimeShateb.area_id);

      if (this.Selected_TblShamelOvertimeShateb.year_id != null)
        this.Form.controls['year_id'].setValue(this.Selected_TblShamelOvertimeShateb.year_id);

      if (this.Selected_TblShamelOvertimeShateb.month_id != null)
        this.Form.controls['month_id'].setValue(this.Selected_TblShamelOvertimeShateb.month_id);


      if (this.Selected_TblShamelOvertimeShateb.school_id != null)
        this.Form.controls['school_id'].setValue(this.Selected_TblShamelOvertimeShateb.school_id);


      if (this.Selected_TblShamelOvertimeShateb.payrol_id != null)
        this.Form.controls['payrol_id'].setValue(this.Selected_TblShamelOvertimeShateb.payrol_id);

      if (this.Selected_TblShamelOvertimeShateb.daycount != null)
        this.Form.controls['daycount'].setValue(this.Selected_TblShamelOvertimeShateb.daycount);

      if (this.Selected_TblShamelOvertimeShateb.enterusername != null)
        this.Form.controls['enterusername'].setValue(this.Selected_TblShamelOvertimeShateb.enterusername);

      if (this.Selected_TblShamelOvertimeShateb.enterdate != null)
        this.Form.controls['enterdate'].setValue(moment(this.Selected_TblShamelOvertimeShateb.enterdate).toDate());

      if (this.Selected_TblShamelOvertimeShateb.entertime != null)
        this.Form.controls['entertime'].setValue(this.Selected_TblShamelOvertimeShateb.entertime);

      if (this.Selected_TblShamelOvertimeShateb.modifyusername != null)
        this.Form.controls['modifyusername'].setValue(this.Selected_TblShamelOvertimeShateb.modifyusername);

      if (this.Selected_TblShamelOvertimeShateb.modifydate != null)
        this.Form.controls['modifydate'].setValue(moment(this.Selected_TblShamelOvertimeShateb.modifydate).toDate());

      if (this.Selected_TblShamelOvertimeShateb.modifytime != null)
        this.Form.controls['modifytime'].setValue(this.Selected_TblShamelOvertimeShateb.modifytime);


      if (this.Selected_TblShamelOvertimeShateb.TBLShamelOvertimeEmployee != null && this.Selected_TblShamelOvertimeShateb.TBLShamelOvertimeEmployee.fullname != null) {
        let emp: TBLShamelOvertimeEmployee =
        {

          fullname: this.Selected_TblShamelOvertimeShateb.TBLShamelOvertimeEmployee.fullname,
          serial: this.Selected_TblShamelOvertimeShateb.TBLShamelOvertimeEmployee.serial,
        }
        this.List_Overtime_employee_Name_Filter = of([emp]);
        this.Form.controls['fullname'].setValue(emp);

      }

    }

  }
  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.Form.controls[control].hasError(error);
  }




  Save() {

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
