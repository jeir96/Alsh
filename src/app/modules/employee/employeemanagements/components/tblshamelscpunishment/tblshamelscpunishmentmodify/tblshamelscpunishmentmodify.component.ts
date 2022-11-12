
import * as _moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { Component, OnInit, AfterViewInit, Input, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of, startWith, map, combineLatest, forkJoin, Subscription } from 'rxjs';
import { ITBLShamelDocumentType } from 'src/app/modules/shared/models/employees_department/ITBLShamelDocumentType';
import { ITBLShamelPunishment } from 'src/app/modules/shared/models/employees_department/ITBLShamelPunishment';
import { ITBLShamelPunishmentReason } from 'src/app/modules/shared/models/employees_department/ITBLShamelPunishmentReason';
import { ITBLShamelSCPunishment } from 'src/app/modules/shared/models/employees_department/ITBLShamelSCPunishment';
import { IGlobalEmployeeList } from 'src/app/modules/shared/services/employees_department/IGlobalEmployeeList';
import { TBLShamelPunishmentReasonService } from 'src/app/modules/shared/services/employees_department/tblshamel-punishment-reason.service';
import { TBLShamelPunishmentService } from 'src/app/modules/shared/services/employees_department/tblshamel-punishment.service';
import { TblshameldocumenttypeService } from 'src/app/modules/shared/services/employees_department/tblshameldocumenttype.service';
import { EmployeePageService } from '../../employee-page-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ITBLShamelSCCancelPunishment } from 'src/app/modules/shared/models/employees_department/ITBLShamelSCCancelPunishment';
import { TBLShamelSCCancelPunishmentService } from 'src/app/modules/shared/services/employees_department/tblshamel-sccancel-punishment.service';
import { TBLShamelSCPunishmentService } from 'src/app/modules/shared/services/employees_department/tblshamel-scpunishment.service';
import { Validator_Punishment } from './Validator_Punishment';


const moment = _moment;

@Component({
  selector: 'app-tblshamelscpunishmentmodify',
  templateUrl: './tblshamelscpunishmentmodify.component.html',
  styleUrls: ['./tblshamelscpunishmentmodify.component.scss']
})
export class TblshamelscpunishmentmodifyComponent implements OnInit, AfterViewInit,OnDestroy {

  id_employee: number;
  Selected_Emp: TBLShamelEmployee = {};



  _Selected_Employee_SCPunishment: ITBLShamelSCPunishment;
  @Input() set Selected_Employee_SCPunishment(obj: ITBLShamelSCPunishment) {
    this._Selected_Employee_SCPunishment = obj;
    console.log('بلش');

    if (this._Selected_Employee_SCPunishment != null &&
      this._Selected_Employee_SCPunishment != undefined) {
      this.SetValue();
    }
  }

  get Selected_Employee_SCPunishment(): ITBLShamelSCPunishment {
    return this._Selected_Employee_SCPunishment;
  }




  TBLShamelPunishment_List: ITBLShamelPunishment[] = [];
  filteredPunishmentOptions: Observable<ITBLShamelPunishment[]>;

  TBLShamelPunishmentReason_List: ITBLShamelPunishmentReason[] = [];
  filteredPunishmentReasonOptions: Observable<ITBLShamelPunishmentReason[]>;


  DocumentType_List: ITBLShamelDocumentType[] = [];
  filteredDocumentTypeOptions: Observable<ITBLShamelDocumentType[]>;


  _Subscription: Subscription;

  // Access To Element in Form
  Form: FormGroup;
  serial: FormControl<number | null>;
  id: FormControl<number | null>;
  punishment_id: FormControl<number | null>;
  reason_id: FormControl<number | null>;
  documenttype_id: FormControl<number | null>;
  document_number: FormControl<string | null>;
  documentdate: FormControl<Date | null>;
  is_cancel: FormControl<string | null>;


  //Local Var

  submitted = false;
  loading: boolean = false;

