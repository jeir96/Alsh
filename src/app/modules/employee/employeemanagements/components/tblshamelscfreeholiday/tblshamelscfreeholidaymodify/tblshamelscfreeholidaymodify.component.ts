
import * as _moment from 'moment';
import { Moment } from 'moment';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { EmployeePageService } from '../../employee-page-service';
import { Component, OnInit, AfterViewInit, Input, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of, startWith, map } from 'rxjs';
import { ITBLShamelDocumentType } from 'src/app/modules/shared/models/employees_department/ITBLShamelDocumentType';
import { ITBLShamelFreeHolidayReason } from 'src/app/modules/shared/models/employees_department/ITBLShamelFreeHolidayReason';
import { ITBLShamelSCFreeHoliday } from 'src/app/modules/shared/models/employees_department/ITBLShamelSCFreeHoliday';
import { IGlobalEmployeeList } from 'src/app/modules/shared/services/employees_department/IGlobalEmployeeList';
import { TBLShamelFreeHolidayReasonService } from 'src/app/modules/shared/services/employees_department/tblshamel-free-holiday-reason.service';
import { TBLShamelSCFreeHolidayService } from 'src/app/modules/shared/services/employees_department/tblshamel-scfree-holiday.service';
import { TblshameldocumenttypeService } from 'src/app/modules/shared/services/employees_department/tblshameldocumenttype.service';

const moment = _moment;


@Component({
  selector: 'app-tblshamelscfreeholidaymodify',
  templateUrl: './tblshamelscfreeholidaymodify.component.html',
  styleUrls: ['./tblshamelscfreeholidaymodify.component.scss']
})
export class TblshamelscfreeholidaymodifyComponent implements OnInit, AfterViewInit {


  id: number;
  Selected_Emp: TBLShamelEmployee = {};
  _Selected_Employee_SCFreeHoliday: ITBLShamelSCFreeHoliday
  @Input() set Selected_Employee_SCFreeHoliday(obj: ITBLShamelSCFreeHoliday) {
    this._Selected_Employee_SCFreeHoliday = obj;
    console.log('بلش');

    if (this._Selected_Employee_SCFreeHoliday != null &&
      this._Selected_Employee_SCFreeHoliday != undefined &&
      this._Selected_Employee_SCFreeHoliday .serial != null)
       {
      console.log('سث');
      console.log(this._Selected_Employee_SCFreeHoliday);
      this.SetValue();
    }
  }

  get Selected_Employee_SCFreeHoliday(): ITBLShamelSCFreeHoliday {
    return this._Selected_Employee_SCFreeHoliday;
  }


  //Array Of AutoComplere With Filter

  FreeHolidayReason_List: ITBLShamelFreeHolidayReason[] = [];
  filteredFreeHolidayReasonOptions: Observable<ITBLShamelFreeHolidayReason[]>;

  DocumentType_List: ITBLShamelDocumentType[] = [];
  filteredDocumentTypeOptions: Observable<ITBLShamelDocumentType[]>;



  // Access To Element in Form
  Form: FormGroup;
  duration = new FormControl();
  startdate = new FormControl();
  enddate = new FormControl();
  reason_id = new FormControl();
  documenttype_id = new FormControl();
  document_number = new FormControl();
  documentdate = new FormControl();

  //Local Var

  submitted = false;
  loading: boolean = false;

