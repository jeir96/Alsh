
import { Component, OnInit, AfterViewInit, Input, Inject, NgZone } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { Observable, of, startWith, map } from 'rxjs';
import { ITBLShamelChangeReason } from 'src/app/modules/shared/models/employees_department/ITBLShamelChangeReason';
import { ITBLShamelClass } from 'src/app/modules/shared/models/employees_department/ITBLShamelClass';
import { ITBLShamelDepartment } from 'src/app/modules/shared/models/employees_department/ITBLShamelDepartment';
import { ITBLShamelDocumentType } from 'src/app/modules/shared/models/employees_department/ITBLShamelDocumentType';
import { ITBLShamelIncMarsoom } from 'src/app/modules/shared/models/employees_department/ITBLShamelIncMarsoom';
import { ITBLShamelJobKind } from 'src/app/modules/shared/models/employees_department/ITBLShamelJobKind';
import { ITBLShamelJobName } from 'src/app/modules/shared/models/employees_department/ITBLShamelJobName';
import { ITBLShamelSCJobState } from 'src/app/modules/shared/models/employees_department/ITBLShamelSCJobState';
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
export class TblshamelscjobstatemodifyComponent implements OnInit, AfterViewInit {
  //Link To Employee 
  id: number;
  Selected_Emp: ITBLShamelSCJobState = {};

  _Selected_Employee_JobState: ITBLShamelSCJobState = {};