  //#region Constuctor 
  constructor(

    @Inject(MAT_DIALOG_DATA) public data: { Parent: ITBLShamelSCPunishment, obj: ITBLShamelSCCancelPunishment, id: number },
    public GlobalList: IGlobalEmployeeList,
    public dialogRef: MatDialogRef<TblshamelscpunishmentmodifyComponent>,
    public tblshamelscpunishmentservice: TBLShamelSCPunishmentService,
    public ShamelPunishmentService: TBLShamelPunishmentService,
    public PunishmentReasonService: TBLShamelPunishmentReasonService,
    public ShameldocumenttypeService: TblshameldocumenttypeService,
    private fb: FormBuilder,
    private _snaker: MatSnackBar,
    public PageService: EmployeePageService
  ) {
    if (data && data.obj && data.id > 0) {
      this.id_employee = data.id;
      this.Selected_Employee_SCPunishment = data.obj;
    }
    this.BuildForm();
    this.Load_Data();
  }
  //#endregion


  Load_ITBLShamelPunishment() {
    if (this.ShamelPunishmentService.List_ITBLShamelPunishment == null ||
      this.ShamelPunishmentService.List_ITBLShamelPunishment == undefined ||
      this.ShamelPunishmentService.List_ITBLShamelPunishment.length == 0) {
      this._Subscription.add(

        this.ShamelPunishmentService.list().subscribe
          (
            res => {

              this.TBLShamelPunishment_List = res;
              this.filteredPunishmentOptions = of(res);
              this.ShamelPunishmentService.List_ITBLShamelPunishment = res;
            }
          )
      );

    }

    return of(this.ShamelPunishmentService.List_ITBLShamelPunishment);

  }

  Load_ITBLShamelPunishmentReason() {
    if (this.PunishmentReasonService.List_ITBLShamelPunishmentReason == null ||
      this.PunishmentReasonService.List_ITBLShamelPunishmentReason == undefined ||
      this.PunishmentReasonService.List_ITBLShamelPunishmentReason.length == 0) {

      this._Subscription.add(
        this.PunishmentReasonService.list().subscribe
          (
            res => {
              this.TBLShamelPunishmentReason_List = res;
              this.filteredPunishmentReasonOptions = of(res);
              this.PunishmentReasonService.List_ITBLShamelPunishmentReason = res;
              this.PunishmentReasonService.List_ITBLShamelPunishmentReason_BehaviorSubject.next(res);
              return of(res);

            }
          ));


    }
    return of(this.PunishmentReasonService.List_ITBLShamelPunishmentReason);


  }

  Load_List_ITBLShamelDocumentType(): Observable<ITBLShamelDocumentType[]> {
    if (this.ShameldocumenttypeService.List_ITBLShamelDocumentType == null ||
      this.ShameldocumenttypeService.List_ITBLShamelDocumentType == undefined ||
      this.ShameldocumenttypeService.List_ITBLShamelDocumentType.length == 0) {
      this._Subscription.add(
        this.ShameldocumenttypeService.List_ITBLShamelDocumentType_BehaviorSubject.subscribe(
          data => {
            this.DocumentType_List = data;
            this.filteredDocumentTypeOptions = of(this.DocumentType_List);
            return of(data);
          })
      )
    }

    return of(this.ShameldocumenttypeService.List_ITBLShamelDocumentType);



  }


  Load_Data() {
    combineLatest([this.PageService.Subject_Selected_TBLShamelEmployee]).subscribe
      (
        res => {
          this.Selected_Emp = res[0];
          if (this.Selected_Emp != null && this.Selected_Emp.id != null)
            this.id_employee = this.Selected_Emp.id;

          forkJoin(
            this.Load_List_ITBLShamelDocumentType(),
            this.Load_ITBLShamelPunishment(),
            this.Load_ITBLShamelPunishmentReason(),
          ).subscribe(
            res => {
              this.FillArrayUsingService();
            }
          )
        }
      )
  }

  //#region  Init Component

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

