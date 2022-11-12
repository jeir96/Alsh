import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _moment from 'moment';
import { Observable, startWith, map, of, combineLatest, forkJoin, Subscription } from 'rxjs';
import { TBLShamelArea } from 'src/app/modules/shared/models/employees_department/TBLShamelArea';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { TBLShamelMartialState } from 'src/app/modules/shared/models/employees_department/TBLShamelMartialState';
import { TBLShamelMiniArea } from 'src/app/modules/shared/models/employees_department/TBLShamelMiniArea';
import { TBLShamelNationality } from 'src/app/modules/shared/models/employees_department/TBLShamelNationality';
import { TBLShamelSex } from 'src/app/modules/shared/models/employees_department/TBLShamelSex';
import { TBLShamelStreetOrVillage } from 'src/app/modules/shared/models/employees_department/TBLShamelStreetOrVillage';
import { EmployeeServiceService } from 'src/app/modules/shared/services/employees_department/employee-service.service';
import { TBLShamelAreaService } from 'src/app/modules/shared/services/employees_department/tblshamel-area.service';
import { TBLShamelMartialStateService } from 'src/app/modules/shared/services/employees_department/tblshamel-martial-state.service';
import { TBLShamelMiniAreaService } from 'src/app/modules/shared/services/employees_department/tblshamel-mini-area.service';
import { TBLShamelNationalityService } from 'src/app/modules/shared/services/employees_department/tblshamel-nationality.service';
import { TBLShamelSexService } from 'src/app/modules/shared/services/employees_department/tblshamel-sex.service';
import { TBLShamelStreetOrVillageService } from 'src/app/modules/shared/services/employees_department/tblshamel-street-or-village.service';
import { FormValidationHelpersService } from 'src/app/modules/shared/services/helpers/form-validation-helpers.service';
import { EmployeePageService } from '../../employee-page-service';
import { Validator_COMPUTER_ID } from './Validators/Validator_COMPUTER_ID';
import { Validator_FullName } from './Validators/Validator_FullName';
import { Validator_GLOBAL_ID } from './Validators/validator_GLOBAL_ID';
import { Validator_INSURANCE_ID } from './Validators/Validator_INSURANCE_ID';
import { Validator_PAYROL_ID } from './Validators/Validator_PAYROL_ID';
const moment = _moment;


@Component({
  selector: 'app-new-employee-card',
  templateUrl: './new-employee-card.component.html',
  styleUrls: ['./new-employee-card.component.scss']
})
export class NewEmployeeCardComponent implements OnInit, OnDestroy {


  _Selected_Employee: TBLShamelEmployee = {};
  @Input() set Selected_Employee(passFromParent: TBLShamelEmployee) {
    this._Selected_Employee = passFromParent;
    this.getValue();
  }

  get Selected_Employee(): TBLShamelEmployee {
    return this._Selected_Employee;
  }

  _Subscription: Subscription;

  List_SEX: TBLShamelSex[] = [];
  filtered_SEX: Observable<TBLShamelSex[]>;



  List_NATIONALITY: TBLShamelNationality[] = [];
  filtered_NATIONALITY: Observable<TBLShamelNationality[]>;

  List_TBLSHAMELMARTIALSTATE: TBLShamelMartialState[] = [];
  filtered_TBLSHAMELMARTIALSTATE: Observable<TBLShamelMartialState[]>;


  List_TBLShamelMiniArea: TBLShamelMiniArea[] = [];
  filtered_TBLShamelMiniArea: Observable<TBLShamelMiniArea[]>;


  List_AREA: TBLShamelArea[] = [];
  filtered_AREA: Observable<TBLShamelArea[]>;

  List_STREETORVILLAGE: TBLShamelStreetOrVillage[] = [];
  filtered_STREETORVILLAGE: Observable<TBLShamelStreetOrVillage[]>;


  Form: UntypedFormGroup;
  id: FormControl;
  Payrol_ID: FormControl;
  Computer_ID: FormControl;
  Global_ID: FormControl;
  Insurance_ID: FormControl;
  FName: FormControl;
  LName: FormControl;

