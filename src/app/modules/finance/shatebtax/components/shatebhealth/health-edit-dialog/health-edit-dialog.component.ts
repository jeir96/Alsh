import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { debounceTime, finalize, map, Observable, startWith, switchMap, tap, of, forkJoin } from 'rxjs';
import { IEmployeeNameList } from 'src/app/modules/shared/models/employees_department/IEmployeeNameList';
import { ITBLShamelDocumentType } from 'src/app/modules/shared/models/employees_department/ITBLShamelDocumentType';
import { TBLShamelMonth } from 'src/app/modules/shared/models/employees_department/TBLShamelMonth';
import { TBLShamelYear } from 'src/app/modules/shared/models/employees_department/TBLShamelYear';
import { ViewTBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/ViewTBLSamelEmployee';
import { TbLShamelHealthNoSalary } from 'src/app/modules/shared/models/finance_department/shatebtax/TbLShamelHealthNoSalary';
import { TBLShamelShatebHealth } from 'src/app/modules/shared/models/finance_department/shatebtax/TBLShamelShatebHealth';
import { TBLShamelMonthService } from 'src/app/modules/shared/services/employees_department/tblshamel-month.service';
import { TBLShamelYearService } from 'src/app/modules/shared/services/employees_department/tblshamel-year.service';
import { TblshameldocumenttypeService } from 'src/app/modules/shared/services/employees_department/tblshameldocumenttype.service';
import { ViewTBLShamelEmployeeService } from 'src/app/modules/shared/services/employees_department/view-tbl-shamel-employee.service';
import { TBLShamelNewShatebService } from 'src/app/modules/shared/services/finance_department/payrol/tblshamel-new-shateb.service';
import { TbLShamelHealthNoSalaryService } from 'src/app/modules/shared/services/finance_department/shatebtax/tbl-shamel-health-no-salary.service';
import { TBLShamelShatebHealthService } from 'src/app/modules/shared/services/finance_department/shatebtax/tblshamel-shateb-health.service';
import { Uniqe } from './validate_formgroup';
import { Validate_ID } from './validate_id';


@Component({
  selector: 'app-health-edit-dialog',
  templateUrl: './health-edit-dialog.component.html',
  styleUrls: ['./health-edit-dialog.component.scss']
})
export class HealthEditDialogComponent implements OnInit {

  private readonly _matDialogRef: MatDialogRef<HealthEditDialogComponent>;

  Selected_Employee : ViewTBLShamelEmployee;

  Selected_Health: TBLShamelShatebHealth;

  List_DocumentType: ITBLShamelDocumentType[] = [];
  List_DocumentType_Filter: Observable<ITBLShamelDocumentType[]> = of([]);

  List_HealthNoSalary: TbLShamelHealthNoSalary[] = [];
  List_HealthNoSalary_Filter: Observable<TbLShamelHealthNoSalary[]> = of([]);

  List_Employee: ViewTBLShamelEmployee[] = [];
  List_Employee_Filter: Observable<ViewTBLShamelEmployee[]> = of([]);


  Fixed_Month: TBLShamelMonth;
  Fixed_Year: TBLShamelYear;

  isLoading = false;

  Form: FormGroup;

  constructor(
    public frmBuild:FormBuilder,
    public viewTBLShamelEmployeeService: ViewTBLShamelEmployeeService,
    public dialogRef: MatDialogRef<HealthEditDialogComponent>,
    public shamelHealthNoSalaryService: TbLShamelHealthNoSalaryService,
    public shameldocumenttypeService: TblshameldocumenttypeService,
    public ShamelNewShatebService: TBLShamelNewShatebService,
    public ShamelMonthService: TBLShamelMonthService,
    public ShamelYearService: TBLShamelYearService,
    public ShamelShatebHealthService: TBLShamelShatebHealthService,
    @Inject(MAT_DIALOG_DATA) public data: TBLShamelShatebHealth) {

      this._matDialogRef= dialogRef;


    this.BuildForm();

    this.LoadData();




  }
  ngOnInit(): void {

    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    matDialogConfig.position = { top: `100px` };
    this._matDialogRef.updatePosition(matDialogConfig.position);


  }

  displayFn(emp : ViewTBLShamelEmployee) {
    if (emp!= null && emp.id >0  ) {

        return emp.fullname;
    }
    return '';
  }

  
  
  onEmployeeSelected(event: MatAutocompleteSelectedEvent) {
    if (event.option.value == null )
      return;
    var emp =event.option.value;

    const  id = emp.id;

    this.Form.controls['id'].setValue(id) ;

    if (id != null && id >0 ) {
      this.Form.controls['id'].setValue(id);
      this.ShamelNewShatebService.GetNetCash(id, this.Fixed_Year.year_id, this.Fixed_Month.month_id).subscribe
        (
          data => {
            this.Form.controls['salary'].setValue(data.netcash);
          }
        )


    }

  }

  private _filteredDocumentType(value: string): ITBLShamelDocumentType[] {
    if (value) {
      const filterValue = value;
      return this.List_DocumentType.filter(obj => obj.documenttype_name.includes(filterValue));

    }
    return this.List_DocumentType.slice();
  }

 

  onDocumentSelected(event: MatAutocompleteSelectedEvent) {
    if (event.option.value == null || event.option.value.id == null || event.option.value.id <= 0)
      return;

    var document = event.option.value as ITBLShamelDocumentType;

    const id = document.documenttype_id;
    if (id != null) {
      this.Form.controls['documenttype_id'].setValue(id);

    }

  }
  //#region  Display Display Member
  public displayDocumentTypeProperty(value: string): string {
    if (value && this.List_DocumentType) {
      let documentType: any = this.List_DocumentType.find(crs => crs.documenttype_id.toString() == value);
      if (documentType)
        return documentType.documenttype_name;
    }
    return '';
  }

  private _filteredHealthNoSalary(value: string): TbLShamelHealthNoSalary[] {
    if (value) {
      const filterValue = value;
      return this.List_HealthNoSalary.filter(obj => obj.healthnosalary_name.includes(filterValue));

    }
    return this.List_HealthNoSalary.slice();
  }


  DisplayHealthNoSalary(healthNoSalary: TbLShamelHealthNoSalary) {

    if (healthNoSalary != null) {
      return healthNoSalary.healthnosalary_name;
    }
    return '';
  }



  OnIdChange($event: any) {
    let id = this.Form.controls['id'].value;
    this.viewTBLShamelEmployeeService.search_by_id(id).subscribe
      ((data: ViewTBLShamelEmployee) => {
      
      });


  }
  //#endregion



  onHealthNoSalarySelected(event: MatAutocompleteSelectedEvent) {
    if (event.option.value == null || event.option.value.id == null || event.option.value.id <= 0)
      return;

    var document = event.option.value as TbLShamelHealthNoSalary;

    const healthnosalary_name = document.healthnosalary_name;
    if (healthnosalary_name != null) {
      this.Form.controls['healthnosalary_name'].setValue(healthnosalary_name);

    }

  }

  LoadDocument(): Observable<ITBLShamelDocumentType[]> {
    if (this.shameldocumenttypeService.List_ITBLShamelDocumentType == null ||
      this.shameldocumenttypeService.List_ITBLShamelDocumentType == undefined ||
      this.shameldocumenttypeService.List_ITBLShamelDocumentType.length == 0)
      return this.shameldocumenttypeService.list();
    return of(this.shameldocumenttypeService.List_ITBLShamelDocumentType);
  }


 

  LoadMonth(): Observable<TBLShamelMonth> {
    return this.ShamelMonthService.GetMonthFixed();

  }


  LoadYear(): Observable<TBLShamelYear> {

    return this.ShamelYearService.GetYearFixed();

  }


  LoadHealthNoSalaray(): Observable<TbLShamelHealthNoSalary[]> {
    if (this.shamelHealthNoSalaryService.List_TbLShamelHealthNoSalary == null ||
      this.shamelHealthNoSalaryService.List_TbLShamelHealthNoSalary == undefined ||
      this.shamelHealthNoSalaryService.List_TbLShamelHealthNoSalary.length == 0)
      return this.shamelHealthNoSalaryService.list();
    return of(this.shamelHealthNoSalaryService.List_TbLShamelHealthNoSalary);
  }

  LoadData() {
    forkJoin(
      [this.LoadDocument(),
      this.LoadHealthNoSalaray(),
      this.LoadMonth(),
      this.LoadYear()

      ]
    ).subscribe(res => {

      this.Selected_Health = this.data;

      this.shamelHealthNoSalaryService.List_TbLShamelHealthNoSalary = res[1];
      this.shamelHealthNoSalaryService.List_TbLShamelHealthNoSalary_BehaviorSubject.next(res[1]);
      this.List_HealthNoSalary = res[1];
      this.List_HealthNoSalary_Filter = of(res[1]);

      this.shameldocumenttypeService.List_ITBLShamelDocumentType = res[0];
      this.shameldocumenttypeService.List_ITBLShamelDocumentType_BehaviorSubject.next(res[0]);
      this.List_DocumentType = res[0];
      this.List_DocumentType_Filter = of(res[0]);


      this.Fixed_Month = res[2];
      this.Fixed_Year = res[3];

     
      if (this.Form!= null)
      {

     


      this.Form.controls['fullname']
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap((value: string) => this.viewTBLShamelEmployeeService.getEmpFullName2(value)
          .pipe(
            finalize(() => this.isLoading = false),
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


    this.List_DocumentType_Filter = this.Form.controls['documenttype_id'].valueChanges
      .pipe(
        startWith(''),
        map(value => value && typeof value === 'string' ? this._filteredDocumentType(value) : this.List_DocumentType.slice())
      );


    this.List_HealthNoSalary_Filter = this.Form.controls['healthnosalary_name'].valueChanges
      .pipe(
        startWith(''),
        map(value => value && typeof value === 'string' ? this._filteredHealthNoSalary(value) : this.List_HealthNoSalary.slice())
      );
    }

      this.BindValue();

    }    , 
    (error) => console.log(error));

  }

  BuildForm() {

    this.Form = this.frmBuild.group({
      id: new FormControl<number | null>(null,[Validators.required], [Validate_ID(this.viewTBLShamelEmployeeService)] ),
     
      fullname: new FormControl<ViewTBLShamelEmployee | null>(null),
      healthnosalary_name: new FormControl<string | null>(null),
      duration: new FormControl<number | null>(null),
      startdate: new FormControl<Date | null>(null),
      documenttype_id: new FormControl<number | null>(null),

      documentnum: new FormControl<string | null>(null),
      documentdate: new FormControl<Date | null>(null),
      salary: new FormControl<number | null>(null),
      amount: new FormControl<number | null>(null),
      serial: new FormControl<number | null>(null),
      month_id: new FormControl<number | null>(null),
      year_id: new FormControl<number | null>(null),
    }, Uniqe(this.ShamelShatebHealthService)

    );
  }

  BindValue() {
    if (this.Selected_Health != null) {
      if (this.Selected_Health.amount != null)
        this.Form.controls['amount'].setValue(this.Selected_Health.amount);


      if (this.Selected_Health.documentdate != null)
        this.Form.controls['documentdate'].setValue(moment(this.Selected_Health.documentdate).toDate());
      if (this.Selected_Health.documentnum != null)
        this.Form.controls['documentnum'].setValue(this.Selected_Health.documentnum);
      if (this.Selected_Health.documenttype_id != null)

        this.Form.controls['documenttype_id'].setValue(this.Selected_Health.documenttype_id);
      if (this.Selected_Health.duration != null)
        this.Form.controls['duration'].setValue(this.Selected_Health.duration);

      if (this.Selected_Health.healthnosalary_name != null)
        this.Form.controls['healthnosalary_name'].setValue(this.Selected_Health.healthnosalary_name);
      if (this.Selected_Health.id != null)
        this.Form.controls['id'].setValue(this.Selected_Health.id);

      if (this.Selected_Health.month_id != null)
        this.Form.controls['month_id'].setValue(this.Selected_Health.month_id);

      if (this.Selected_Health.year_id != null)
        this.Form.controls['year_id'].setValue(this.Selected_Health.year_id);

      if (this.Selected_Health.salary != null)
        this.Form.controls['salary'].setValue(this.Selected_Health.salary);

        

      if (this.Selected_Health.TBLShamelEmployee != null && this.Selected_Health.TBLShamelEmployee.FullName!= null)
      {
        let emp :ViewTBLShamelEmployee =
        {
          fName:this.Selected_Health.TBLShamelEmployee.FName,
          father: this.Selected_Health.TBLShamelEmployee.Father,
          fullname:this.Selected_Health.TBLShamelEmployee.FullName,
          mother:this.Selected_Health.TBLShamelEmployee.Mother,
          id : this.Selected_Health.TBLShamelEmployee.id,
          lname:this.Selected_Health.TBLShamelEmployee.LName
        }
        this.List_Employee_Filter = of ([emp]);
        this.Form.controls['fullname'].setValue(emp);

      }
        



        /*
      if (this.Selected_Health.shateb_number != null)
        this.Form.controls['shateb_number'].setValue(this.Selected_Health.shateb_number);
*/

      if (this.Selected_Health.serial != null)
        this.Form.controls['serial'].setValue(this.Selected_Health.serial);

      if (this.Selected_Health.startdate != null)
        this.Form.controls['startdate'].setValue(moment(this.Selected_Health.startdate).toDate());



    }

  }







  save() {
    
    let obj : TBLShamelShatebHealth =
    {
      amount : this.Form.controls['amount'].value,
      documentdate : this.Form.controls['documentdate'].value,
      documentnum : this.Form.controls['documentnum'].value,
      documenttype_id : this.Form.controls['documenttype_id'].value,
      duration : this.Form.controls['duration'].value,
      healthnosalary_name : this.Form.controls['healthnosalary_name'].value,
      id : this.Form.controls['id'].value,
      month_id : this.Form.controls['month_id'].value,
      salary : this.Form.controls['salary'].value,
      serial : this.Form.controls['serial'].value,
      //shateb_number : this.Form.controls['shateb_number'].value,
      startdate : this.Form.controls['startdate'].value,
      year_id : this.Form.controls['year_id'].value,


    };
   if (this.Form.controls['serial'].value == null || this.Form.controls['serial'].value == undefined || this.Form.controls['serial'].value <0)
     this.ShamelShatebHealthService.add(obj);
     else 
     this.ShamelShatebHealthService.update(obj);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }




}
