import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { debounceTime, finalize, forkJoin, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { IEmployeeNameList } from 'src/app/modules/shared/models/employees_department/IEmployeeNameList';
import { ITBLShamelDocumentType } from 'src/app/modules/shared/models/employees_department/ITBLShamelDocumentType';
import { TBLShamelMonth } from 'src/app/modules/shared/models/employees_department/TBLShamelMonth';
import { TBLShamelYear } from 'src/app/modules/shared/models/employees_department/TBLShamelYear';
import { ViewTBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/ViewTBLSamelEmployee';
import { TBLShamelShatebPunishment } from 'src/app/modules/shared/models/finance_department/shatebtax/TBLShamelShatebPunishment';
import { TBLShamelMonthService } from 'src/app/modules/shared/services/employees_department/tblshamel-month.service';
import { TBLShamelYearService } from 'src/app/modules/shared/services/employees_department/tblshamel-year.service';
import { TblshameldocumenttypeService } from 'src/app/modules/shared/services/employees_department/tblshameldocumenttype.service';
import { ViewTBLShamelEmployeeService } from 'src/app/modules/shared/services/employees_department/view-tbl-shamel-employee.service';
import { TBLShamelNewShatebService } from 'src/app/modules/shared/services/finance_department/payrol/tblshamel-new-shateb.service';
import { TBLShamelShatebPunishmentService } from 'src/app/modules/shared/services/finance_department/shatebtax/tblshamel-shateb-punishment.service';
import { Uniqe } from './validate_formgroup';
import { Validate_ID } from './validate_id';

interface Type {
  value?: string;
  viewValue?: string;
}

@Component({
  selector: 'app-punishment-edit-dialog',
  templateUrl: './punishment-edit-dialog.component.html',
  styleUrls: ['./punishment-edit-dialog.component.scss']
})
export class PunishmentEditDialogComponent implements OnInit {

  Selected_Employee: ViewTBLShamelEmployee;
  isLoading = false;
  Selected_Punishment: TBLShamelShatebPunishment;

  List_DocumentType: ITBLShamelDocumentType[] = [];
  List_DocumentType_Filter: Observable<ITBLShamelDocumentType[]> = of([]);

  List_Employee: ViewTBLShamelEmployee[] = [];
  List_Employee_Filter: Observable<ViewTBLShamelEmployee[]> = of([]);


  Fixed_Month: TBLShamelMonth;
  Fixed_Year: TBLShamelYear;



  Form: FormGroup;





  constructor(

    public frmBuild: FormBuilder,
    public ShamelShatebPunishmentService: TBLShamelShatebPunishmentService,
    public viewTBLShamelEmployeeService: ViewTBLShamelEmployeeService,
    public shameldocumenttypeService: TblshameldocumenttypeService,
    public ShamelNewShatebService: TBLShamelNewShatebService,
    public ShamelMonthService: TBLShamelMonthService,
    public ShamelYearService: TBLShamelYearService,
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
      percent: new FormControl<number | null>(null),
      duration: new FormControl<number | null>(null),
      documenttype_id: new FormControl<number | null>(null),
      documentnum: new FormControl<string | null>(null),
      documentdate: new FormControl<Date | null>(null),
      salary: new FormControl<number | null>(null),
      amount: new FormControl<number | null>(null),
      month_id: new FormControl<number | null>(null),
      year_id: new FormControl<number | null>(null),

      eisalnum: new FormControl<string | null>(null),
      eisaldate: new FormControl<Date | null>(null),

      fullname: new FormControl<ViewTBLShamelEmployee | null>(null),

      docphoto_id: new FormControl<number | null>(null),





    }, Uniqe(this.ShamelShatebPunishmentService)

    );
  }

  BindValue() {
    if (this.Selected_Punishment != null) {
      if (this.Selected_Punishment.amount != null)
        this.Form.controls['amount'].setValue(this.Selected_Punishment.amount);


      if (this.Selected_Punishment.documentdate != null)
        this.Form.controls['documentdate'].setValue(moment(this.Selected_Punishment.documentdate).toDate());
      if (this.Selected_Punishment.documentnum != null)
        this.Form.controls['documentnum'].setValue(this.Selected_Punishment.documentnum);
      if (this.Selected_Punishment.documenttype_id != null)
        this.Form.controls['documenttype_id'].setValue(this.Selected_Punishment.documenttype_id);
      if (this.Selected_Punishment.duration != null)
        this.Form.controls['duration'].setValue(this.Selected_Punishment.duration);

      if (this.Selected_Punishment.eisalnum != null)
        this.Form.controls['eisalnum'].setValue(this.Selected_Punishment.eisalnum);

      if (this.Selected_Punishment.id != null)
        this.Form.controls['id'].setValue(this.Selected_Punishment.id);

      if (this.Selected_Punishment.month_id != null)
        this.Form.controls['month_id'].setValue(this.Selected_Punishment.month_id);

      if (this.Selected_Punishment.year_id != null)
        this.Form.controls['year_id'].setValue(this.Selected_Punishment.year_id);

      if (this.Selected_Punishment.salary != null)
        this.Form.controls['salary'].setValue(this.Selected_Punishment.salary);
      
        if (this.Selected_Punishment.percent != null)
        this.Form.controls['percent'].setValue(this.Selected_Punishment.percent);
      
      if (this.Selected_Punishment.serial != null)
        this.Form.controls['serial'].setValue(this.Selected_Punishment.serial);

      if (this.Selected_Punishment.eisaldate != null)
        this.Form.controls['eisaldate'].setValue(moment(this.Selected_Punishment.eisaldate).toDate());


        if (this.Selected_Punishment.TBLShamelEmployee != null && this.Selected_Punishment.TBLShamelEmployee.FullName!= null)
        {
          let emp :ViewTBLShamelEmployee =
          {
            fName:this.Selected_Punishment.TBLShamelEmployee.FName,
            father: this.Selected_Punishment.TBLShamelEmployee.Father,
            fullname:this.Selected_Punishment.TBLShamelEmployee.FullName,
            mother:this.Selected_Punishment.TBLShamelEmployee.Mother,
            id : this.Selected_Punishment.TBLShamelEmployee.id,
            lname:this.Selected_Punishment.TBLShamelEmployee.LName
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
      this.LoadYear()

      ]
    ).subscribe(res => {

      this.Selected_Punishment = this.data;


      this.shameldocumenttypeService.List_ITBLShamelDocumentType = res[0];
      this.shameldocumenttypeService.List_ITBLShamelDocumentType_BehaviorSubject.next(res[0]);
      this.List_DocumentType = res[0];
      this.List_DocumentType_Filter = of(res[0]);


      this.Fixed_Month = res[1];
      this.Fixed_Year = res[2];


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
      //shateb_number : this.Form.controls['shateb_number'].value,
      percent : this.Form.controls['percent'].value,
      year_id : this.Form.controls['year_id'].value,


    };
   if (this.Form.controls['serial'].value == null || this.Form.controls['serial'].value == undefined || this.Form.controls['serial'].value <0)
     this.ShamelShatebPunishmentService.add(obj);
     else 
     this.ShamelShatebPunishmentService.update(obj);

   
    }


}
