
import { Component, OnInit, AfterViewInit, Input, Inject, NgZone, OnDestroy } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder, Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { Observable, of, startWith, map, Subscription, combineLatest, forkJoin } from 'rxjs';
import { ITBLShamelChangeReason } from 'src/app/modules/shared/models/employees_department/ITBLShamelChangeReason';
import { ITBLShamelClass } from 'src/app/modules/shared/models/employees_department/ITBLShamelClass';
import { ITBLShamelDepartment } from 'src/app/modules/shared/models/employees_department/ITBLShamelDepartment';
import { ITBLShamelDocumentType } from 'src/app/modules/shared/models/employees_department/ITBLShamelDocumentType';
import { ITBLShamelIncMarsoom } from 'src/app/modules/shared/models/employees_department/ITBLShamelIncMarsoom';
import { ITBLShamelJobKind } from 'src/app/modules/shared/models/employees_department/ITBLShamelJobKind';
import { ITBLShamelJobName } from 'src/app/modules/shared/models/employees_department/ITBLShamelJobName';
import { ITBLShamelSCJobState } from 'src/app/modules/shared/models/employees_department/ITBLShamelSCJobState';
import { TBLShamelSCFreeHolidayService } from 'src/app/modules/shared/services/employees_department/tblshamel-scfree-holiday.service';
import { TblshamelchangereasonService } from 'src/app/modules/shared/services/employees_department/tblshamelchangereason.service';
import { TblshamelclassService } from 'src/app/modules/shared/services/employees_department/tblshamelclass.service';
import { TblshameldepartmentService } from 'src/app/modules/shared/services/employees_department/tblshameldepartment.service';
import { TblshameldocumenttypeService } from 'src/app/modules/shared/services/employees_department/tblshameldocumenttype.service';
import { TblshamelincmarsoomService } from 'src/app/modules/shared/services/employees_department/tblshamelincmarsoom.service';
import { TblshameljobkindService } from 'src/app/modules/shared/services/employees_department/tblshameljobkind.service';
import { TblshameljobnameService } from 'src/app/modules/shared/services/employees_department/tblshameljobname.service';
import { TblshamelscjobstateService } from 'src/app/modules/shared/services/employees_department/tblshamelscjobstate.service';
import { EmployeePageService } from '../../employee-page-service';

const moment = _moment;

@Component({
  selector: 'app-tblshamelscjobstatemodify',
  templateUrl: './tblshamelscjobstatemodify.component.html',
  styleUrls: ['./tblshamelscjobstatemodify.component.scss']
})
export class TblshamelscjobstatemodifyComponent implements OnInit, AfterViewInit, OnDestroy {
  //Link To Employee 
  id_employee: number;
  Selected_Emp: ITBLShamelSCJobState = {};

  _Selected_Employee_JobState: ITBLShamelSCJobState = {};

  @Input() set Selected_Employee_JobState(obj: ITBLShamelSCJobState) {
    this._Selected_Employee_JobState = obj;

    if (this._Selected_Employee_JobState != null &&
      this._Selected_Employee_JobState != undefined &&
      this._Selected_Employee_JobState.serial != null &&
      this._Selected_Employee_JobState.serial > 0) {


    }
  }

  get Selected_Employee_JobState(): ITBLShamelSCJobState {
    return this._Selected_Employee_JobState;
  }


  //Array Of AutoComplere With Filter
  Marsoom_List: ITBLShamelIncMarsoom[] = [];
  filteredMarsoomOptions: Observable<ITBLShamelIncMarsoom[]>;


  Department_List: ITBLShamelDepartment[] = [];
  filteredDepartmentOptions: Observable<ITBLShamelDepartment[]>;

  JobName_List: ITBLShamelJobName[] = [];
  filteredJobNameOptions: Observable<ITBLShamelJobName[]>;

  JobKind_List: ITBLShamelJobKind[] = [];
  filteredJobKindOptions: Observable<ITBLShamelJobKind[]>;


