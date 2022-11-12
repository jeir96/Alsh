import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Observable, of, forkJoin, debounceTime, tap, switchMap, finalize, startWith, map } from 'rxjs';
import { ITBLShamelDocumentType } from 'src/app/modules/shared/models/employees_department/ITBLShamelDocumentType';
import { TBLShamelMonth } from 'src/app/modules/shared/models/employees_department/TBLShamelMonth';
import { TBLShamelYear } from 'src/app/modules/shared/models/employees_department/TBLShamelYear';
import { ViewTBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/ViewTBLSamelEmployee';
import { TBLShamelShatebPunishment } from 'src/app/modules/shared/models/finance_department/shatebtax/TBLShamelShatebPunishment';
import { TBLShamelShatebVartax } from 'src/app/modules/shared/models/finance_department/shatebtax/TBLShamelShatebVartax';
import { TblShamelVarTax } from 'src/app/modules/shared/models/finance_department/shatebtax/TblShamelVarTax';
import { TBLShamelMonthService } from 'src/app/modules/shared/services/employees_department/tblshamel-month.service';
import { TBLShamelYearService } from 'src/app/modules/shared/services/employees_department/tblshamel-year.service';
import { TblshameldocumenttypeService } from 'src/app/modules/shared/services/employees_department/tblshameldocumenttype.service';
import { ViewTBLShamelEmployeeService } from 'src/app/modules/shared/services/employees_department/view-tbl-shamel-employee.service';
import { TBLShamelNewShatebService } from 'src/app/modules/shared/services/finance_department/payrol/tblshamel-new-shateb.service';
import { TblShamelVarTaxService } from 'src/app/modules/shared/services/finance_department/shatebtax/tbl-shamel-var-tax.service';
import { TBLShamelShatebVarTaxService } from 'src/app/modules/shared/services/finance_department/shatebtax/tblshamel-shateb-var-tax.service';

import { Validate_ID } from '../../shatebhealth/health-edit-dialog/validate_id';
import { PunishmentEditDialogComponent } from '../../shatebpunishment/punishment-edit-dialog/punishment-edit-dialog.component';
import { Uniqe } from './validate_formgroup';

@Component({
  selector: 'app-var-tax-edit-dialog',
  templateUrl: './var-tax-edit-dialog.component.html',
  styleUrls: ['./var-tax-edit-dialog.component.scss']
})
export class VarTaxEditDialogComponent implements OnInit {
  Selected_Employee: ViewTBLShamelEmployee;
  isLoading = false;
  Selected_TBLShamelShatebVarTax: TBLShamelShatebVartax;

  List_DocumentType: ITBLShamelDocumentType[] = [];
  List_DocumentType_Filter: Observable<ITBLShamelDocumentType[]> = of([]);

  List_Employee: ViewTBLShamelEmployee[] = [];
  List_Employee_Filter: Observable<ViewTBLShamelEmployee[]> = of([]);


  Fixed_Month: TBLShamelMonth;
  Fixed_Year: TBLShamelYear;


  List_TblShamelVarTax: TblShamelVarTax[] = [];
  List_TblShamelVarTax_Filter: Observable<TblShamelVarTax[]> = of([]);


  Form: FormGroup;





  constructor(
    public ShamelNewShatebService: TBLShamelNewShatebService,
   
    private frmBuild:FormBuilder,
    private ShamelShatebVarTaxService: TBLShamelShatebVarTaxService,
    private ShamelVarTaxService: TblShamelVarTaxService,    
    public shameldocumenttypeService: TblshameldocumenttypeService,
    public viewTBLShamelEmployeeService: ViewTBLShamelEmployeeService,
    public ShamelMonthService: TBLShamelMonthService,
    public ShamelYearService: TBLShamelYearService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PunishmentEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TBLShamelShatebPunishment,

  ) {

    this.BuildForm();

    this.LoadData();



  }

  BuildForm() {

    this.Form = this.frmBuild.group({
      id: new FormControl<number | null>(null, [Validators.required], [Validate_ID(this.viewTBLShamelEmployeeService)]),
      serial: new FormControl<number | null>(null),     
      duration: new FormControl<number | null>(null),
      documenttype_id: new FormControl<number | null>(null),
      documentnum: new FormControl<string | null>(null),
      documentdate: new FormControl<Date | null>(null),
      salary: new FormControl<number | null>(null),
      amount: new FormControl<number | null>(null),
      month_id: new FormControl<number | null>(null),
      year_id: new FormControl<number | null>(null),
      vartax_id: new FormControl<number | null>(null),
      eisalnum: new FormControl<string | null>(null),
      eisaldate: new FormControl<Date | null>(null),

      fullname: new FormControl<ViewTBLShamelEmployee | null>(null),

      docphoto_id: new FormControl<number | null>(null),

    }, Uniqe(this.ShamelShatebVarTaxService)

    );
  }

  BindValue() {
    if (this.Selected_TBLShamelShatebVarTax != null) {
      if (this.Selected_TBLShamelShatebVarTax.amount != null)
        this.Form.controls['amount'].setValue(this.Selected_TBLShamelShatebVarTax.amount);


      if (this.Selected_TBLShamelShatebVarTax.documentdate != null)
        this.Form.controls['documentdate'].setValue(moment(this.Selected_TBLShamelShatebVarTax.documentdate).toDate());
      if (this.Selected_TBLShamelShatebVarTax.documentnum != null)
        this.Form.controls['documentnum'].setValue(this.Selected_TBLShamelShatebVarTax.documentnum);
      if (this.Selected_TBLShamelShatebVarTax.documenttype_id != null)
        this.Form.controls['documenttype_id'].setValue(this.Selected_TBLShamelShatebVarTax.documenttype_id);
      if (this.Selected_TBLShamelShatebVarTax.duration != null)
        this.Form.controls['duration'].setValue(this.Selected_TBLShamelShatebVarTax.duration);

      if (this.Selected_TBLShamelShatebVarTax.eisalnum != null)
        this.Form.controls['eisalnum'].setValue(this.Selected_TBLShamelShatebVarTax.eisalnum);

      if (this.Selected_TBLShamelShatebVarTax.id != null)
        this.Form.controls['id'].setValue(this.Selected_TBLShamelShatebVarTax.id);

      if (this.Selected_TBLShamelShatebVarTax.month_id != null)
        this.Form.controls['month_id'].setValue(this.Selected_TBLShamelShatebVarTax.month_id);

      if (this.Selected_TBLShamelShatebVarTax.year_id != null)
        this.Form.controls['year_id'].setValue(this.Selected_TBLShamelShatebVarTax.year_id);

      if (this.Selected_TBLShamelShatebVarTax.salary != null)
        this.Form.controls['salary'].setValue(this.Selected_TBLShamelShatebVarTax.salary);



      if (this.Selected_TBLShamelShatebVarTax.serial != null)
        this.Form.controls['serial'].setValue(this.Selected_TBLShamelShatebVarTax.serial);

      if (this.Selected_TBLShamelShatebVarTax.eisaldate != null)
        this.Form.controls['eisaldate'].setValue(moment(this.Selected_TBLShamelShatebVarTax.eisaldate).toDate());

        if (this.Selected_TBLShamelShatebVarTax.TBLShamelEmployee != null && this.Selected_TBLShamelShatebVarTax.TBLShamelEmployee.FullName!= null)
        {
          let emp :ViewTBLShamelEmployee =
          {
            fName:this.Selected_TBLShamelShatebVarTax.TBLShamelEmployee.FName,
            father: this.Selected_TBLShamelShatebVarTax.TBLShamelEmployee.Father,
            fullname:this.Selected_TBLShamelShatebVarTax.TBLShamelEmployee.FullName,
            mother:this.Selected_TBLShamelShatebVarTax.TBLShamelEmployee.Mother,
            id : this.Selected_TBLShamelShatebVarTax.TBLShamelEmployee.id,
            lname:this.Selected_TBLShamelShatebVarTax.TBLShamelEmployee.LName
          }
          this.List_Employee_Filter = of ([emp]);
          this.Form.controls['fullname'].setValue(emp);
  
        }

    }

  }




  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  displayFn(emp: ViewTBLShamelEmployee) {
    if (emp != null && emp.id > 0) {

      return emp.fullname;
    }
    return '';
  }



  onEmployeeSelected(event: MatAutocompleteSelectedEvent) {
    if (event.option.value == null)
      return;
    var emp = event.option.value;

    const id = emp.id;

    this.Form.controls['id'].setValue(id);

    if (id != null && id > 0) {
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




  LoadVarTax(): Observable<TblShamelVarTax[]> {
    if (this.ShamelVarTaxService.List_TblShamelVarTax == null ||
      this.ShamelVarTaxService.List_TblShamelVarTax == undefined ||
      this.ShamelVarTaxService.List_TblShamelVarTax.length == 0)
      return this.ShamelVarTaxService.list();
    return of(this.ShamelVarTaxService.List_TblShamelVarTax);
  }


  OnIdChange($event: any) {
    let id = this.Form.controls['id'].value;
    this.viewTBLShamelEmployeeService.search_by_id(id).subscribe
      ((data: ViewTBLShamelEmployee) => {
        if (data != null ) {
          //   this.Form.controls['id'].setErrors({ match: false, notUnique: true });

        } else {

        }
      });


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




  LoadData() {
    forkJoin(
      [this.LoadDocument(),
      this.LoadMonth(),
      this.LoadYear(),
      this.LoadVarTax()

      ]
    ).subscribe(res => {

      this.Selected_TBLShamelShatebVarTax = this.data;


      this.shameldocumenttypeService.List_ITBLShamelDocumentType = res[0];
      this.shameldocumenttypeService.List_ITBLShamelDocumentType_BehaviorSubject.next(res[0]);
      this.List_DocumentType = res[0];
      this.List_DocumentType_Filter = of(res[0]);


      this.Fixed_Month = res[1];
      this.Fixed_Year = res[2];


      this.ShamelVarTaxService.List_TblShamelVarTax = res[3];
      this.ShamelVarTaxService.List_TblShamelVarTax_BehaviorSubject.next(res[3]);
      this.List_TblShamelVarTax = res[3];
      this.List_TblShamelVarTax_Filter = of(res[3]);


      if (this.Form != null) {




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


      }

      this.BindValue();

    },
      (error) => console.log(error));

  }




  save() {
    let obj : TBLShamelShatebPunishment =
    {
      amount : this.Form.controls['amount'].value,
      documentdate : this.Form.controls['documentdate'].value,
      documentnum : this.Form.controls['documentnum'].value,
      documenttype_id : this.Form.controls['documenttype_id'].value,
      duration : this.Form.controls['duration'].value,
      eisalnum : this.Form.controls['eisalnum'].value,
      eisaldate : this.Form.controls['eisaldate'].value,

      id : this.Form.controls['id'].value,
      month_id : this.Form.controls['month_id'].value,
      salary : this.Form.controls['salary'].value,
      serial : this.Form.controls['serial'].value,    
      percent : this.Form.controls['percent'].value,
      year_id : this.Form.controls['year_id'].value,


    };
   if (this.Form.controls['serial'].value == null || this.Form.controls['serial'].value == undefined || this.Form.controls['serial'].value <0)
     this.ShamelShatebVarTaxService.add(obj);
     else 
     this.ShamelShatebVarTaxService.update(obj);

   
    }


}