  Father: FormControl;
  Mother: FormControl;
  Birth_Place: FormControl;
  BirthDate: FormControl;
  Kayd_Place: FormControl;
  Sex_Name: FormControl;
  Nationality_ID: FormControl;
  City_ID: FormControl;
  Area_ID: FormControl;
  MiniArea_ID: FormControl;
  StreetOrVillage_ID: FormControl;
  ManualAddress: FormControl;
  MartialState_Name: FormControl;
  PhoneNum: FormControl;
  id_number: FormControl;
  EducationLast_ID: FormControl;
  JobStateFirst_ID: FormControl;
  JobStateLast_ID: FormControl;
  MalakState_Name: FormControl;
  InsuranceSalary: FormControl;
  Accounter_ID: FormControl;
  AccounterSerial: FormControl;
  Rem1: FormControl;
  Rem2: FormControl;
  Rem3: FormControl;
  Qarar_Num: FormControl;
  QararDate: FormControl;
  Emp_IN_Military_Service: FormControl;

  constructor(
    private pageEmployee: EmployeePageService,
    public formValidatorsService: FormValidationHelpersService,
    private empService: EmployeeServiceService,
    private TblMartialService: TBLShamelMartialStateService,
    private TblSexService: TBLShamelSexService,
    private TblAreaService: TBLShamelAreaService,
    private TblMinAreaService: TBLShamelMiniAreaService,
    private TblStreetService: TBLShamelStreetOrVillageService,
    private TblNationalityService: TBLShamelNationalityService,
    private _snackBar: MatSnackBar
  ) {
    this.BuildForm();
    this.Load_Data();


  }
  ngOnDestroy(): void {
    this._Subscription.unsubscribe();
  }


  BuildForm() {






    this.Form = new FormGroup({
      id: this.id = new FormControl<number | null>(null, [Validators.required],),

      'Payrol_ID': this.Payrol_ID = new FormControl<number | null>(null,
        [Validators.required, Validators.maxLength(10)],
        [Validator_PAYROL_ID(this.empService, this.Selected_Employee.id, this.pageEmployee)]),

      'Computer_ID': this.Computer_ID = new FormControl<number | null>(null,
        [Validators.required, Validators.maxLength(10)],
        [Validator_COMPUTER_ID(this.empService, this.Selected_Employee.id, this.pageEmployee)]),

      'Global_ID': this.Global_ID = new FormControl<number | null>(null,
        [Validators.required, Validators.maxLength(10)],
        [Validator_GLOBAL_ID(this.empService, this.Selected_Employee.id, this.pageEmployee)]),

      'Insurance_ID': this.Insurance_ID = new FormControl<number | null>(null,
        [Validators.required, Validators.maxLength(10)],
        [Validator_INSURANCE_ID(this.empService, this.Selected_Employee.id, this.pageEmployee)]),

      'FName': this.FName = new FormControl<number | null>(null,
        [Validators.required, Validators.maxLength(35)]),


      'LName': this.LName = new FormControl<number | null>(null,
        [Validators.required, Validators.maxLength(35)], [Validator_FullName(this.empService, this.Form.value)]),


      'Father': this.Father = new FormControl<number | null>(null,
        [Validators.required, Validators.maxLength(35)], [Validator_FullName(this.empService, this.Form.value)]),

      'Mother': this.Mother = new FormControl<number | null>(null,
        [Validators.required, Validators.maxLength(35)], [Validator_FullName(this.empService, this.Form.value)]),


      'Birth_Place': this.Birth_Place = new FormControl<number | null>(null,
        [Validators.required, Validators.maxLength(35)]),

      'BirthDate': this.BirthDate = new FormControl<number | null>(null),

      'Kayd_Place': this.Kayd_Place = new FormControl<number | null>(null,
        [Validators.required, Validators.maxLength(35)]),

      'Sex_Name': this.Sex_Name = new FormControl<number | null>(null,
        [Validators.required, Validators.maxLength(5)]),

      'Qarar_Num': this.Qarar_Num = new FormControl<number | null>(null, [Validators.required]),

      'QararDate': this.QararDate = new FormControl<number | null>(null, [Validators.required]),

      'Nationality_ID': this.Nationality_ID = new FormControl<number | null>(null, [Validators.required]),
      'City_ID': this.City_ID = new FormControl<number | null>(null, [Validators.required]),
      'Area_ID': this.Area_ID = new FormControl<number | null>(null, []),
      'MiniArea_ID': this.MiniArea_ID = new FormControl<number | null>(null, []),
      'StreetOrVillage_ID': this.StreetOrVillage_ID = new FormControl<number | null>(null, []),
      'ManualAddress': this.ManualAddress = new FormControl<number | null>(null, []),
      'MartialState_Name': this.MartialState_Name = new FormControl<number | null>(null, []),
      'PhoneNum': this.PhoneNum = new FormControl<number | null>(null, []),
      'id_number': this.id_number = new FormControl<number | null>(null, []),
      'EducationLast_ID': this.EducationLast_ID = new FormControl<number | null>(null, []),
      'JobStateFirst_ID': this.JobStateFirst_ID = new FormControl<number | null>(null, []),
      'JobStateLast_ID': this.JobStateLast_ID = new FormControl<number | null>(null, []),
      'MalakState_Name': this.MalakState_Name = new FormControl<number | null>(null, []),
      'InsuranceSalary': this.InsuranceSalary = new FormControl<number | null>(null, []),
      'Accounter_ID': this.Accounter_ID = new FormControl<number | null>(null, []),
      'AccounterSerial': this.AccounterSerial = new FormControl<number | null>(null, []),
      'Rem1': this.Rem1 = new FormControl<number | null>(null, []),
      'Rem2': this.Rem2 = new FormControl<number | null>(null, []),
      'Rem3': this.Rem3 = new FormControl<number | null>(null, []),
      'Emp_IN_Military_Service': this.Emp_IN_Military_Service = new FormControl<number | null>(null, []),
    });

  }