  DocumentType_List: ITBLShamelDocumentType[] = [];
  filteredDocumentTypeOptions: Observable<ITBLShamelDocumentType[]>;

  Class_List: ITBLShamelClass[] = [];
  filteredClassOptions: Observable<ITBLShamelClass[]>;

  ChangeReason_List: ITBLShamelChangeReason[] = [];
  filteredChangeReasonOptions: Observable<ITBLShamelChangeReason[]>;

  _Subscription: Subscription;

  // Access To Element in Form
  Form: FormGroup;
  serial: FormControl<number | null>;
  id: FormControl<number | null>;
  incmarsoom_id: FormControl<number | null>;
  changedate: FormControl<Date | null>;
  doc_date: FormControl<Date | null>;
  begindate: FormControl<Date | null>;
  doc_number: FormControl<string | null>;
  salary: FormControl<number | null>;
  changereason_id: FormControl<number | null>;
  documenttype_id: FormControl<number | null>;
  department_id: FormControl<number | null>;
  jobname_id: FormControl<number | null>;
  jobkind_id: FormControl<number | null>;
  class_id: FormControl<number | null>;




  submitted = false;


  //#region Constuctor 
  constructor(
    public PageService: EmployeePageService,
    @Inject(MAT_DIALOG_DATA) public data: { obj: ITBLShamelSCJobState, id: number },
    public jobstateService: TblshamelscjobstateService,
    public marsoomService: TblshamelincmarsoomService,
    public departmentService: TblshameldepartmentService,
    public jobNameService: TblshameljobnameService,
    public jobKindService: TblshameljobkindService,
    public documentTypeService: TblshameldocumenttypeService,
    public classService: TblshamelclassService,
    public changereasonService: TblshamelchangereasonService,
    private fb: FormBuilder,
    private ngZone: NgZone,
  ) {

    if (data != null && data.obj != null && data.id != null && data.id > 0) {
      this.id_employee = data.id;
      this.Selected_Employee_JobState = data.obj;
    }
    this.BuildForm();
    this.Load_Data();

  }
  ngOnDestroy(): void {

    this._Subscription.unsubscribe();
  }

  Load_TBLShamelChangeReason(): Observable<ITBLShamelChangeReason[]> {
    if (this.changereasonService.List_ITBLShamelChangeReason == null ||
      this.changereasonService.List_ITBLShamelChangeReason == undefined ||
      this.changereasonService.List_ITBLShamelChangeReason.length == 0)
      return this.changereasonService.list();
    return of(this.changereasonService.List_ITBLShamelChangeReason);
  }




  Load_TBLShamelIncMarsoom(): Observable<ITBLShamelIncMarsoom[]> {
    if (this.marsoomService.List_ITBLShamelIncMarsoom == null ||
      this.marsoomService.List_ITBLShamelIncMarsoom == undefined ||
      this.marsoomService.List_ITBLShamelIncMarsoom.length == 0)
      return this.marsoomService.list();
    return of(this.marsoomService.List_ITBLShamelIncMarsoom);

  }




  Load_TBLShamelDepartment(): Observable<ITBLShamelDepartment[]> {
    if (this.departmentService.List_ITBLShamelDepartment == null ||
      this.departmentService.List_ITBLShamelDepartment == undefined ||
      this.departmentService.List_ITBLShamelDepartment.length == 0)
      return this.departmentService.list();

    return of(this.departmentService.List_ITBLShamelDepartment);



  }



  Load_ITBLShamelJobName(): Observable<ITBLShamelJobName[]> {
    if (this.jobNameService.list_ITBLShamelJobName == null ||
      this.jobNameService.list_ITBLShamelJobName == undefined ||
      this.jobNameService.list_ITBLShamelJobName.length == 0)
      return this.jobNameService.list();
    return of(this.jobNameService.list_ITBLShamelJobName);
  }

