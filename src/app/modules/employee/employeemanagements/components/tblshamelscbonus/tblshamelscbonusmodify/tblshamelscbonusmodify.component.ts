
import { Component, OnInit, AfterViewInit, Input, Inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TBLShamelBonus } from 'src/app/modules/shared/models/employees_department/TBLShamelBonus';
import { TBLShamelBonusReason } from 'src/app/modules/shared/models/employees_department/TBLShamelBonusReason';
import { ITBLShamelDocumentType } from 'src/app/modules/shared/models/employees_department/ITBLShamelDocumentType';
import { ITBLShamelSCBonus } from 'src/app/modules/shared/models/employees_department/ITBLShamelSCBonus';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { IGlobalEmployeeList } from 'src/app/modules/shared/services/employees_department/IGlobalEmployeeList';
import { TBLShamelBonusReasonService } from 'src/app/modules/shared/services/employees_department/tblshamel-bonus-reason.service';
import { TBLShamelBonusService } from 'src/app/modules/shared/services/employees_department/tblshamel-bonus.service';
import { TBLShamelSCBonusService } from 'src/app/modules/shared/services/employees_department/tblshamel-scbonus.service';
import { TblshameldocumenttypeService } from 'src/app/modules/shared/services/employees_department/tblshameldocumenttype.service';
import { EmployeePageService } from '../../employee-page-service';

@Component({
  selector: 'app-tblshamelscbonusmodify',
  templateUrl: './tblshamelscbonusmodify.component.html',
  styleUrls: ['./tblshamelscbonusmodify.component.scss']
})
export class TblshamelscbonusmodifyComponent implements OnInit, AfterViewInit {

  //Link To Employee
  id: number;
  Selected_Emp: TBLShamelEmployee = {};
  _Selected_Employee_SCBouns: ITBLShamelSCBonus;
  @Input() set Selected_Employee_SCBouns(obj: ITBLShamelSCBonus) {
    this._Selected_Employee_SCBouns = obj;
    console.log('بلش');

    if (this._Selected_Employee_SCBouns != null &&
      this._Selected_Employee_SCBouns != undefined) {
      console.log('سث');
      console.log(this._Selected_Employee_SCBouns);
      this.SetValue();
    }
  }

  get Selected_Employee_SCBouns(): ITBLShamelSCBonus {
    return this._Selected_Employee_SCBouns;
  }


  //Array Of AutoComplere With Filter
  Bonus_List: TBLShamelBonus[] = [];
  filteredBonusOptions: Observable<TBLShamelBonus[]>;

  BonusReason_List: TBLShamelBonusReason[] = [];
  filteredBonusReasonOptions: Observable<TBLShamelBonusReason[]>;

  DocumentType_List: ITBLShamelDocumentType[] = [];
  filteredDocumentTypeOptions: Observable<ITBLShamelDocumentType[]>;



  // Access To Element in Form
  Form: UntypedFormGroup;
  bonus_id = new UntypedFormControl();
  reason_id = new UntypedFormControl();
  documenttype_id = new UntypedFormControl();
  document_number = new UntypedFormControl();
  documentdate = new UntypedFormControl();

  //Local Var

  submitted = false;
  loading: boolean = false;