      this.filteredPunishmentOptions = this.punishment_id.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredPunishment(value) : this.TBLShamelPunishment_List.slice())
        );

    } catch (Exception: any) { }


    try {

      this.filteredPunishmentReasonOptions = this.reason_id.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredPunishmentReason(value) : this.TBLShamelPunishmentReason_List.slice())
        );

    } catch (Exception: any) { }

  }

  public BuildForm() {
    try {
      this.Form = this.fb.group({
        'serial': this.punishment_id = new FormControl<number | null>(null, [Validators.required]),
        'id': this.punishment_id = new FormControl<number | null>(null, [Validators.required]),
        'punishment_id': this.punishment_id = new FormControl<number | null>(null, [Validators.required]),
        'reason_id': this.reason_id = new FormControl<number | null>(null, []),
        'documenttype_id': this.documenttype_id = new FormControl<number | null>(null, []),
        'document_number': this.document_number = new FormControl<string | null>(null, []),
        'documentdate': this.documentdate = new FormControl<Date | null>(null, []),
        'is_cancel': this.is_cancel = new FormControl<string | null>(null, []),
      },
      {       
          updateOn: 'change',
          asyncValidators: Validator_Punishment(this.tblshamelscpunishmentservice).bind(this) // <= async validator       
      }
      );

    } catch (Exception: any) {
      console.log(Exception);
    }
  }
  //#endregion


  //#region Filter Of  

  private _filteredPunishment(value: string): ITBLShamelPunishment[] {
    console.log('_filteredPunishment');
    if (value != null) {
      const filterValue = value;
      return this.TBLShamelPunishment_List.filter(obj => obj.punishment_name.includes(filterValue));
    }
    return this.TBLShamelPunishment_List.slice();
  }

  private _filteredPunishmentReason(value: string): ITBLShamelPunishmentReason[] {
    if (value) {
      const filterValue = value;
      return this.TBLShamelPunishmentReason_List.filter(obj => obj.punishmentreason_name.includes(filterValue));
    }
    return this.TBLShamelPunishmentReason_List.slice();
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

      this.Form.reset();


    } catch (ex: any) {

    }

  }


  //#region SetValue And GetValue Function
  public SetValue() {
    try {

      if (this.Selected_Employee_SCPunishment != null &&
        this.Selected_Employee_SCPunishment != undefined) {
        if (this.Selected_Employee_SCPunishment.is_cancel != null)
          this.is_cancel.setValue(this.Selected_Employee_SCPunishment.is_cancel);

        if (this.Selected_Employee_SCPunishment.reason_id != null)
          this.reason_id.setValue(this.Selected_Employee_SCPunishment.reason_id);

        if (this.Selected_Employee_SCPunishment.punishment_id != null)
          this.punishment_id.setValue(this.Selected_Employee_SCPunishment.punishment_id);

        if (this.Selected_Employee_SCPunishment.documenttype_id != null)
          this.documenttype_id.setValue(this.Selected_Employee_SCPunishment.documenttype_id);

        if (this.Selected_Employee_SCPunishment.documentdate != null &&
          this.Selected_Employee_SCPunishment.documentdate != undefined)
          this.documentdate.setValue(moment(this.Selected_Employee_SCPunishment.documentdate).toDate());

        if (this.Selected_Employee_SCPunishment.document_number != null)
          this.document_number.setValue(this.Selected_Employee_SCPunishment.document_number);


      }

    } catch (ex: any) {
      console.log(ex);

    }

  }

  public getValue() {
    try {

      if (this.Selected_Employee_SCPunishment != null &&
        this.Selected_Employee_SCPunishment != undefined) {

        this.Selected_Employee_SCPunishment.id = this.id_employee;
        if (this.punishment_id.value != null)
          this.Selected_Employee_SCPunishment.punishment_id = this.punishment_id.value;

        if (this.reason_id.value != null)
          this.Selected_Employee_SCPunishment.reason_id = this.reason_id.value;


        if (this.documenttype_id.value != null)
          this.Selected_Employee_SCPunishment.documenttype_id = this.documenttype_id.value;

        if (this.document_number.value != null)
          this.Selected_Employee_SCPunishment.document_number = this.document_number.value;


        if (this.documentdate.value != null && this.documentdate.value != undefined)
          this.Selected_Employee_SCPunishment.documentdate = moment(this.documentdate.value).toDate();

        if (this.is_cancel.value != null && this.is_cancel.value != undefined)
          this.Selected_Employee_SCPunishment.is_cancel = this.Selected_Employee_SCPunishment.is_cancel;

      }
    } catch (ex: any) {

    }

  }
  //#endregion



  //#region OnSelect Function

  public OnSelectPunishmentReasonChange(event: MatAutocompleteSelectedEvent) {
    console.log('OnSelectPunishmentReasonChange');
    if (event != null && this.Selected_Employee_SCPunishment != null)
      this.Selected_Employee_SCPunishment.reason_id = event.option.value;
  }

  public OnSelectPunishmentChange(event: MatAutocompleteSelectedEvent) {
    console.log('OnSelectPunishmentChange');
    if (event && this.Selected_Employee_SCPunishment)
      this.Selected_Employee_SCPunishment.punishment_id = event.option.value;
  }


  public OnSelectDocumentTypeChange(event: MatAutocompleteSelectedEvent) {
    console.log('OnSelectStateChange');
    console.log(event.option.value);
    if (event && this.Selected_Employee_SCPunishment)
      this.Selected_Employee_SCPunishment.documenttype_id = event.option.value;
  }



  //#endregion


  //#region  Display Display Member
  public displayDocumentTypeProperty(value: string): string {
    if (value && this.DocumentType_List) {
      let documentType: any = this.DocumentType_List.find(crs => crs.documenttype_id.toString() == value);
      if (documentType != null)
        return documentType.documenttype_name;
    }
    return '';
  }


  public displayPunishmentReasonProperty(value: string): string {
    if (value && this.TBLShamelPunishmentReason_List) {
      let punishmentreason: any = this.TBLShamelPunishmentReason_List.find(crs => crs.punishmentreason_id.toString() == value);
      if (punishmentreason != null)
        return punishmentreason.punishmentreason_name;
    }
    return '';
  }


  public displayPunishmentProperty(value: string): string {
    console.log('displayPunishmentProperty');
    console.log(value);

    if (value && this.TBLShamelPunishment_List) {

      let ShamelPunishment: any = this.TBLShamelPunishment_List.find(spec => spec.punishment_id.toString() == value);
      if (ShamelPunishment)
        return ShamelPunishment.punishment_name;
    }
    return '';
  }






  public async Save() {


    if (!this.Form.valid) {
      return;
    }
    if (!this.ValidateForm() == true) {
      return;
    }
    this.getValue();

    if (this.Selected_Employee_SCPunishment != null &&
      this.Selected_Employee_SCPunishment != undefined &&
      (this.Selected_Employee_SCPunishment.serial == null || this.Selected_Employee_SCPunishment.serial <= 0)
    ) {
      this.tblshamelscpunishmentservice.add(this.Selected_Employee_SCPunishment).toPromise().then(res => {
        console.log(res)
        if (res == 1) {
          this._snaker.open('تم الحفظ بنجاح', 'موافق');
          this.dialogRef.close();
        } else {
          this._snaker.open('لم يتم الحفظ', 'موافق');


        }
      });
    } if (this.Selected_Employee_SCPunishment != null &&
      this.Selected_Employee_SCPunishment != undefined &&
      this.Selected_Employee_SCPunishment.serial != null &&
      this.Selected_Employee_SCPunishment.serial > 0
    ) {


      this.tblshamelscpunishmentservice.update(this.Selected_Employee_SCPunishment).toPromise().then(res => {
        console.log(res)
        if (res == 1) {

          this._snaker.open('تم الحفظ بنجاح', 'موافق');
          this.dialogRef.close();
        } else {
          this._snaker.open('لم يتم الحفظ', 'موافق');
        }
      });

    }
  }


  public ValidateForm(): boolean {
    let result: boolean = true;




    if (this.punishment_id.value == null || this.punishment_id.value <= 0) {
      console.log('error2');
      this.reason_id.setErrors({ 'Phone Number does not exist.': true });
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

    console.log('addEventDocumentDate');
    console.log(event.value);
    if (event.value != null &&
      event.value != undefined)
      this.Selected_Employee_SCPunishment.documentdate = moment(event.value).toDate();
    console.log('addEventDocumentDate');

  }



  ngOnDestroy() {  

    // Unsubscribed the subscription  
 if (this._Subscription!= null )
   this._Subscription.unsubscribe();  

   }  



}