  Load_BLShamelMartialState(): Observable<TBLShamelMartialState[]> {
    if (this.TblMartialService.List_TBLShamelMartialState == null ||
      this.TblMartialService.List_TBLShamelMartialState == undefined ||
      this.TblMartialService.List_TBLShamelMartialState.length == 0)
      return this.TblMartialService.list();
    return of(this.TblMartialService.List_TBLShamelMartialState);
  }

  Load_TBLShamelSex(): Observable<TBLShamelSex[]> {
    if (this.TblSexService.List_TBLShamelSex == null ||
      this.TblSexService.List_TBLShamelSex == undefined ||
      this.TblSexService.List_TBLShamelSex.length == 0)
      return this.TblSexService.list();
    return of(this.TblSexService.List_TBLShamelSex);
  }


  Load_TBLShamelArea(): Observable<TBLShamelArea[]> {
    if (this.TblAreaService.List_TBLShamelArea == null ||
      this.TblAreaService.List_TBLShamelArea == undefined ||
      this.TblAreaService.List_TBLShamelArea.length == 0)
      return this.TblAreaService.list();
    return of(this.TblAreaService.List_TBLShamelArea);
  }



  Load_TBLShamelStreetOrVillage(): Observable<TBLShamelStreetOrVillage[]> {
    if (this.TblStreetService.List_TBLShamelStreetOrVillage == null ||
      this.TblStreetService.List_TBLShamelStreetOrVillage == undefined ||
      this.TblStreetService.List_TBLShamelStreetOrVillage.length == 0)
      return this.TblStreetService.list();
    return of(this.TblStreetService.List_TBLShamelStreetOrVillage);
  }


  Load_TBLShamelMiniArea(): Observable<TBLShamelMiniArea[]> {
    if (this.TblMinAreaService.List_TBLShamelMiniArea == null ||
      this.TblMinAreaService.List_TBLShamelMiniArea == undefined ||
      this.TblMinAreaService.List_TBLShamelMiniArea.length == 0)
      return this.TblMinAreaService.list();
    return of(this.TblMinAreaService.List_TBLShamelMiniArea);
  }