  Load_ITBLShamelJobKind(): Observable<ITBLShamelJobKind[]> {
    if (this.jobKindService.list_ITBLShamelJobKind == null ||
      this.jobKindService.list_ITBLShamelJobKind == undefined ||
      this.jobKindService.list_ITBLShamelJobKind.length == 0)
      return this.jobKindService.list();
    return of(this.jobKindService.list_ITBLShamelJobKind);
  }


  Load_TBLShamelDocumentType(): Observable<ITBLShamelDocumentType[]> {
    if (this.documentTypeService.List_ITBLShamelDocumentType == null ||
      this.documentTypeService.List_ITBLShamelDocumentType == undefined ||
      this.documentTypeService.List_ITBLShamelDocumentType.length == 0)
      return this.documentTypeService.list();
    return of(this.documentTypeService.List_ITBLShamelDocumentType);

  }


  Load_Data() {
    combineLatest([this.PageService.Subject_Selected_TBLShamelEmployee]).subscribe
      (
        res => {
          this.Selected_Emp = res[0];
          if (this.Selected_Emp != null && this.Selected_Emp.id != null)
            this.id_employee = this.Selected_Emp.id;

          this._Subscription = forkJoin(
            this.Load_TBLShamelChangeReason(),
            this.Load_TBLShamelIncMarsoom(),
            this.Load_TBLShamelDepartment(),
            this.Load_ITBLShamelJobName(),
            this.Load_ITBLShamelJobKind(),
            this.Load_TBLShamelDocumentType()
          ).subscribe(
            res => {

              this.ChangeReason_List = res[0];
              this.filteredChangeReasonOptions = of(this.ChangeReason_List);
              this.changereasonService.List_ITBLShamelChangeReason = res[0];
              this.changereasonService.List_ITBLShamelChangeReason_BehaviorSubject.next(this.ChangeReason_List);


              this.Marsoom_List = res[1];
              this.filteredMarsoomOptions = of(this.Marsoom_List);
              this.marsoomService.List_ITBLShamelIncMarsoom = res[1];
              this.marsoomService.List_ITBLShamelIncMarsoom_BehaviorSubject.next(this.Marsoom_List);



              this.Department_List = res[2];
              this.filteredDepartmentOptions = of(this.Department_List);
              this.departmentService.List_ITBLShamelDepartment = res[2];
              this.departmentService.List_ITBLShamelDepartment_BehaviorSubject.next(this.Department_List);

              this.JobName_List = res[3];
              this.filteredJobNameOptions = of(this.JobName_List);
              this.jobNameService.list_ITBLShamelJobName = res[3];
              this.jobNameService.List_ITBLShamelJobName_BehaviorSubject.next(this.JobName_List);


              this.JobKind_List = res[4];
              this.filteredJobKindOptions = of(this.JobKind_List);
              this.jobKindService.list_ITBLShamelJobKind = res[4];
              this.jobKindService.List_ITBLShamelJobKind_BehaviorSubject.next(this.JobKind_List);


              this.DocumentType_List = res[5];
              this.filteredDocumentTypeOptions = of(res[5]);
              this.documentTypeService.List_ITBLShamelDocumentType = res[5];
              this.documentTypeService.List_ITBLShamelDocumentType_BehaviorSubject.next(res[5]);


              this.FillArrayUsingService();

              this.SetValue();
            }
          )
        }
      )
  }

  //#endregion
  public BuildForm() {
    try {
      // Access To Element in Form
      this.Form = this.fb.group(
        {
          'serial': this.serial = new FormControl<number | null>(null, []),
          'id': this.id = new FormControl<number | null>(null, []),
          'incmarsoom_id': this.incmarsoom_id = new FormControl<number | null>(null, []),
          'changedate': this.changedate = new FormControl<Date | null>(null, []),
          'doc_date': this.doc_date = new FormControl<Date | null>(null, []),
          'begindate': this.begindate = new FormControl<Date | null>(null, []),
          'doc_number': this.doc_number = new FormControl<string | null>(null, []),
          'salary': this.salary = new FormControl<number | null>(null, []),
          'changereason_id': this.changereason_id = new FormControl<number | null>(null, []),
          'documenttype_id': this.documenttype_id = new FormControl<number | null>(null, []),
          'department_id': this.department_id = new FormControl<number | null>(null, []),
          'jobname_id': this.jobname_id = new FormControl<number | null>(null, []),
          'jobkind_id': this.jobkind_id = new FormControl<number | null>(null, []),
          'class_id': this.class_id = new FormControl<number | null>(null, []),
        });


    } catch (ex: any) {

    }
  }