  //#region Constuctor
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { obj: ITBLShamelSCBonus, id: number },
    public GlobalList: IGlobalEmployeeList,
    public ShamelSCBonusService: TBLShamelSCBonusService,
    public ShamelBonusReasonService: TBLShamelBonusReasonService,
    public ShamelBonusService: TBLShamelBonusService,
    public ShameldocumenttypeService: TblshameldocumenttypeService,
    private fb: UntypedFormBuilder,
    public PageService: EmployeePageService,
  ) {



    this.PageService.Subject_Selected_TBLShamelEmployee.subscribe(
      data => {
        this.Selected_Emp = data;
        this.id = this.Selected_Emp.id;
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


    if (this.ShamelBonusReasonService.List_TBLShamelBonusReason == null ||
      this.ShamelBonusReasonService.List_TBLShamelBonusReason == undefined ||
      this.ShamelBonusReasonService.List_TBLShamelBonusReason.length == 0)
      this.ShamelBonusReasonService.fill();
    this.ShamelBonusReasonService.List_TBLShamelBonusReason_BehaviorSubject.subscribe(
      data => {
        this.BonusReason_List = data;
        this.filteredBonusReasonOptions = of(this.BonusReason_List);
      }
    )

    if (this.ShamelBonusService.List_TBLShamelBonus == null ||
      this.ShamelBonusService.List_TBLShamelBonus == undefined ||
      this.ShamelBonusService.List_TBLShamelBonus.length == 0)
      this.ShamelBonusService.fill();
    this.ShamelBonusService.List_TBLShamelBonus_BehaviorSubject.subscribe(
      data => {
        this.Bonus_List = data;
        this.filteredBonusOptions = of(this.Bonus_List);
      }
    )

    this.BuildForm();
    this.FillArrayUsingService();

    if (data!= null  && data.obj!= null && data.id!= null && data.id> 0) {
      this.id = data.id;
      this.Selected_Employee_SCBouns = data.obj;
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


      this.filteredBonusOptions = this.bonus_id.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredBonus(value) : this.Bonus_List.slice())
        );

    } catch (Exception: any) { }


    try {


      this.filteredBonusReasonOptions = this.reason_id.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredBonusReason(value) : this.BonusReason_List.slice())
        );

    } catch (Exception: any) { }


  }

  public BuildForm() {
    try {


      this.bonus_id = new UntypedFormControl([Validators.required, Validators.minLength(5)]);
      this.reason_id = new UntypedFormControl();
      this.documenttype_id = new UntypedFormControl();
      this.documentdate = new UntypedFormControl();
      this.document_number = new UntypedFormControl();


      this.Form = this.fb.group({
      });
      this.Form.addControl('bonus_id', this.bonus_id);
      this.Form.addControl('reason_id', this.reason_id);
      this.Form.addControl('documenttype_id', this.documenttype_id);
      this.Form.addControl('documentdate', this.documentdate);
      this.Form.addControl('document_number', this.document_number);
    } catch (Exception: any) {
      console.log(Exception);
    }
  }

  private _filteredBonus(value: string): TBLShamelBonus[] {
    if (value) {
      const filterValue = value;
      return this.Bonus_List.filter(obj => obj.bonus_name.includes(filterValue));
    }
    return this.Bonus_List.slice();
  }

  private _filteredBonusReason(value: string): TBLShamelBonusReason[] {
    if (value) {
      const filterValue = value;
      return this.BonusReason_List.filter(obj => obj.bonusreason_name.includes(filterValue));
    }
    return this.BonusReason_List.slice();
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
      this.bonus_id.reset();
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
      console.log(this.Selected_Employee_SCBouns);
      if (this.Selected_Employee_SCBouns != undefined &&
        this.Selected_Employee_SCBouns != null) {


        this.bonus_id.setValue(this.Selected_Employee_SCBouns.bonus_id);
        this.reason_id.setValue(this.Selected_Employee_SCBouns.reason_id);
        this.documenttype_id.setValue(this.Selected_Employee_SCBouns.documenttype_id);

        this.document_number.setValue(this.Selected_Employee_SCBouns.document_number);


        if (this.Selected_Employee_SCBouns.documentdate != null)
          this.documentdate.setValue(moment(this.Selected_Employee_SCBouns.documentdate));



      }


    } catch (ex: any) {
      console.log(ex);

    }

  }

  public getValue() {
    try {

      if (this.Selected_Employee_SCBouns) {

        this.Selected_Employee_SCBouns.bonus_id = this.bonus_id.value;
        this.Selected_Employee_SCBouns.reason_id = this.reason_id.value;
        this.Selected_Employee_SCBouns.documenttype_id = this.documenttype_id.value;
        this.Selected_Employee_SCBouns.document_number = this.document_number.value;

        this.Selected_Employee_SCBouns.documentdate = moment(this.documentdate.value).toDate();


      }
    } catch (ex: any) {

    }

  }

  public OnSelectBounsReasonChange(event: MatAutocompleteSelectedEvent) {
    if (event && this.Selected_Employee_SCBouns)
      this.Selected_Employee_SCBouns.reason_id = event.option.value;
  }

  public OnSelectBonusChange(event: MatAutocompleteSelectedEvent) {
    if (event && this.Selected_Employee_SCBouns)
      this.Selected_Employee_SCBouns.bonus_id = event.option.value;
  }

  public OnSelectDocumentTypeChange(event: MatAutocompleteSelectedEvent) {
    console.log('OnSelectStateChange');
    console.log(event.option.value);
    if (event && this.Selected_Employee_SCBouns)
      this.Selected_Employee_SCBouns.documenttype_id = event.option.value;
  }




  public displayDocumentTypeProperty(value: string): string {
    if (value && this.DocumentType_List) {
      let documentType: any = this.DocumentType_List.find(crs => crs.documenttype_id.toString() == value);
      if (documentType)
        return documentType.documenttype_name;
    }
    return '';
  }


  public displayBonusReasonProperty(value: string): string {
    if (value && this.BonusReason_List) {

      let BonusReason: any = this.BonusReason_List.find(spec => spec.bonusreason_id.toString() == value);
      if (BonusReason)
        return BonusReason.bonusreason_name;
    }
    return '';
  }



  public displayBonusProperty(value: string): string {

    console.log('displayStateProperty');
    console.log(value);
    console.log(this.Bonus_List);
    console.log(IGlobalEmployeeList.TBLShamelBonusList);


    if (value && this.Bonus_List) {

      let Bonus: any = this.Bonus_List.find(obj => obj.bonus_id.toString() == value);
      console.log(Bonus);

      if (Bonus)
        return Bonus.bonus_name;
    }
    return '';
  }



  public ClearObject() {
    this.Selected_Employee_SCBouns = {};
    this.Selected_Employee_SCBouns.id = this.Selected_Emp.id;
  }

  public async Save() {



    if (!this.Form.valid == true) {
      return;
    }
    if (!this.ValidateForm() == true) {
      return;
    }
    this.getValue();

    console.log(this.Selected_Employee_SCBouns );

    if (this.Selected_Employee_SCBouns != null &&
      (this.Selected_Employee_SCBouns.serial == undefined ||
        this.Selected_Employee_SCBouns.serial <= 0)
    ) {


      this.ShamelSCBonusService.add(this.Selected_Employee_SCBouns).toPromise().then(res => {
        console.log(res)
        if (res == 1) {
          this.ClearObject();
          this.ClearForm();

        } else {



        }
      });
    }
    else if (this.Selected_Employee_SCBouns &&
      this.Selected_Employee_SCBouns.serial != null &&
      this.Selected_Employee_SCBouns.serial > 0) {

      console.log(this.Selected_Employee_SCBouns);

      this.ShamelSCBonusService.update(this.Selected_Employee_SCBouns).toPromise().then(res => {
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



    if (!this.bonus_id.value || this.bonus_id.value <= 0) {
      console.log('error1');
      this.bonus_id.setErrors({ invalid: true, required: true });
      result = false;

    }

    /*
    if (!this.reason_id.value || this.reason_id.value<=0)
    {
      console.log('error2');
      this.reason_id.setErrors({'Phone Number does not exist.': true});
      result = false;

    }


    if (!this.documenttype_id.value || this.documenttype_id.value<=0)
    {
      console.log('error2');
      this.reason_id.setErrors({'Phone Number does not exist.': true});
      result = false;

    }*/

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

    this.Selected_Employee_SCBouns.documentdate = moment(event.value).toDate();

  }


}