  Load_TBLShamelNationality(): Observable<TBLShamelNationality[]> {
    if (this.TblNationalityService.List_TBLShamelNationality == null ||
      this.TblNationalityService.List_TBLShamelNationality == undefined ||
      this.TblNationalityService.List_TBLShamelNationality.length == 0)
      return this.TblNationalityService.list();
    return of(this.TblNationalityService.List_TBLShamelNationality);
  }




  Load_Data() {

    this._Subscription = forkJoin(
      this.Load_BLShamelMartialState(),
      this.Load_TBLShamelSex(),
      this.Load_TBLShamelArea(),
      this.Load_TBLShamelStreetOrVillage(),
      this.Load_TBLShamelMiniArea(),
      this.Load_TBLShamelNationality()
    ).subscribe(
      res => {
        this.List_TBLSHAMELMARTIALSTATE = res[0];
        this.filtered_TBLSHAMELMARTIALSTATE = of(res[0]);
        this.TblMartialService.List_TBLShamelMartialState = res[0];
        this.TblMartialService.List_TBLShamelMartialState_BehaviorSubject.next(res[0]);

        this.List_SEX = res[1];
        this.filtered_SEX = of(this.List_SEX);
        this.TblSexService.List_TBLShamelSex = this.List_SEX;
        this.TblSexService.List_TBLShamelSex_BehaviorSubject.next(this.List_SEX);


        this.List_AREA = res[2];
        this.filtered_AREA = of(this.List_AREA);
        this.TblAreaService.List_TBLShamelArea = this.List_AREA;
        this.TblAreaService.List_TBLShamelArea_BehaviorSubject.next(this.List_AREA);


        this.List_STREETORVILLAGE = res[3];
        this.filtered_STREETORVILLAGE = of(this.List_STREETORVILLAGE);
        this.TblStreetService.List_TBLShamelStreetOrVillage = this.List_STREETORVILLAGE;
        this.TblStreetService.List_TBLShamelStreetOrVillage_BehaviorSubject.next(this.List_STREETORVILLAGE);


        this.List_TBLShamelMiniArea = res[4];
        this.filtered_TBLShamelMiniArea = of(this.List_TBLShamelMiniArea);
        this.TblMinAreaService.List_TBLShamelMiniArea = this.List_TBLShamelMiniArea;
        this.TblMinAreaService.List_TBLShamelMiniArea_BehaviorSubject.next(this.List_TBLShamelMiniArea);


        this.List_NATIONALITY = res[5];
        this.filtered_NATIONALITY = of(this.List_NATIONALITY);
        this.TblNationalityService.List_TBLShamelNationality = this.List_NATIONALITY;
        this.TblNationalityService.List_TBLShamelNationality_BehaviorSubject.next(this.List_NATIONALITY);




        this.FillArrayUsingService();

        this.SetValue();
      }
    )


  }

  //#endregion