  ngAfterViewInit() {

  }

  //#region  Init Component

  ngOnInit(): void {



  }



  public async FillArrayUsingService() {
    try {

      this.filteredMarsoomOptions = this.incmarsoom_id.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredMarsoom(value) : this.Marsoom_List.slice())
        );
    } catch (ex: any) {


    }

    try {

      this.filteredDepartmentOptions = this.department_id.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredDepartment(value) : this.Department_List.slice())
        );

    } catch (ex: any) {
      console.log(ex);

    }


    try {

      this.filteredChangeReasonOptions = this.changereason_id.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredChangeReason(value) : this.ChangeReason_List.slice())
        );

    } catch (ex: any) {


    }


    try {

      this.filteredClassOptions = this.class_id.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredClass(value) : this.Class_List.slice())
        );

    } catch (ex: any) {


    }

    try {

      this.filteredDocumentTypeOptions = this.documenttype_id.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredDocumentType(value) : this.DocumentType_List.slice())
        );
    } catch (ex: any) {
      console.log(ex);

    }

    try {

      this.filteredJobKindOptions = this.jobkind_id.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredJobKind(value) : this.JobKind_List.slice())
        );
    } catch (ex: any) {
      console.log(ex);

    }

    try {

      this.filteredJobNameOptions = this.jobname_id.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredJobName(value) : this.JobName_List.slice())
        );
    } catch (ex: any) {
      console.log(ex);

    }

  }



  private _filteredMarsoom(value: string): ITBLShamelIncMarsoom[] {
    if (value != null) {
      const filterValue = value;
      return this.Marsoom_List.filter(obj => obj.incmarsoomdata.includes(filterValue));
    }
    return this.Marsoom_List.slice();
  }

  private _filteredChangeReason(value: string): ITBLShamelChangeReason[] {
    if (value != null) {
      const filterValue = value;
      return this.ChangeReason_List.filter(obj => obj.changereason_name.includes(filterValue));
    }
    return this.ChangeReason_List.slice();
  }

  private _filteredDepartment(value: string): ITBLShamelDepartment[] {
    if (value != null) {
      const filterValue = value;
      return this.Department_List.filter(obj => obj.department_name.includes(filterValue));
    }
    return this.Department_List.slice();
  }

  private _filteredJobKind(value: string): ITBLShamelJobKind[] {
    if (value != null) {
      const filterValue = value;
      return this.JobKind_List.filter(obj => obj.jobkind_name.includes(filterValue));

    }
    return this.JobKind_List.slice();
  }
  private _filteredJobName(value: string): ITBLShamelJobName[] {
    if (value != null) {
      const filterValue = value;
      return this.JobName_List.filter(obj => obj.jobname_name.includes(filterValue));

    }
    return this.JobName_List.slice();
  }

  private _filteredDocumentType(value: string): ITBLShamelDocumentType[] {
    if (value != null) {
      const filterValue = value;
      return this.DocumentType_List.filter(obj => obj.documenttype_name.includes(filterValue));
    }
    return this.DocumentType_List.slice();
  }

  private _filteredClass(value: string): ITBLShamelClass[] {
    if (value != null) {
      const filterValue = value;
      return this.Class_List.filter(obj => obj.class_name.includes(filterValue));
    }
    return this.Class_List.slice();
  }

  //#endregion


  //#region SetValue And GetValue Function
  public ClearForm() {
    try {
      this.Form.reset();
    } catch (ex: any) {
      console.log(ex);

    }

  }


  //#region SetValue And GetValue Function
  public SetValue() {
    console.log(this.Selected_Employee_JobState);

    try {
      if (this.Selected_Employee_JobState != null &&
        this.Selected_Employee_JobState != undefined

      ) {

        if (this.Selected_Employee_JobState.serial != null &&
          this.Selected_Employee_JobState.serial != undefined)
          this.serial.setValue(this.Selected_Employee_JobState.serial);

        if (this.Selected_Employee_JobState.id != null &&
          this.Selected_Employee_JobState.id != undefined)
          this.serial.setValue(this.Selected_Employee_JobState.id);


        if (this.Selected_Employee_JobState.changedate != null &&
          this.Selected_Employee_JobState.changedate != undefined)
          this.changedate.setValue(moment(this.Selected_Employee_JobState.changedate).toDate());

        if (this.Selected_Employee_JobState.begindate != null &&
          this.Selected_Employee_JobState.begindate != undefined)
          this.begindate.setValue(moment(this.Selected_Employee_JobState.begindate).toDate());

        if (this.Selected_Employee_JobState.doc_date != null &&
          this.Selected_Employee_JobState.doc_date != undefined)
          this.doc_date.setValue(moment(this.Selected_Employee_JobState.doc_date).toDate());


        if (this.Selected_Employee_JobState.class_id != null &&
          this.Selected_Employee_JobState.class_id != undefined)
          this.class_id.setValue(this.Selected_Employee_JobState.class_id);

        if (this.Selected_Employee_JobState.department_id != null &&
          this.Selected_Employee_JobState.department_id != undefined)
          this.department_id.setValue(this.Selected_Employee_JobState.department_id);

        if (this.Selected_Employee_JobState.doc_number != null &&
          this.Selected_Employee_JobState.doc_number != undefined)
          this.doc_number.setValue(this.Selected_Employee_JobState.doc_number);

        if (this.Selected_Employee_JobState.documenttype_id != null &&
          this.Selected_Employee_JobState.documenttype_id != undefined)
          this.documenttype_id.setValue(this.Selected_Employee_JobState.documenttype_id);

        if (this.Selected_Employee_JobState.jobkind_id != null &&
          this.Selected_Employee_JobState.jobkind_id != undefined)
          this.jobkind_id.setValue(this.Selected_Employee_JobState.jobkind_id);

        if (this.Selected_Employee_JobState.jobname_id != null &&
          this.Selected_Employee_JobState.jobname_id != undefined)
          this.jobname_id.setValue(this.Selected_Employee_JobState.jobname_id);

        if (this.Selected_Employee_JobState.salary != null &&
          this.Selected_Employee_JobState.salary != undefined)
          this.salary.setValue(this.Selected_Employee_JobState.salary);



      }
    } catch (ex: any) {
      console.log(ex);

    }

  }

  public getValue() {
    try {

      if (this.Selected_Employee_JobState != null &&
        this.Selected_Employee_JobState != undefined) {

        if (this.changedate.value != null &&
          this.changedate.value != undefined)
          this.Selected_Employee_JobState.changedate = moment(this.changedate.value).toDate();


        if (this.begindate.value != null &&
          this.begindate.value != undefined)
          this.Selected_Employee_JobState.begindate = moment(this.begindate.value).toDate();


        if (this.changereason_id.value != null &&
          this.changereason_id.value != undefined)
          this.Selected_Employee_JobState.changereason_id = this.changereason_id.value;


        if (this.class_id.value != null &&
          this.class_id.value != undefined)
          this.Selected_Employee_JobState.class_id = this.class_id.value;


        if (this.department_id.value != null &&
          this.department_id.value != undefined)
          this.Selected_Employee_JobState.department_id = this.department_id.value;


        if (this.doc_date.value != null &&
          this.doc_date.value != undefined)
          this.Selected_Employee_JobState.doc_date = moment(this.doc_date.value).toDate();

        if (this.doc_number.value != null &&
          this.doc_number.value != undefined)
          this.Selected_Employee_JobState.doc_number = this.doc_number.value;


        if (this.documenttype_id.value != null &&
          this.documenttype_id.value != undefined)
          this.Selected_Employee_JobState.documenttype_id = this.documenttype_id.value;

        if (this.jobkind_id.value != null &&
          this.jobkind_id.value != undefined)
          this.Selected_Employee_JobState.jobkind_id = this.jobkind_id.value;

        if (this.jobname_id.value != null &&
          this.jobname_id.value != undefined)
          this.Selected_Employee_JobState.jobname_id = this.jobname_id.value;

        if (this.salary.value != null &&
          this.salary.value != undefined)
          this.Selected_Employee_JobState.salary = this.salary.value;




      }
    } catch (ex: any) {
      console.log(ex);

    }

  }
  //#endregion



  //#region OnSelect Function

  public OnSelectMarsoomChange(event: MatAutocompleteSelectedEvent) {



    if (event != null) {

      let indexMarsoom = event.option.value;
      if (indexMarsoom && indexMarsoom > 0) {
        let MarsoomObject: ITBLShamelIncMarsoom | undefined = this.Marsoom_List.find(obj => obj.incmarsoom_id == indexMarsoom);
        if (MarsoomObject != null) {

          if (MarsoomObject?.changereason_id != null)
            this.changereason_id.setValue(MarsoomObject?.changereason_id);

          if (MarsoomObject?.changedate != null)
            this.changedate.setValue(moment(MarsoomObject?.changedate).toDate());

          if (MarsoomObject?.documentdate != null)
            this.doc_date.setValue(moment(MarsoomObject?.documentdate).toDate());

          if (MarsoomObject?.begindate != null)
            this.begindate.setValue(moment(MarsoomObject?.begindate).toDate());

          if (MarsoomObject?.document_number != null)
            this.doc_number.setValue(MarsoomObject?.document_number);

          if (MarsoomObject?.documenttype_id != null)
            this.documenttype_id.setValue(+MarsoomObject?.documenttype_id);

        }

      }

    }



  }

  public OnSelectClassChange(event: MatAutocompleteSelectedEvent) {
    if (event && this.Selected_Employee_JobState)
      this.Selected_Employee_JobState.class_id = event.option.value;
  }

  public OnSelectJobKindChange(event: MatAutocompleteSelectedEvent) {
    if (event && this.Selected_Employee_JobState)
      this.Selected_Employee_JobState.jobkind_id = event.option.value;
  }

  public OnSelectJobNameChange(event: MatAutocompleteSelectedEvent) {
    if (event && this.Selected_Employee_JobState)
      this.Selected_Employee_JobState.jobname_id = event.option.value;
  }


  public OnSelectDepartmentChange(event: MatAutocompleteSelectedEvent) {
    if (event && this.Selected_Employee_JobState)
      this.Selected_Employee_JobState.department_id = event.option.value;
  }

  public OnSelectChangeReasonChange(event: MatAutocompleteSelectedEvent) {

    if (event && this.Selected_Employee_JobState)
      this.Selected_Employee_JobState.changereason_id = event.option.value;
  }

  public OnSelectDocumentTypeChange(event: MatAutocompleteSelectedEvent) {
    if (event && this.Selected_Employee_JobState)
      this.Selected_Employee_JobState.documenttype_id = event.option.value;
  }

  //#endregion


  //#region  Display Display Member
  public displayDocumentTypeProperty(value: string): string {
    if (value && this.JobKind_List) {
      let cer: any = this.DocumentType_List.find(cer => cer.documenttype_id.toString() == value);
      if (cer)
        return cer.documenttype_name;
    }
    return '';
  }


  public displayClassProperty(value: string): string {
    if (value && this.Class_List) {
      let object: any = this.Class_List.find(obj => obj.class_id.toString() == value);
      if (object)
        return object.class_name;
    }
    return '';
  }

  public displayJobKindProperty(value: string): string {
    if (value && this.JobKind_List) {
      let object: any = this.JobKind_List.find(obj => obj.jobkind_id.toString() == value);
      if (object)
        return object.jobkind_name;
    }
    return '';
  }

  public displayJobNameProperty(value: string): string {
    if (value && this.JobName_List) {
      let object: any = this.JobName_List.find(obj => obj.jobname_id.toString() == value);
      if (object)
        return object.jobname_name;
    }
    return '';
  }

  public displayChangeReasonProperty(value: string): string {
    if (value && this.ChangeReason_List) {
      let object: any = this.ChangeReason_List.find(obj => obj.changereason_id.toString() == value);
      if (object)
        return object.changereason_name;
    }
    return '';
  }


  public displayMarsoomProperty(value: string): string {
    if (value && this.Marsoom_List) {
      let object: any = this.Marsoom_List.find(obj => obj.incmarsoom_id.toString() == value);
      if (object) {
        return object.incmarsoomdata;
      }

    }
    return '';
  }


  public displayDeparmentProperty(value: string): string {
    if (value && this.Department_List) {
      let object: any = this.Department_List.find(obj => obj.department_id.toString() == value);
      if (object)
        return object.department_name;
    }
    return '';
  }


  public async Save() {

    if (this.ValidateForm() == false)
      return;
    this.getValue();



    if (this.Form.valid == false) {
      return;
    }
    console.log("this.Form.invalid" + this.Form.errors);

    console.log("this.Form.invalid" + this.Form.errors);
    if (this.Selected_Employee_JobState != null &&
      (this.Selected_Employee_JobState.serial == null ||
        this.Selected_Employee_JobState.serial <= 0)) {
      this.jobstateService.add(this.Selected_Employee_JobState).toPromise().then(res => {
        console.log(res)
        if (res == 1) {

          this.ClearForm();
        } else {


        }
      });

    }



    else if (this.Selected_Employee_JobState != null &&
      this.Selected_Employee_JobState != undefined &&
      this.Selected_Employee_JobState.serial != null &&
      this.Selected_Employee_JobState.serial > 0)
      this.jobstateService.update(this.Selected_Employee_JobState).toPromise().then(res => {
        console.log(res)
        if (res == 1) {


        } else {
        }
      });


  }


  public ValidateForm(): boolean {
    let result: boolean = true;


    if (this.department_id.value == null ||
      this.department_id.value == undefined ||
      this.department_id.value <= 0) {
      console.log('error1');
      this.department_id.setErrors({ invalid: true, required: true });
      result = false;
    }
    if (this.jobkind_id.value == null ||
      this.jobkind_id.value == undefined ||
      this.jobkind_id.value <= 0) {
      console.log('error1');
      this.jobkind_id.setErrors({ invalid: true, required: true });
      result = false;
    }
    if (this.jobname_id.value == null ||
      this.jobname_id.value == undefined ||
      this.jobname_id.value <= 0) {
      console.log('error1');
      this.jobname_id.setErrors({ invalid: true, required: true });
      result = false;
    }
    if (this.class_id.value == null ||
      this.class_id.value <= 0) {
      console.log('error1');
      this.class_id.setErrors({ invalid: true, required: true });
      result = false;
    }


    if (this.changereason_id.value == null ||
      this.changereason_id.value <= 0) {
      console.log('error1');
      this.changereason_id.setErrors({ invalid: true, required: true });
      result = false;
    }

    console.log("result vaildarw" + result);
    return result;

  }

  public onReset(): void {
    this.submitted = false;
    this.Form.reset();
  }
  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.Form.controls[control].hasError(error);
  }


  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {

    if (this.changedate.value != null)
      this.Selected_Employee_JobState.changedate = moment(event.value).toDate();
  }



}
