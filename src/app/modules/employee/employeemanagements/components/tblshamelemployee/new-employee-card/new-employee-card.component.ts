import { FormValidationHelpersService } from 'src/app/modules/shared/services/helpers/form-validation-helpers.service';
import { Component, Input, OnInit } from '@angular/core';
import {  UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _moment from 'moment';
import { Observable, startWith, map, of } from 'rxjs';
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
import { EmployeePageService } from '../../employee-page-service';
import { Validator_COMPUTER_ID } from './Validators/Validator_COMPUTER_ID';
import { Validator_GLOBAL_ID } from './Validators/Validator_GLOBAL_ID';
import { Validator_ID } from './Validators/Validator_ID';
import { Validator_INSURANCE_ID } from './Validators/Validator_INSURANCE_ID';
import { Validator_PAYROL_ID } from './Validators/Validator_PAYROL_ID';
import { Validator_FullName } from './Validators/Validator_FullName';
const moment = _moment;


@Component({
  selector: 'app-new-employee-card',
  templateUrl: './new-employee-card.component.html',
  styleUrls: ['./new-employee-card.component.scss']
})
export class NewEmployeeCardComponent implements OnInit {



  arr: TBLShamelSex[] = [{FIXED: 0, Sex_ID: 3, Sex_Name: "abc"}]

  sexArray: Observable<TBLShamelSex[]> = of(this.arr)

  _Selected_Employee : TBLShamelEmployee = {};
  @Input() set  Selected_Employee(passFromParent:TBLShamelEmployee)
  {
    this._Selected_Employee = passFromParent;
    // this.Object2FromControl();
  }

  get Selected_Employee():TBLShamelEmployee
  {
    return this._Selected_Employee;
  }



  List_SEX : TBLShamelSex[]=[];
  filtered_SEX :Observable< TBLShamelSex[]>;



  List_NATIONALITY:TBLShamelNationality[]=[];
  filtered_NATIONALITY:Observable<TBLShamelNationality[]>;

  List_TBLSHAMELMARTIALSTATE:TBLShamelMartialState[] =[];
  filtered_TBLSHAMELMARTIALSTATE :Observable<TBLShamelMartialState[]>;




  List_TBLShamelMiniArea:TBLShamelMiniArea[] =[];
  filtered_TBLShamelMiniArea:Observable<TBLShamelMiniArea[]>;




  List_AREA:TBLShamelArea[] = [] ;
  filtered_AREA:Observable<TBLShamelArea[]>;

  List_STREETORVILLAGE:TBLShamelStreetOrVillage[] =[];
  filtered_STREETORVILLAGE:Observable<TBLShamelStreetOrVillage[]>;


  Form: UntypedFormGroup;
  fcl_ID: UntypedFormControl;
  fcl_PAYROL_ID: UntypedFormControl;
  fcl_COMPUTER_ID: UntypedFormControl;
  fcl_GLOBAL_ID: UntypedFormControl;
  fcl_INSURANCE_ID: UntypedFormControl;
  fcl_FNAME: UntypedFormControl;
  fcl_LNAME: UntypedFormControl;

  fcl_FATHER: UntypedFormControl;
  fcl_MOTHER: UntypedFormControl;
  fcl_BIRTH_PLACE: UntypedFormControl;
  fcl_BIRTHDATE: UntypedFormControl;
  fcl_KAYD_PLACE: UntypedFormControl;
  fcl_SEX_NAME: UntypedFormControl;
  fcl_NATIONALITY_ID: UntypedFormControl;
  fcl_CITY_ID: UntypedFormControl;
  fcl_AREA_ID: UntypedFormControl;
  fcl_MINIAREA_ID: UntypedFormControl;
  fcl_STREETORVILLAGE_ID: UntypedFormControl;
  fcl_MANUALADDRESS: UntypedFormControl;
  fcl_MARTIALSTATE_NAME: UntypedFormControl;
  fcl_PHONENUM: UntypedFormControl;
  fcl_ID_NUMBER: UntypedFormControl;
  fcl_EDUCATIONLAST_ID: UntypedFormControl;
  fcl_JOBSTATEFIRST_ID: UntypedFormControl;
  fcl_JOBSTATELAST_ID: UntypedFormControl;
  fcl_MALAKSTATE_NAME: UntypedFormControl;
  fcl_INSURANCESALARY: UntypedFormControl;
  fcl_ACCOUNTER_ID: UntypedFormControl;
  fcl_ACCOUNTERSERIAL: UntypedFormControl;
  fcl_REM1: UntypedFormControl;
  fcl_REM2: UntypedFormControl;
  fcl_REM3: UntypedFormControl;
  fcl_QARAR_NUM: UntypedFormControl;
  fcl_QARARDATE: UntypedFormControl;
  fcl_EMP_IN_MILITARY_SERVICE: UntypedFormControl;

  constructor(
    private pageEmployee:EmployeePageService,
    private empService: EmployeeServiceService,
    public formValidatorsService: FormValidationHelpersService,
    private TblMartialService:TBLShamelMartialStateService,
    private TblSexService:TBLShamelSexService,
     private TblAreaService:TBLShamelAreaService,
    private TblMinAreaService:TBLShamelMiniAreaService,
    private TblStreetService:TBLShamelStreetOrVillageService,
    private TblNationalityService:TBLShamelNationalityService,
    private _snackBar: MatSnackBar
    ) {

      if(this.TblMartialService.List_TBLShamelMartialState == null ||
        this.TblMartialService.List_TBLShamelMartialState.length ==0 )
        this.TblMartialService.fill();
        this.TblMartialService.List_TBLShamelMartialState_BehaviorSubject.subscribe(
          data=>
          {
            this.List_TBLSHAMELMARTIALSTATE = data;
          }

        )

        if(this.TblSexService.List_TBLShamelSex == null ||
          this.TblSexService.List_TBLShamelSex.length ==0 )
          this.TblSexService.fill();
          this.TblSexService.List_TBLShamelSex_BehaviorSubject.subscribe(
            data=>
            {
              this.List_SEX = data;
              console.log("this.List_SEX", this.List_SEX)
            }
          )


          if(this.TblAreaService.List_TBLShamelArea == null ||
            this.TblAreaService.List_TBLShamelArea.length ==0 )
            this.TblAreaService.fill();
            this.TblAreaService.List_TBLShamelArea_BehaviorSubject.subscribe(
              data=>
              {
                this.List_AREA = data;
              }
            )


            if(this.TblStreetService.List_TBLShamelStreetOrVillage == null ||
              this.TblStreetService.List_TBLShamelStreetOrVillage.length ==0 )
              this.TblStreetService.fill();
              this.TblStreetService.List_TBLShamelStreetOrVillage_BehaviorSubject.subscribe(
                data=>
                {
                  this.List_STREETORVILLAGE = data;
                }
              )



            if(this.TblMinAreaService.List_TBLShamelMiniArea == null ||
              this.TblMinAreaService.List_TBLShamelMiniArea.length ==0 )
              this.TblMinAreaService.fill();
              this.TblMinAreaService.List_TBLShamelMiniArea_BehaviorSubject.subscribe(
                data=>
                {
                  this.List_TBLShamelMiniArea = data;
                }
              )




            if(this.TblStreetService.List_TBLShamelStreetOrVillage == null ||
              this.TblStreetService.List_TBLShamelStreetOrVillage.length ==0 )
              this.TblStreetService.fill();
              this.TblStreetService.List_TBLShamelStreetOrVillage_BehaviorSubject.subscribe(
                data=>
                {
                  this.List_STREETORVILLAGE = data;
                }
              )




    if(this.TblStreetService.List_TBLShamelStreetOrVillage)
      this.List_STREETORVILLAGE = this.TblStreetService.List_TBLShamelStreetOrVillage;
    else
    {
      this.TblStreetService.list().subscribe
      (
        (data)=>
        {
          this.List_STREETORVILLAGE = data as TBLShamelStreetOrVillage[];
          }
      );
    }


    if(this.TblStreetService.List_TBLShamelStreetOrVillage)
      this.List_STREETORVILLAGE = this.TblStreetService.List_TBLShamelStreetOrVillage;
    else
    {
      this.TblStreetService.list().subscribe
      (
        (data)=>
        {
          this.List_STREETORVILLAGE = data as TBLShamelStreetOrVillage[];
          }
      );
    }

    if(this.TblNationalityService.List_TBLShamelNationality)
    this.List_NATIONALITY = this.TblNationalityService.List_TBLShamelNationality;
  else
  {
    this.TblNationalityService.list().subscribe
    (
      (data)=>
      {
        this.List_NATIONALITY = data as TBLShamelNationality[];
        }
    );
  }



    this.Form = new UntypedFormGroup({});
    this.fcl_ID = new UntypedFormControl('',
      [Validators.required, , Validators.maxLength(10), Validators.pattern('^(0|[1-9][0-9]*)$')],
      [Validator_ID(this.empService, this.Selected_Employee.id,this.pageEmployee)]
    );

    this.fcl_PAYROL_ID = new UntypedFormControl('',
      [Validators.maxLength(10)],
      [Validator_PAYROL_ID(this.empService, this.Selected_Employee.id,this.pageEmployee)]);

    this.fcl_COMPUTER_ID = new UntypedFormControl('',
      [Validators.required, Validators.maxLength(10),  Validators.pattern('^(0|[1-9][0-9]*)$')],
      [Validator_COMPUTER_ID(this.empService, this.Selected_Employee.id,this.pageEmployee)]);

    this.fcl_GLOBAL_ID = new UntypedFormControl('',
      [Validators.required, Validators.maxLength(10)],
      [Validator_GLOBAL_ID(this.empService, this.Selected_Employee.id,this.pageEmployee)]);

    this.fcl_INSURANCE_ID = new UntypedFormControl('',
      [Validators.required, Validators.maxLength(10), Validators.pattern('^(0|[1-9][0-9]*)$')],
      [Validator_INSURANCE_ID(this.empService, this.Selected_Employee.id,this.pageEmployee)]);

    this.fcl_FNAME = new UntypedFormControl('',
      [Validators.required, Validators.maxLength(35)],
      [Validator_FullName(this.empService, this.Selected_Employee.id, this.Selected_Employee, this.pageEmployee )]
      );


      this.fcl_LNAME = new UntypedFormControl('',
      [Validators.required, Validators.maxLength(35)],
      [Validator_FullName(this.empService, this.Selected_Employee.id, this.Selected_Employee, this.pageEmployee )]
      );


    this.fcl_FATHER = new UntypedFormControl('',
      [Validators.required, Validators.maxLength(35)],
      [Validator_FullName(this.empService, this.Selected_Employee.id, this.Selected_Employee, this.pageEmployee)]
      );

    this.fcl_MOTHER = new UntypedFormControl('',
      [Validators.required, Validators.maxLength(35)]);

    this.fcl_BIRTH_PLACE = new UntypedFormControl('',
      [Validators.required, Validators.maxLength(35)]);

    this.fcl_BIRTHDATE = new UntypedFormControl('');

    this.fcl_KAYD_PLACE = new UntypedFormControl('',
      [Validators.required, Validators.maxLength(35)]);

    this.fcl_SEX_NAME = new UntypedFormControl('',
      [Validators.required, Validators.maxLength(5)]);

    this.fcl_NATIONALITY_ID = new UntypedFormControl('',  [Validators.required, Validators.maxLength(5)]);

    this.fcl_CITY_ID = new UntypedFormControl('',  [Validators.required, Validators.maxLength(5)]);

    this.fcl_QARAR_NUM = new UntypedFormControl('', [Validators.required, Validators.maxLength(15)]);

    this.fcl_QARARDATE = new UntypedFormControl('', []);

    this.fcl_AREA_ID = new UntypedFormControl('',  [Validators.required, Validators.maxLength(5)]);
    this.fcl_MINIAREA_ID = new UntypedFormControl('',  [Validators.required, Validators.maxLength(5)]);
    this.fcl_STREETORVILLAGE_ID = new UntypedFormControl('',  [Validators.required, Validators.maxLength(5)]);

    this.fcl_MANUALADDRESS = new UntypedFormControl('', []);
    this.fcl_MARTIALSTATE_NAME = new UntypedFormControl('',  [Validators.required, Validators.maxLength(35)]);
    this.fcl_PHONENUM = new UntypedFormControl('', [Validators.required, Validators.maxLength(60)]);
    this.fcl_ID_NUMBER = new UntypedFormControl('', [ Validators.maxLength(30)]);
    this.fcl_EDUCATIONLAST_ID = new UntypedFormControl('', []);
    this.fcl_JOBSTATEFIRST_ID = new UntypedFormControl('', []);
    this.fcl_JOBSTATELAST_ID = new UntypedFormControl('', []);
    this.fcl_MALAKSTATE_NAME = new UntypedFormControl('', []);
    this.fcl_INSURANCESALARY = new UntypedFormControl('', []);
    this.fcl_ACCOUNTER_ID = new UntypedFormControl('', []);
    this.fcl_ACCOUNTERSERIAL = new UntypedFormControl('', []);
    this.fcl_REM1 = new UntypedFormControl('',  [Validators.required, Validators.maxLength(100)]);
    this.fcl_REM2 = new UntypedFormControl('',  [Validators.required, Validators.maxLength(100)]);
    this.fcl_REM3 = new UntypedFormControl('',  [Validators.required, Validators.maxLength(100)]);
    // this.fcl_FNAME = new UntypedFormControl('', []);
    this.fcl_EMP_IN_MILITARY_SERVICE= new UntypedFormControl('', []);



    this.Form.addControl('ID', this.fcl_ID);
    this.Form.addControl('PAYROL_ID', this.fcl_PAYROL_ID);
    this.Form.addControl('COMPUTER_ID', this.fcl_COMPUTER_ID);
    this.Form.addControl('GLOBAL_ID', this.fcl_GLOBAL_ID);
    this.Form.addControl('INSURANCE_ID', this.fcl_INSURANCE_ID);
    this.Form.addControl('FNAME', this.fcl_FNAME);
    this.Form.addControl('LNAME', this.fcl_LNAME);

    this.Form.addControl('FATHER', this.fcl_FATHER);
    this.Form.addControl('MOTHER', this.fcl_MOTHER);
    this.Form.addControl('BIRTH_PLACE', this.fcl_BIRTH_PLACE);
    this.Form.addControl('BIRTHDATE', this.fcl_BIRTHDATE);
    this.Form.addControl('KAYD_PLACE', this.fcl_KAYD_PLACE);
    this.Form.addControl('SEX_NAME', this.fcl_SEX_NAME);
    this.Form.addControl('NATIONALITY_ID', this.fcl_NATIONALITY_ID);
    this.Form.addControl('CITY_ID', this.fcl_CITY_ID);
    this.Form.addControl('AREA_ID', this.fcl_AREA_ID);
    this.Form.addControl('MINIAREA_ID', this.fcl_MINIAREA_ID);
    this.Form.addControl('STREETORVILLAGE_ID', this.fcl_STREETORVILLAGE_ID);
    this.Form.addControl('MANUALADDRESS', this.fcl_MANUALADDRESS);
    this.Form.addControl('MARTIALSTATE_NAME', this.fcl_MARTIALSTATE_NAME);
    this.Form.addControl('PHONENUM', this.fcl_PHONENUM);
    this.Form.addControl('ID_NUMBER', this.fcl_ID_NUMBER);
    this.Form.addControl('EDUCATIONLAST_ID', this.fcl_EDUCATIONLAST_ID);
    this.Form.addControl('JOBSTATEFIRST_ID', this.fcl_JOBSTATEFIRST_ID);
    this.Form.addControl('JOBSTATELAST_ID', this.fcl_JOBSTATELAST_ID);
    this.Form.addControl('MALAKSTATE_NAME', this.fcl_MALAKSTATE_NAME);
    this.Form.addControl('INSURANCESALARY', this.fcl_INSURANCESALARY);
    this.Form.addControl('ACCOUNTER_ID', this.fcl_ACCOUNTER_ID);
    this.Form.addControl('ACCOUNTERSERIAL', this.fcl_ACCOUNTERSERIAL);
    this.Form.addControl('REM1', this.fcl_REM1);
    this.Form.addControl('REM2', this.fcl_REM2);
    this.Form.addControl('REM3', this.fcl_REM3);
    this.Form.addControl('QARAR_NUM', this.fcl_QARAR_NUM);
    this.Form.addControl('QARARDATE', this.fcl_QARARDATE);
    this.Form.addControl('EMP_IN_MILITARY_SERVICE', this.fcl_EMP_IN_MILITARY_SERVICE);


  }


  ngOnInit(): void {

    this.filtered_TBLSHAMELMARTIALSTATE = this.fcl_MARTIALSTATE_NAME.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filtered_MARTIALSTATE(name) : this.List_TBLSHAMELMARTIALSTATE.slice())),
    );


    this.filtered_SEX = this.fcl_SEX_NAME.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name && name .length>0 ? this._filtered_SEX(name) : this.List_SEX.slice())),
    );

    this.filtered_AREA = this.fcl_AREA_ID.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filtered_Area(name) : this.List_AREA.slice())),
    );


    this.filtered_STREETORVILLAGE = this.fcl_STREETORVILLAGE_ID.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filtered_STREETORVILLAGE(name) : this.List_STREETORVILLAGE.slice())),
    );


    this.filtered_TBLShamelMiniArea = this.fcl_MINIAREA_ID.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name =>  this._filtered_MiniArea(name)),
    );

    this.filtered_NATIONALITY = this.fcl_NATIONALITY_ID.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filtered_NATIONALITY(name) : this.List_NATIONALITY.slice())),
    );
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
  return this.List_SEX.filter(option =>option != null && option != undefined  && option?.Sex_Name?.includes(filterValue));
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

  if (name == null || name == undefined || name.length ==0)
  {
    if (this.Selected_Employee.Area_ID != null && this.Selected_Employee.Area_ID>0)
  return   this.List_TBLShamelMiniArea.filter(option =>
  option.Area_ID == this.Selected_Employee.Area_ID );

  return   this.List_TBLShamelMiniArea.slice();

  }else{



  console.log(this.Selected_Employee.Area_ID);
  const filterValue = name.toLowerCase();
  if (this.Selected_Employee.Area_ID != null && this.Selected_Employee.Area_ID>0)
  return   this.List_TBLShamelMiniArea.filter(option => option.MiniArea_Name && option.MiniArea_Name.includes(filterValue) &&
  option.Area_ID == this.Selected_Employee.Area_ID );

  return   this.List_TBLShamelMiniArea.filter(option => option.MiniArea_Name && option.MiniArea_Name.includes(filterValue)  );

}

}