  //#region Constuctor 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { obj: ITBLShamelSCFreeHoliday, id: number },
    public GlobalList: IGlobalEmployeeList,
    public ShamelSCFreeHolidayService: TBLShamelSCFreeHolidayService,
    public ShamelFreeHolidayReasonService: TBLShamelFreeHolidayReasonService,
    public ShameldocumenttypeService: TblshameldocumenttypeService,
    private fb: FormBuilder,
    public PageService: EmployeePageService,
  ) {
    this.PageService.Subject_Selected_TBLShamelEmployee.subscribe(
      data => {
        this.Selected_Emp = data;
        this.id = this.Selected_Emp.id;
      }
    )

    if (this.ShamelFreeHolidayReasonService.List_TBLShamelFreeHolidayReason == null ||
      this.ShamelFreeHolidayReasonService.List_TBLShamelFreeHolidayReason == undefined ||
      this.ShamelFreeHolidayReasonService.List_TBLShamelFreeHolidayReason.length == 0)
      this.ShamelFreeHolidayReasonService.fill();
    this.ShamelFreeHolidayReasonService.List_TBLShamelFreeHolidayReason_BehaviorSubject.subscribe(
      data => {
        this.FreeHolidayReason_List = data;
        this.filteredFreeHolidayReasonOptions = of(this.FreeHolidayReason_List);
      }
    )

    if (this.ShameldocumenttypeService.List_ITBLShamelDocumentType == null ||
      this.ShameldocumenttypeService.List_ITBLShamelDocumentType == undefined ||
      this.ShameldocumenttypeService.List_ITBLShamelDocumentType.length == 0)
      this.ShameldocumenttypeService.fill();
    this.ShameldocumenttypeService.List_ITBLShamelDocumentType_BehaviorSubject.subscribe(
      data => {
        this.DocumentType_List = data;
        this.filteredDocumentTypeOptions = of(this.DocumentType_List);
      }
    )

    this.BuildForm();
    this.FillArrayUsingService();

    if (data!= null  && data.obj!= null && data.id!= null && data.id> 0) {
      this.id = data.id;
      this.Selected_Employee_SCFreeHoliday = data.obj;
    }







  }




  ngOnInit(): void {



  }


  ngAfterViewInit() {

  }


  public async FillArrayUsingService() {
    try {



      this.filteredDocumentTypeOptions = this.documenttype_id.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredDocumentType(value) : this.DocumentType_List.slice())
        );

    } catch (Exception: any) { }


    try {


      this.filteredFreeHolidayReasonOptions = this.reason_id.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredFreeHolidayReason(value) : this.FreeHolidayReason_List.slice())
        );

    } catch (Exception: any) { }




  }

  public BuildForm() {
    try {
      console.log('Build Form');
      console.log(this.Selected_Employee_SCFreeHoliday);

      this.duration = new FormControl([Validators.required]);
      this.startdate = new FormControl([Validators.required]);
      this.enddate = new FormControl([Validators.required]);
      this.document_number = new FormControl();
      this.reason_id = new FormControl();
      this.documenttype_id = new FormControl();
      this.document_number = new FormControl();
      this.documentdate = new FormControl();



      this.Form = this.fb.group({
      });
      this.Form.addControl('duration', this.duration);
      this.Form.addControl('startdate', this.startdate);
      this.Form.addControl('enddate', this.enddate);
      this.Form.addControl('reason_id', this.reason_id);

      this.Form.addControl('documenttype_id', this.documenttype_id);
      this.Form.addControl('documentdate', this.documentdate);
      this.Form.addControl('document_number', this.document_number);

    } catch (Exception: any) {
      console.log(Exception);
    }
  }
  //#endregion


  //#region Filter Of  

  private _filteredFreeHolidayReason(value: string): ITBLShamelFreeHolidayReason[] {
    if (value) {
      const filterValue = value;
      return this.FreeHolidayReason_List.filter(obj => obj.freeholidayreason_name.includes(filterValue));
    }
    return this.FreeHolidayReason_List.slice();
  }

  private _filteredDocumentType(value: string): ITBLShamelDocumentType[] {
    if (value) {
      const filterValue = value;
      return this.DocumentType_List.filter(obj => obj.documenttype_name.includes(filterValue));

    }
    return this.DocumentType_List.slice();
  }

  //#endregion


  //#region SetValue And GetValue Function
  public ClearForm() {
    try {
      console.log('ClearForm');
      this.duration.reset();
      this.startdate.reset();
      this.enddate.reset();
      this.reason_id.reset();
      this.documentdate.reset();
      this.document_number.reset();
      this.documenttype_id.reset();

    } catch (ex: any) {

    }

  }


  //#region SetValue And GetValue Function
  public SetValue() {
    try {
     
      if (this.Selected_Employee_SCFreeHoliday != null) {

        this.reason_id.setValue(this.Selected_Employee_SCFreeHoliday.reason_id);

        
        this.duration.setValue(this.Selected_Employee_SCFreeHoliday.duration);

        if (this.Selected_Employee_SCFreeHoliday.startdate!= null &&
           this.Selected_Employee_SCFreeHoliday.startdate != undefined)        
        this.startdate.setValue(moment(this.Selected_Employee_SCFreeHoliday.startdate).toDate());

        if (this.Selected_Employee_SCFreeHoliday.enddate!= null &&
            this.Selected_Employee_SCFreeHoliday.enddate != undefined)        
        this.enddate.setValue(moment(this.Selected_Employee_SCFreeHoliday.enddate).toDate());

        this.documenttype_id.setValue(this.Selected_Employee_SCFreeHoliday.documenttype_id);

        if (this.Selected_Employee_SCFreeHoliday.documentdate!= null &&
            this.Selected_Employee_SCFreeHoliday.documentdate != undefined)        
        this.documentdate.setValue(moment(this.Selected_Employee_SCFreeHoliday.documentdate).toDate());

        this.document_number.setValue(this.Selected_Employee_SCFreeHoliday.document_number);

        this.reason_id.setValue(this.Selected_Employee_SCFreeHoliday.reason_id);

      }

    } catch (ex: any) {
      console.log(ex);

    }

  }

  public getValue() {
    try {

      if (this.Selected_Employee_SCFreeHoliday != null) {
        console.log(this.reason_id);
        this.Selected_Employee_SCFreeHoliday.id = this.id;
        this.Selected_Employee_SCFreeHoliday.reason_id = this.reason_id.value;
        this.Selected_Employee_SCFreeHoliday.duration = this.duration.value;

        if (this.enddate.value!= null &&this.enddate.value!= undefined )
        this.Selected_Employee_SCFreeHoliday.enddate = moment(this.enddate.value).toDate();
        if (this.startdate.value!= null &&this.startdate.value!= undefined )
        this.Selected_Employee_SCFreeHoliday.startdate = moment(this.startdate.value).toDate();
        this.Selected_Employee_SCFreeHoliday.documenttype_id = this.documenttype_id.value;
        this.Selected_Employee_SCFreeHoliday.document_number = this.document_number.value;
        if (this.documentdate.value!= null &&this.documentdate.value!= undefined )
        this.Selected_Employee_SCFreeHoliday.documentdate = moment(this.documentdate.value).toDate();


      }
    } catch (ex: any) {

    }

  }

  public OnSelectFreeHolidayReasonChange(event: MatAutocompleteSelectedEvent) {
    if (event && this.Selected_Employee_SCFreeHoliday)
      this.Selected_Employee_SCFreeHoliday.reason_id = event.option.value;
  }


  public OnSelectDocumentTypeChange(event: MatAutocompleteSelectedEvent) {
    console.log('OnSelectStateChange');
    console.log(event.option.value);
    if (event && this.Selected_Employee_SCFreeHoliday)
      this.Selected_Employee_SCFreeHoliday.documenttype_id = event.option.value;
  }



  //#endregion


  //#region  Display Display Member
  public displayDocumentTypeProperty(value: string): string {
    if (value && this.DocumentType_List) {
      let documentType: any = this.DocumentType_List.find(crs => crs.documenttype_id.toString() == value);
      if (documentType)
        return documentType.documenttype_name;
    }
    return '';
  }


  public displayFreeHolidayReasonProperty(value: string): string {
    if (value && this.FreeHolidayReason_List) {

      let freeholidayreason: any = this.FreeHolidayReason_List.find(spec => spec.freeholidayreason_id.toString() == value);
      if (freeholidayreason)
        return freeholidayreason.freeholidayreason_name;
    }
    return '';
  }






  public ClearObject() {
    if (!this.Selected_Employee_SCFreeHoliday)
      this.Selected_Employee_SCFreeHoliday = {};
    this.Selected_Employee_SCFreeHoliday.id = this.id;
  }

  public async Save() {

    if (!this.Form.valid) {
      return;
    }
    if (!this.ValidateForm() == true) {
      return;
    }
    this.getValue();

    if (this.Selected_Employee_SCFreeHoliday != null &&
      this.Selected_Employee_SCFreeHoliday != undefined &&
      (this.Selected_Employee_SCFreeHoliday.serial == null || this.Selected_Employee_SCFreeHoliday.serial <= 0)
    ) {


      this.ShamelSCFreeHolidayService.add(this.Selected_Employee_SCFreeHoliday).toPromise().then(res => {
        console.log(res)
        if (res == 1) {
          this.ClearObject();
          this.ClearForm();
        } else {



        }
      });
    }
    else if (this.Selected_Employee_SCFreeHoliday != null &&
      this.Selected_Employee_SCFreeHoliday != undefined &&
      this.Selected_Employee_SCFreeHoliday.serial != null &&
      this.Selected_Employee_SCFreeHoliday.serial > 0) {
      console.log('update');
      console.log(this.Selected_Employee_SCFreeHoliday);

      this.ShamelSCFreeHolidayService.update(this.Selected_Employee_SCFreeHoliday).toPromise().then(res => {
        console.log(res)
        if (res == 1) {
          this.getValue();

        } else {
        }
      });

    }
  }


  public ValidateForm(): boolean {
    let result: boolean = true;



    if (!this.reason_id.value || this.reason_id.value <= 0) {
      console.log('error1');
      this.reason_id.setErrors({ invalid: true, required: true });
      result = false;

    }

    if (!this.duration.value || this.duration.value <= 0) {
      console.log('error2');
      this.duration.setErrors({ 'Phone Number does not exist.': true });
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



  addEventDocumentDate(type: string, event: MatDatepickerInputEvent<Date>) {
if (event.value!= null)
    this.Selected_Employee_SCFreeHoliday.documentdate = moment(event.value).toDate();;

  }


  addEventStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
    if (event.value!= null)
    this.Selected_Employee_SCFreeHoliday.startdate = moment(event.value).toDate();

  }



  addEventEndDate(type: string, event: MatDatepickerInputEvent<Date>) {
    if (event.value!= null)
    this.Selected_Employee_SCFreeHoliday.enddate = moment(event.value).toDate();;

  }



}