  FillArrayUsingService() {
    this.filtered_TBLSHAMELMARTIALSTATE = this.MartialState_Name.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filtered_MARTIALSTATE(name) : this.List_TBLSHAMELMARTIALSTATE.slice())),
    );


    this.filtered_SEX = this.Sex_Name.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name && name.length > 0 ? this._filtered_SEX(name) : this.List_SEX.slice())),
    );

    this.filtered_AREA = this.Area_ID.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filtered_Area(name) : this.List_AREA.slice())),
    );


    this.filtered_STREETORVILLAGE = this.StreetOrVillage_ID.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filtered_STREETORVILLAGE(name) : this.List_STREETORVILLAGE.slice())),
    );


    this.filtered_TBLShamelMiniArea = this.MiniArea_ID.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => this._filtered_MiniArea(name)),
    );

    this.filtered_NATIONALITY = this.Nationality_ID.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filtered_NATIONALITY(name) : this.List_NATIONALITY.slice())),
    );
  }

  ngOnInit(): void {


  }

  private _filtered_MARTIALSTATE(name: string): TBLShamelMartialState[] {
    const filterValue = name.toLowerCase();
    return this.List_TBLSHAMELMARTIALSTATE.filter(option => option.MartialState_Name.includes(filterValue));
  }
  private _filtered_SEX(name: string): TBLShamelSex[] {
    console.log('_filtered_SEX');
    console.log(this.List_SEX);
    console.log(name);
    const filterValue = name.toLowerCase();
    return this.List_SEX.filter(option => option != null && option != undefined && option?.Sex_Name?.includes(filterValue));
  }


  private _filtered_STREETORVILLAGE(name: string): TBLShamelStreetOrVillage[] {
    const filterValue = name.toLowerCase();
    return this.List_STREETORVILLAGE.filter(option => option.StreetOrVillage_Name.includes(filterValue));
  }

  private _filtered_Area(name: string): TBLShamelArea[] {
    const filterValue = name.toLowerCase();
    return this.List_AREA.filter(option => option.area_name.includes(filterValue));
  }

  private _filtered_MiniArea(name: string): TBLShamelMiniArea[] {
    const filterValue = name.toLowerCase();

    return this.List_TBLShamelMiniArea.filter(option => option.MiniArea_Name && option.MiniArea_Name.includes(filterValue) &&
      option.Area_ID == this.Selected_Employee.MiniArea_ID);
  }

  private _filtered_NATIONALITY(name: string): TBLShamelNationality[] {
    console.log(this.List_NATIONALITY);
    const filterValue = name.toLowerCase();
    return this.List_NATIONALITY.filter(option => option.Nationality_Name && option.Nationality_Name.includes(filterValue));
  }





  public OnSelect_MARTIALSTATE_Change(event: MatAutocompleteSelectedEvent) {
    if (event && this.Selected_Employee) {
      console.log(event.option.value);
      this.Selected_Employee.MartialState_Name = ((event.option.value as TBLShamelMartialState).MartialState_Name);
    }
  }





  public OnSelect_SEX_Change(event: MatAutocompleteSelectedEvent) {
    if (event && this.Selected_Employee) {
      console.log(event.option.value);
      this.Selected_Employee.Sex_Name = ((event.option.value as TBLShamelSex).Sex_Name);
    }
  }
  public OnSelect_NATIONALITY_Change(event: MatAutocompleteSelectedEvent) {
    if (event && this.Selected_Employee) {
      console.log(event.option.value);
      this.Selected_Employee.Nationality_ID = ((event.option.value as TBLShamelNationality).Nationality_ID);
    }
  }

  public OnSelect_AREA_Change(event: MatAutocompleteSelectedEvent) {
    if (event && this.Selected_Employee) {
      console.log(event.option.value);
      this.Selected_Employee.Area_ID = ((event.option.value as TBLShamelArea).area_id);


    }
  }

  public OnSelect_STREETORVILLAGE_Change(event: MatAutocompleteSelectedEvent) {
    if (event && this.Selected_Employee) {
      console.log(event.option.value);
      this.Selected_Employee.StreetOrVillage_ID = ((event.option.value as TBLShamelStreetOrVillage).StreetOrVillage_ID);
    }
  }

  public OnSelect_MINIAREA_Change(event: MatAutocompleteSelectedEvent) {
    if (event && this.Selected_Employee) {
      console.log(event.option.value);
      this.Selected_Employee.MiniArea_ID = ((event.option.value as TBLShamelMiniArea).MiniArea_ID);
    }
  }



  public Display_MARTIALSTATE_Property(value: TBLShamelMartialState): string {
    return value && value.MartialState_Name ? value.MartialState_Name : '';
  }

  public Display_SEX_Property(value: TBLShamelSex): string {
    return value && value.Sex_Name ? value.Sex_Name : '';
  }

  public Display_NATIONALITY_Property(value: TBLShamelNationality): string {
    return value && value.Nationality_Name ? value.Nationality_Name : '';
  }

  public Display_AREA_Property(value: TBLShamelArea): string {
    return value && value.area_name ? value.area_name : '';
  }

  public Display_STREETORVILLAGE_Property(value: TBLShamelStreetOrVillage): string {
    return value && value.StreetOrVillage_Name ? value.StreetOrVillage_Name : '';
  }


  public Display_MINIAREA_Property(value: TBLShamelMiniArea): string {
    return value && value.MiniArea_Name ? value.MiniArea_Name : '';
  }




  Save() {


    console.log(this.Form.valid);

    console.log(this.Form.errors);


    this.getValue();

    console.log(this.Selected_Employee);
    if (this.Selected_Employee.id != null &&
      this.Selected_Employee.id > 0 &&
      this.pageEmployee.ModeEntry === 'update') {
      this.empService.update(this.Selected_Employee).subscribe(
        data => {
          if (data > 0) {
            this._snackBar.open('تم بنجاح', 'موافق');
          }

        }
      );
    } else if (this.Selected_Employee.id != null &&
      this.Selected_Employee.id > 0 &&
      this.pageEmployee.ModeEntry === 'add') {
      console.log(this.Selected_Employee);
      this.empService.add(this.Selected_Employee).subscribe(
        data => {
          if (data > 0) {
            this._snackBar.open('تم بنجاح', 'موافق');
          }
        }
      );
    }
  }

  getValue() {

    if (this.Selected_Employee != null && this.id_number.value != null)
      this.Selected_Employee.ID_Number = this.id_number.value;

    if (this.Selected_Employee != null && this.id.value != null)
      this.Selected_Employee.id = this.id.value;

    if (this.Selected_Employee != null && this.Payrol_ID.value != null)
      this.Selected_Employee.Payrol_ID = this.Payrol_ID.value;

    if (this.Selected_Employee != null && this.Computer_ID.value != null)
      this.Selected_Employee.Computer_ID = this.Computer_ID.value;

    if (this.Selected_Employee != null && this.Global_ID.value != null)
      this.Selected_Employee.Global_ID = this.Global_ID.value;

    if (this.Selected_Employee != null && this.Insurance_ID.value != null)
      this.Selected_Employee.Insurance_ID = this.Insurance_ID.value;

    if (this.Selected_Employee != null && this.FName.value != null)
      this.Selected_Employee.FName = this.FName.value;

    if (this.Selected_Employee != null && this.LName.value != null)
      this.Selected_Employee.LName = this.LName.value;

    if (this.Selected_Employee != null && this.Father.value != null)
      this.Selected_Employee.Father = this.Father.value;

    if (this.Selected_Employee != null && this.Mother.value != null)
      this.Selected_Employee.Mother = this.Mother.value;

    if (this.Selected_Employee != null && this.Birth_Place.value != null)
      this.Selected_Employee.Birth_Place = this.Birth_Place.value;


    if (this.Selected_Employee != null && this.BirthDate.value != null)
      this.Selected_Employee.BirthDate = moment(this.BirthDate.value).format('YYYY/MM/DD');

    if (this.Selected_Employee != null && this.Kayd_Place.value != null)
      this.Selected_Employee.Kayd_Place = this.Kayd_Place.value;



    if (this.Sex_Name.value != null && this.Sex_Name.value != undefined)
      this.Selected_Employee.Sex_Name = this.Sex_Name.value;


    if (this.Nationality_ID.value != null && this.Nationality_ID.value != undefined)
      this.Selected_Employee.Nationality_ID = this.Nationality_ID.value;

    if (this.Selected_Employee != null && this.City_ID.value != null)
      this.Selected_Employee.City_ID = this.City_ID.value;

    if (this.Selected_Employee != null && this.Area_ID.value != undefined)
      this.Selected_Employee.Area_ID = this.Area_ID.value.Area_ID;

    if (this.Selected_Employee != null && this.MiniArea_ID.value.MiniArea_ID != undefined)
      this.Selected_Employee.MiniArea_ID = this.MiniArea_ID.value.MiniArea_ID;

    if (this.Selected_Employee != null && this.StreetOrVillage_ID.value != undefined)
      this.Selected_Employee.StreetOrVillage_ID = this.StreetOrVillage_ID.value.StreetOrVillage_ID;

    if (this.Selected_Employee != null && this.ManualAddress.value != undefined)
      this.Selected_Employee.ManualAddress = this.ManualAddress.value;

    if (this.Selected_Employee != null && this.MartialState_Name.value != undefined)
      this.Selected_Employee.MartialState_Name = this.MartialState_Name.value.MartialState_Name;

    if (this.Selected_Employee != null && this.PhoneNum.value != null)
      this.Selected_Employee.PhoneNum = this.PhoneNum.value;

    if (this.Selected_Employee != null && this.id_number.value != null)
      this.Selected_Employee.ID_Number = this.id_number.value;

    if (this.Selected_Employee != null && this.id_number.value != null)
      this.Selected_Employee.EducationLast_ID = this.EducationLast_ID.value;

    if (this.Selected_Employee != null && this.JobStateFirst_ID.value != null)
      this.Selected_Employee.JobStateFirst_ID = this.JobStateFirst_ID.value;


    if (this.Selected_Employee != null && this.MalakState_Name.value != null)
      this.Selected_Employee.MalakState_Name = this.MalakState_Name.value;

    if (this.Selected_Employee != null && this.InsuranceSalary.value != null)
      this.Selected_Employee.InsuranceSalary = this.InsuranceSalary.value;

    if (this.Selected_Employee != null && this.Accounter_ID.value != null)
      this.Selected_Employee.Accounter_ID = this.Accounter_ID.value;

    if (this.Selected_Employee != null && this.AccounterSerial.value != null)
      this.Selected_Employee.AccounterSerial = this.AccounterSerial.value;

    if (this.Selected_Employee != null && this.Rem1.value != null)
      this.Selected_Employee.Rem1 = this.Rem1.value;

    if (this.Selected_Employee != null && this.id_number.value != null)
      this.Selected_Employee.Rem2 = this.Rem2.value;

    if (this.Selected_Employee != null && this.Rem3.value != null)
      this.Selected_Employee.Rem3 = this.Rem3.value;

    if (this.Selected_Employee != null && this.Qarar_Num.value != null)
      this.Selected_Employee.Qarar_Num = this.Qarar_Num.value;

    if (this.Selected_Employee != null && this.QararDate.value != null)
      this.Selected_Employee.QararDate = moment(this.QararDate.value).toDate();


    if (this.Emp_IN_Military_Service.value == true)
      this.Selected_Employee.Emp_IN_Military_Service = 1;
    else this.Selected_Employee.Emp_IN_Military_Service = 0;


  }

  SetValue() {
    if (this.Selected_Employee.id != null)
      this.id.setValue(this.Selected_Employee.id);

    if (this.Selected_Employee.Payrol_ID != null)
      this.Payrol_ID.setValue(this.Selected_Employee.Payrol_ID);

    if (this.Selected_Employee.Computer_ID != null)
      this.Computer_ID.setValue(this.Selected_Employee.Computer_ID);

    if (this.Selected_Employee.Global_ID != null)
      this.Global_ID.setValue(this.Selected_Employee.Global_ID);

    if (this.Selected_Employee.Insurance_ID != null)
      this.Insurance_ID.setValue(this.Selected_Employee.Insurance_ID);

    if (this.Selected_Employee.FName != null)
      this.FName.setValue(this.Selected_Employee.FName);

    if (this.Selected_Employee.LName != null)
      this.LName.setValue(this.Selected_Employee.LName);

    if (this.Selected_Employee.Father != null)
      this.Father.setValue(this.Selected_Employee.Father);

    if (this.Selected_Employee.Mother != null)
      this.Mother.setValue(this.Selected_Employee.Mother);

    if (this.Selected_Employee.Birth_Place != null)
      this.Birth_Place.setValue(this.Selected_Employee.Birth_Place);


    if (this.Selected_Employee.BirthDate != null)
      this.BirthDate.setValue(moment(this.Selected_Employee.BirthDate).toDate());

    if (this.Selected_Employee.Kayd_Place != null)
      this.Kayd_Place.setValue(this.Selected_Employee.Kayd_Place);

    if (this.Selected_Employee.Sex_Name != null)
      this.Sex_Name.setValue(this.Selected_Employee.Sex_Name);

    if (this.Selected_Employee.Nationality_ID != null)
      this.Nationality_ID.setValue(this.Selected_Employee.Nationality_ID);

    if (this.Selected_Employee.Area_ID != null)
      this.City_ID.setValue(this.Selected_Employee.City_ID);

    if (this.Selected_Employee.id != null)
      this.Area_ID.setValue(this.Selected_Employee.Area_ID);

    if (this.Selected_Employee.MiniArea_ID != null)
      this.MiniArea_ID.setValue(this.Selected_Employee.MiniArea_ID);

    if (this.Selected_Employee.StreetOrVillage_ID != null)
      this.StreetOrVillage_ID.setValue(this.Selected_Employee.StreetOrVillage_ID);

    if (this.Selected_Employee.ManualAddress != null)
      this.ManualAddress.setValue(this.Selected_Employee.ManualAddress);

    if (this.Selected_Employee.MartialState_Name != null)
      this.MartialState_Name.setValue(this.Selected_Employee.MartialState_Name);

    if (this.Selected_Employee.PhoneNum != null)
      this.PhoneNum.setValue(this.Selected_Employee.PhoneNum);

    if (this.Selected_Employee.ID_Number != null)
      this.id_number.setValue(this.Selected_Employee.ID_Number);

    if (this.Selected_Employee.EducationLast_ID != null)
      this.EducationLast_ID.setValue(this.Selected_Employee.EducationLast_ID);

    if (this.Selected_Employee.JobStateFirst_ID != null)
      this.JobStateFirst_ID.setValue(this.Selected_Employee.JobStateFirst_ID);

    if (this.Selected_Employee.MalakState_Name != null)
      this.MalakState_Name.setValue(this.Selected_Employee.MalakState_Name);

    if (this.Selected_Employee.InsuranceSalary != null)
      this.InsuranceSalary.setValue(this.Selected_Employee.InsuranceSalary);

    if (this.Selected_Employee.Accounter_ID != null)
      this.Accounter_ID.setValue(this.Selected_Employee.Accounter_ID);

    if (this.Selected_Employee.AccounterSerial != null)
      this.AccounterSerial.setValue(this.Selected_Employee.AccounterSerial);

    if (this.Selected_Employee.Rem1 != null)
      this.Rem1.setValue(this.Selected_Employee.Rem1);

    if (this.Selected_Employee.Rem2 != null)
      this.Rem2.setValue(this.Selected_Employee.Rem2);

    if (this.Selected_Employee.Rem3 != null)
      this.Rem3.setValue(this.Selected_Employee.Rem3);

    if (this.Selected_Employee.Qarar_Num != null)
      this.Qarar_Num.setValue(this.Selected_Employee.Qarar_Num);

    if (this.Selected_Employee.QararDate != null)
      this.QararDate.setValue(moment(this.Selected_Employee.QararDate).toDate());

  }


  // Helper Function For Display Validate in Html Template
  public hasError = (controlName: string, errorName: string) => {
    return this.Form.controls[controlName].hasError(errorName);
  }

  keytab(event: any) {
    console.log('enter press');
    let element = event.srcElement.nextElementSibling; // get the sibling element

    if (element == null)  // check if its null
      return;
    else
      element.focus();   // focus if not null
  }

  public fieldHasErrors(form: any, field: string) {
    return this.formValidatorsService.fieldHasErrors(form, field);
  }

  public printFirstErrorMessage(
    form: any,
    controlName: string,
    label: string,
    errors: { name: string, message?: string }[],
    isFemale?: boolean
  ): string {

    return this.formValidatorsService.printFirstErrorMessage(form, controlName, label, errors, isFemale);

  }


  public autoPrintFirstErrorMessage(
    form: any,
    controlName: string,
    label: string,
    isFemale?: boolean
  ): string {

    return this.formValidatorsService.autoPrintFirstErrorMessage(form, controlName, label, isFemale);

  }





}