private _filtered_NATIONALITY(name: string): TBLShamelNationality[] {
  console.log(this.List_NATIONALITY);
  const filterValue = name.toLowerCase();
  return this.List_NATIONALITY.filter(option => option.Nationality_Name && option.Nationality_Name.includes(filterValue)  );
}





public OnSelect_MARTIALSTATE_Change(event: MatAutocompleteSelectedEvent) {
  if (event  && this.Selected_Employee )
  {
    console.log( event.option.value);
    this.Selected_Employee.MartialState_Name = ((event.option.value as TBLShamelMartialState).MartialState_Name) ;
  }
}





public OnSelect_SEX_Change(event: MatAutocompleteSelectedEvent) {
  if (event  && this.Selected_Employee )
  {
    console.log( event.option.value);
    this.Selected_Employee.Sex_Name = ((event.option.value as TBLShamelSex).Sex_Name) ;
  }
}
public OnSelect_NATIONALITY_Change(event: MatAutocompleteSelectedEvent) {
  if (event  && this.Selected_Employee )
  {
    console.log( event.option.value);
    this.Selected_Employee.Nationality_ID = ((event.option.value as TBLShamelNationality).Nationality_ID) ;
  }
}

public OnSelect_AREA_Change(event: MatAutocompleteSelectedEvent) {
  if (event  && this.Selected_Employee )
  {
    console.log( event.option.value);
    this.Selected_Employee.Area_ID = ((event.option.value as TBLShamelArea).area_id) ;


  }
}