  @Input() set Selected_Employee_JobState(obj: ITBLShamelSCJobState) {
    this._Selected_Employee_JobState = obj;

    if (this._Selected_Employee_JobState != null &&
      this._Selected_Employee_JobState != undefined &&
      this._Selected_Employee_JobState.serial != null &&
      this._Selected_Employee_JobState.serial > 0) {
      console.log('سث');
      this.SetValue();
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


  // Access To Element in Form
  Form: UntypedFormGroup;
  incmarsoom_id: UntypedFormControl;
  changedate: UntypedFormControl;
  doc_date: UntypedFormControl;
  begindate: UntypedFormControl;
  doc_number: UntypedFormControl;
  salary: UntypedFormControl;
  changereason_id: UntypedFormControl;
  documenttype_id: UntypedFormControl;
  department_id: UntypedFormControl;
  jobname_id: UntypedFormControl;
  jobkind_id: UntypedFormControl;
  class_id: UntypedFormControl;




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
    private fb: UntypedFormBuilder,
    private ngZone: NgZone,
  ) {

    this.PageService.Subject_Selected_TBLShamelEmployee.subscribe(
      data => {
        this.Selected_Emp = data;
        this.id = this.Selected_Emp.id;
      }
    )


    if (this.changereasonService.List_ITBLShamelChangeReason == null ||
      this.changereasonService.List_ITBLShamelChangeReason == undefined ||
      this.changereasonService.List_ITBLShamelChangeReason.length == 0)
      this.changereasonService.fill();
    this.changereasonService.List_ITBLShamelChangeReason_BehaviorSubject.subscribe(
      data => {
        this.ChangeReason_List = data;
        this.filteredChangeReasonOptions = of(this.ChangeReason_List);
      }
    )


    if (this.marsoomService.List_ITBLShamelIncMarsoom == null ||
      this.marsoomService.List_ITBLShamelIncMarsoom == undefined ||
      this.marsoomService.List_ITBLShamelIncMarsoom.length == 0)
      this.marsoomService.fill();
    this.marsoomService.List_ITBLShamelIncMarsoom_BehaviorSubject.subscribe(
      data => {
        this.Marsoom_List = data;
        this.filteredMarsoomOptions = of(this.Marsoom_List);
      }
    )



    if (this.departmentService.List_ITBLShamelDepartment == null ||
      this.departmentService.List_ITBLShamelDepartment == undefined ||
      this.departmentService.List_ITBLShamelDepartment.length == 0)
      this.departmentService.fill();
    this.departmentService.List_ITBLShamelDepartment_BehaviorSubject.subscribe(
      data => {
        this.Department_List = data;
        this.filteredDepartmentOptions = of(this.Department_List);
      }
    )


    if (this.jobNameService.list_ITBLShamelJobName == null ||
      this.jobNameService.list_ITBLShamelJobName == undefined ||
      this.jobNameService.list_ITBLShamelJobName.length == 0)
      this.jobNameService.fill();
    this.jobNameService.List_ITBLShamelJobName_BehaviorSubject.subscribe(
      data => {
        this.JobName_List = data;
        this.filteredJobNameOptions = of(this.JobName_List);
      }
    )

    if (this.jobKindService.list_ITBLShamelJobKind == null ||
      this.jobKindService.list_ITBLShamelJobKind == undefined ||
      this.jobKindService.list_ITBLShamelJobKind.length == 0)
      this.jobKindService.fill();
    this.jobKindService.List_ITBLShamelJobKind_BehaviorSubject.subscribe(
      data => {
        this.JobKind_List = data;
        this.filteredJobKindOptions = of(this.JobKind_List);
      }
    )


    this.BuildForm();
    this.FillArrayUsingService();

    if (data!= null  && data.obj!= null && data.id!= null && data.id> 0) {
      this.id = data.id;
      this.Selected_Employee_JobState = data.obj;
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
      console.log(ex);

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
      console.log(ex);

    }


    try {

      this.filteredClassOptions = this.class_id.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredClass(value) : this.Class_List.slice())
        );

    } catch (ex: any) {
      console.log(ex);

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

  public BuildForm() {
    try {


      this.incmarsoom_id = new UntypedFormControl({ value: '' }, [Validators.required, Validators.minLength(5)]);
      this.changedate = new UntypedFormControl({ value: '' },);
      this.doc_date = new UntypedFormControl('');
      this.begindate = new UntypedFormControl({ value: '' });
      this.doc_number = new UntypedFormControl('');
      this.salary = new UntypedFormControl('');
      this.changereason_id = new UntypedFormControl('');
      this.documenttype_id = new UntypedFormControl('');
      this.department_id = new UntypedFormControl('');
      this.jobname_id = new UntypedFormControl('');
      this.jobkind_id = new UntypedFormControl('');
      this.class_id = new UntypedFormControl('');

      this.Form = this.fb.group({
      });
      this.Form.addControl('incmarsoom_id', this.incmarsoom_id);
      this.Form.addControl('changedate', this.changedate);
      this.Form.addControl('begindate', this.begindate);
      this.Form.addControl('changereason_id', this.changereason_id);
      this.Form.addControl('class_id', this.class_id);
      this.Form.addControl('department_id', this.department_id);
      this.Form.addControl('doc_date', this.doc_date);
      this.Form.addControl('doc_number', this.doc_number);
      this.Form.addControl('documenttype_id', this.documenttype_id);
      this.Form.addControl('jobkind_id', this.jobkind_id);
      this.Form.addControl('jobname_id', this.jobname_id);
      this.Form.addControl('salary', this.salary);

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
    if (value != null){
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


      this.salary.reset();
      this.jobname_id.reset();
      this.jobkind_id.reset();
      this.incmarsoom_id.reset();
      this.documenttype_id.reset();
      this.doc_number.reset();
      this.doc_date.reset();
      this.department_id.reset();
      this.class_id.reset();
      this.changereason_id.reset();
      this.begindate.reset();
      this.changedate.reset();
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
        this.Selected_Employee_JobState != undefined &&
        this.Selected_Employee_JobState.serial != null &&
        this.Selected_Employee_JobState.serial > 0
      ) {
        console.log("iside setvlaue");

        if (this.Selected_Employee_JobState.changedate != null &&
          this.Selected_Employee_JobState.changedate != undefined)
          this.changedate.setValue(moment(this.Selected_Employee_JobState.changedate).toDate());

        if (this.Selected_Employee_JobState.begindate != null &&
          this.Selected_Employee_JobState.begindate != undefined)
          this.begindate.setValue(moment(this.Selected_Employee_JobState.begindate).toDate());

        if (this.Selected_Employee_JobState.doc_date != null &&
          this.Selected_Employee_JobState.doc_date != undefined)
          this.doc_date.setValue(moment(this.Selected_Employee_JobState.doc_date).toDate());



        this.class_id.setValue(this.Selected_Employee_JobState.class_id);
        this.department_id.setValue(this.Selected_Employee_JobState.department_id);


        this.doc_number.setValue(this.Selected_Employee_JobState.doc_number);
        this.documenttype_id.setValue(this.Selected_Employee_JobState.documenttype_id);
        this.jobkind_id.setValue(this.Selected_Employee_JobState.jobkind_id);
        this.jobname_id.setValue(this.Selected_Employee_JobState.jobname_id);
        this.salary.setValue(this.Selected_Employee_JobState.salary);

        console.log("after set");





        //this.Form.patchValue();

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


        this.Selected_Employee_JobState.changereason_id = this.changereason_id.value;
        this.Selected_Employee_JobState.class_id = this.class_id.value;
        this.Selected_Employee_JobState.department_id = this.department_id.value;
        if (this.doc_date.value != null &&
          this.doc_date.value != undefined)
          this.Selected_Employee_JobState.doc_date = moment(this.doc_date.value).toDate();

        this.Selected_Employee_JobState.doc_number = this.doc_number.value;
        this.Selected_Employee_JobState.documenttype_id = this.documenttype_id.value;
        this.Selected_Employee_JobState.jobkind_id = this.jobkind_id.value;
        this.Selected_Employee_JobState.jobname_id = this.jobname_id.value;
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
        if (MarsoomObject) {
          console.log(MarsoomObject);
          this.changereason_id.setValue(MarsoomObject?.changereason_id);
          this.changedate.setValue(MarsoomObject?.changedate);
          this.doc_date.setValue(MarsoomObject?.documentdate);
          this.begindate.setValue(MarsoomObject?.begindate);
          this.doc_number.setValue(MarsoomObject?.document_number);
          this.documenttype_id.setValue(MarsoomObject?.documenttype_id);
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

  //#endregion

  public ClearObject() {
    try {
      if (!this.Selected_Employee_JobState)
        this.Selected_Employee_JobState = {};

      this.Selected_Employee_JobState.id = this.Selected_Emp.id;

    } catch (ex: any) { }


  }

  public async Save() {

    if (this.ValidateForm() == false)
      return;
    this.getValue();

    console.log("this.Form.invalid" + this.Form.valid);


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
          this.ClearObject();
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
          this.getValue();

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
    let changedate: Moment = this.changedate.value;
    if (this.changedate.value != null)
      this.Selected_Employee_JobState.changedate = moment(event.value).toDate();
  }


  setDefaultDate() {
    this.Form.patchValue({
      //     startdate: moment("12/25/1995", "MM/DD/YYYY")
    });
  }
}