public OnSelect_STREETORVILLAGE_Change(event: MatAutocompleteSelectedEvent) {
  if (event  && this.Selected_Employee )
  {
    console.log( event.option.value);
    this.Selected_Employee.StreetOrVillage_ID = ((event.option.value as TBLShamelStreetOrVillage).StreetOrVillage_ID) ;
  }
}

public OnSelect_MINIAREA_Change(event: MatAutocompleteSelectedEvent) {
  if (event  && this.Selected_Employee )
  {
    console.log( event.option.value);
    this.Selected_Employee.MiniArea_ID = ((event.option.value as TBLShamelMiniArea).MiniArea_ID) ;
  }
}



public Display_MARTIALSTATE_Property(value:TBLShamelMartialState):string  {
  return value && value.MartialState_Name ? value.MartialState_Name : '';
}

public Display_SEX_Property(value:TBLShamelSex):string  {
  return value && value.Sex_Name ? value.Sex_Name : '';
}

public Display_NATIONALITY_Property(value:TBLShamelNationality):string  {
  return value && value.Nationality_Name ? value.Nationality_Name : '';
}

public Display_AREA_Property(value:TBLShamelArea):string  {
  return value && value.area_name ? value.area_name : '';
}

public Display_STREETORVILLAGE_Property(value:TBLShamelStreetOrVillage):string  {
  return value && value.StreetOrVillage_Name ? value.StreetOrVillage_Name : '';
}


public Display_MINIAREA_Property(value:TBLShamelMiniArea):string  {
  return value && value.MiniArea_Name ? value.MiniArea_Name : '';
}




  Save() {


  console.log(this.Form.valid);

  console.log(this.Form.errors);

  console.log(this.Form)

  if (!this.Form.valid)
  return;

  this.FromControl2Object();

  console.log(this.Selected_Employee);
  if (this.Selected_Employee.id != null  &&
    this.Selected_Employee.id >0 &&
    this.pageEmployee. ModeEntry === 'update')

    {
      this.empService.update(this.Selected_Employee).subscribe(
        data=>
        {
          if (data>0)
        {
          this._snackBar.open('تم بنجاح', 'موافق');
          this.Form.reset();
        }

        }
      );
    }else if (this.Selected_Employee.id != null  &&
      this.Selected_Employee.id >0 &&
      this.pageEmployee. ModeEntry === 'add')
    {
      console.log(this.Selected_Employee);
      this.empService.add(this.Selected_Employee).subscribe(
        data=>
        {
          if (data>0)
          {
          this._snackBar.open('تم بنجاح', 'موافق');
          }
        }
      );
    }
  }

  FromControl2Object() {
    this.Selected_Employee.ID_Number=this.fcl_ID_NUMBER.value;


    this.Selected_Employee.id = this.fcl_ID.value;
    this.Selected_Employee.Payrol_ID = this.fcl_PAYROL_ID.value;
    this.Selected_Employee.Computer_ID = this.fcl_COMPUTER_ID.value;
    this.Selected_Employee.Global_ID = this.fcl_GLOBAL_ID.value;
    this.Selected_Employee.Insurance_ID = this.fcl_INSURANCE_ID.value;
    this.Selected_Employee.FName = this.fcl_FNAME.value;
    this.Selected_Employee.LName = this.fcl_LNAME.value;
    this.Selected_Employee.Father = this.fcl_FATHER.value;
    this.Selected_Employee.Mother = this.fcl_MOTHER.value;
    this.Selected_Employee.Birth_Place = this.fcl_BIRTH_PLACE.value;


    this.Selected_Employee.BirthDate = moment(this.fcl_BIRTHDATE.value).format('YYYY/MM/DD');
    this.Selected_Employee.Kayd_Place = this.fcl_KAYD_PLACE.value;

    if (this.fcl_SEX_NAME.value != null && this.fcl_SEX_NAME.value != undefined )
    this.Selected_Employee.Sex_Name = this.fcl_SEX_NAME.value.Sex_Name;


    if (this.fcl_NATIONALITY_ID.value != null && this.fcl_NATIONALITY_ID.value != undefined )
    this.Selected_Employee.Nationality_ID = this.fcl_NATIONALITY_ID.value.Nationality_ID;

    this.Selected_Employee.City_ID = this.fcl_CITY_ID.value;

    if (this.fcl_AREA_ID.value != null && this.fcl_AREA_ID.value != undefined )
      this.Selected_Employee.Area_ID = this.fcl_AREA_ID.value.Area_ID;

      if (this.fcl_MINIAREA_ID.value != null && this.fcl_MINIAREA_ID.value != undefined )
        this.Selected_Employee.MiniArea_ID = this.fcl_MINIAREA_ID.value.MiniArea_ID;

        if (this.fcl_STREETORVILLAGE_ID.value != null && this.fcl_STREETORVILLAGE_ID.value != undefined )
    this.Selected_Employee.StreetOrVillage_ID = this.fcl_STREETORVILLAGE_ID.value.StreetOrVillage_ID;

    this.Selected_Employee.ManualAddress = this.fcl_MANUALADDRESS.value;

    if (this.fcl_MARTIALSTATE_NAME.value != null && this.fcl_MARTIALSTATE_NAME.value != undefined )
    this.Selected_Employee.MartialState_Name = this.fcl_MARTIALSTATE_NAME.value.MartialState_Name;

    this.Selected_Employee.PhoneNum = this.fcl_PHONENUM.value;
    this.Selected_Employee.ID_Number = this.fcl_ID_NUMBER.value;
    this.Selected_Employee.EducationLast_ID = this.fcl_EDUCATIONLAST_ID.value;
    this.Selected_Employee.JobStateFirst_ID = this.fcl_JOBSTATEFIRST_ID.value;


    //this.Selected_Employee.MalakState_Name = this.fcl_MALAKSTATE_NAME.value;
    this.Selected_Employee.MalakState_Name = undefined;


    this.Selected_Employee.InsuranceSalary = this.fcl_INSURANCESALARY.value;
    this.Selected_Employee.Accounter_ID = this.fcl_ACCOUNTER_ID.value;
    this.Selected_Employee.AccounterSerial = this.fcl_ACCOUNTERSERIAL.value;
    this.Selected_Employee.Rem1 = this.fcl_REM1.value;
    this.Selected_Employee.Rem2 = this.fcl_REM2.value;
    this.Selected_Employee.Rem3 = this.fcl_REM3.value;
    this.Selected_Employee.Qarar_Num = this.fcl_QARAR_NUM.value;
    this.Selected_Employee.QararDate = moment(this.fcl_QARARDATE.value).format('YYYY/MM/DD');
    if (this.fcl_EMP_IN_MILITARY_SERVICE.value == true)
this.Selected_Employee.Emp_IN_Military_Service = 1;
else this.Selected_Employee.Emp_IN_Military_Service = 0;
  }

  Object2FromControl() {
    this.fcl_ID.setValue(this.Selected_Employee.id) ;
    this.fcl_PAYROL_ID.setValue(this.Selected_Employee.Payrol_ID);
    this.fcl_COMPUTER_ID.setValue(this.Selected_Employee.Computer_ID);
    this.fcl_GLOBAL_ID.setValue(this.Selected_Employee.Global_ID);
    this.fcl_INSURANCE_ID.setValue(this.Selected_Employee.Insurance_ID);
    this.fcl_FNAME.setValue(this.Selected_Employee.FName);
    this.fcl_LNAME.setValue(this.Selected_Employee.LName);
    this.fcl_FATHER.setValue(this.Selected_Employee.Father);
    this.fcl_MOTHER.setValue(this.Selected_Employee.Mother);
    this.fcl_BIRTH_PLACE.setValue(this.Selected_Employee.Birth_Place);

    this.fcl_BIRTHDATE.setValue( moment(this.Selected_Employee.BirthDate).toDate()  );
    this.fcl_KAYD_PLACE.setValue(this.Selected_Employee.Kayd_Place);
    this.fcl_SEX_NAME.setValue(this.Selected_Employee.Sex_Name);
    this.fcl_NATIONALITY_ID.setValue(this.Selected_Employee.Nationality_ID);
    this.fcl_CITY_ID.setValue(this.Selected_Employee.City_ID);

    this.fcl_AREA_ID.setValue(this.Selected_Employee.Area_ID);
    this.fcl_MINIAREA_ID.setValue(this.Selected_Employee.MiniArea_ID);
    this.fcl_STREETORVILLAGE_ID.setValue(this.Selected_Employee.StreetOrVillage_ID);
    this.fcl_MANUALADDRESS.setValue(this.Selected_Employee.ManualAddress);
    this.fcl_MARTIALSTATE_NAME.setValue(this.Selected_Employee.MartialState_Name);
    this.fcl_PHONENUM.setValue(this.Selected_Employee.PhoneNum);
    this.fcl_ID_NUMBER.setValue(this.Selected_Employee.ID_Number);
    this.fcl_EDUCATIONLAST_ID.setValue(this.Selected_Employee.EducationLast_ID);
    this.fcl_JOBSTATEFIRST_ID.setValue(this.Selected_Employee.JobStateFirst_ID);
    this.fcl_MALAKSTATE_NAME.setValue(this.Selected_Employee.MalakState_Name);
    this.fcl_INSURANCESALARY.setValue(this.Selected_Employee.InsuranceSalary);
    this.fcl_ACCOUNTER_ID.setValue(this.Selected_Employee.Accounter_ID);
    this.fcl_ACCOUNTERSERIAL.setValue(this.Selected_Employee.AccounterSerial);
    this.fcl_REM1.setValue(this.Selected_Employee.Rem1);
    this.fcl_REM2.setValue(this.Selected_Employee.Rem2);
    this.fcl_REM3.setValue(this.Selected_Employee.Rem3);
    this.fcl_QARAR_NUM.setValue(this.Selected_Employee.Qarar_Num);
    this.fcl_QARARDATE.setValue(moment(this.Selected_Employee.QararDate).toDate());

  }


     // Helper Function For Display Validate in Html Template

     public hasError = (form: any, controlName: string, errorName: string): boolean =>{

      return this.formValidatorsService.hasError(form, controlName, errorName);
    }

    public fieldHasErrors(form: any, field: string)
    {
      return this.formValidatorsService.fieldHasErrors(form, field);
    }

    public printFirstErrorMessage(
      form: any,
      controlName: string,
      label: string,
      errors: {name: string, message?: string}[],
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

      return this.formValidatorsService.autoPrintFirstErrorMessage(form, controlName,label, isFemale);

    }


    keytab(event:any){
      console.log('enter press');
      let element = event.srcElement.nextElementSibling; // get the sibling element

      if(element == null)  // check if its null
          return;
      else
          element.focus();   // focus if not null
  }



}
