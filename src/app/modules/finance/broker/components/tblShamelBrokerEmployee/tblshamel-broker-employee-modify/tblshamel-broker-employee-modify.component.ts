import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { forkJoin, map, Observable, of, startWith } from 'rxjs';
import { TBLShamelSex } from 'src/app/modules/shared/models/employees_department/TBLShamelSex';
import { TblShamelBrokerEmployee } from 'src/app/modules/shared/models/finance_department/broker/TblShamelBrokerEmployee';
import { TBLShamelSexService } from 'src/app/modules/shared/services/employees_department/tblshamel-sex.service';
import { TblShamelBrokerEmployeeService } from 'src/app/modules/shared/services/finance_department/broker/tbl-shamel-broker-employee.service';
import { Uniqe } from './validators/validate_formgroup';
import { Validate_ID } from './validators/validate_id';

@Component({
  selector: 'app-tblshamel-broker-employee-modify',
  templateUrl: './tblshamel-broker-employee-modify.component.html',
  styleUrls: ['./tblshamel-broker-employee-modify.component.scss']
})
export class TblshamelBrokerEmployeeModifyComponent implements OnInit {

  selected_broker_employee: TblShamelBrokerEmployee;
  List_SEX_NAME: TBLShamelSex[] = [];
  List_SEX_NAME_Filter: Observable<TBLShamelSex[]> = of([]);
  overtime_employee_Name_List: TblShamelBrokerEmployee[] = [];
  overtime_employee_Name_List_Filter: Observable<TblShamelBrokerEmployee[]> = of([]);
  Form: FormGroup;



  submitted = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { obj: TblShamelBrokerEmployee },
  public tblShamelBrokerEmployeeService: TblShamelBrokerEmployeeService,
  private ShamelSexService: TBLShamelSexService,
  public frmBuild: FormBuilder) {
    this.selected_broker_employee = data.obj;
    this.BuildForm();
    this.LoadData();
   }

   Load_Sex(): Observable<TBLShamelSex[]> {
    if (this.ShamelSexService.List_TBLShamelSex == null ||
      this.ShamelSexService.List_TBLShamelSex == undefined ||
      this.ShamelSexService.List_TBLShamelSex.length == 0)
      return this.ShamelSexService.list();
    return of(this.ShamelSexService.List_TBLShamelSex);
  }

  LoadData() {

    forkJoin(
      [this.Load_Sex()]
    ).subscribe(res => {
      this.List_SEX_NAME = res[0];
      this.List_SEX_NAME_Filter = of(res[0]);


      if (this.Form != null) {




      

        this.List_SEX_NAME_Filter = this.Form.controls['sex_name'].valueChanges
          .pipe(
            startWith(''),
            map(value => value && typeof value === 'string' ? this._Filtered_SEX_NAME(value) : this.List_SEX_NAME.slice())
          );



      }

      this.SetValue();
    },
      (error) => console.log(error));

  }

  private _Filtered_SEX_NAME(value: string): TBLShamelSex[] {
    if (value != null && this.List_SEX_NAME != null && this.List_SEX_NAME.length > 0) {
      const filterValue = value;
      return this.List_SEX_NAME.filter(obj => obj.Sex_Name.includes(filterValue));
    }
    return this.List_SEX_NAME.slice();
  }



  public displaySexNameProperty(value: string): string {
    if (value != null && this.List_SEX_NAME != null) {
      let sexName: any = this.List_SEX_NAME.find(crs => crs.Sex_Name.toString() == value);
      if (sexName!= null )
        return sexName.Sex_Name;
    }
    return '';
  }

  public BuildForm() {
    try {

      this.Form = this.frmBuild.group({
        serail: new FormControl<number | null>(null, [Validators.required], [Validate_ID(this.tblShamelBrokerEmployeeService)]),
        fname: new FormControl<string | null>(null, [Validators.required]),
        lname: new FormControl<string | null>(null, [Validators.required]),
        father: new FormControl<string | null>(null, [Validators.required]),
        mother: new FormControl<string | null>(null, [Validators.required]),
        birthdate: new FormControl<Date | null>(null, [Validators.required]),
        servicedayes: new FormControl<number | null>(null, [Validators.required]),
        sex_name: new FormControl<string | null>(null, [Validators.required]),
        enterusername: new FormControl<string | null>(null, [Validators.required]),
        enterdate: new FormControl<Date | null>(null, [Validators.required]),
        entertime: new FormControl<string | null>(null, [Validators.required]),
        modifyusername: new FormControl<string | null>(null, [Validators.required]),
        modifydate: new FormControl<Date | null>(null, [Validators.required]),
        modifytime: new FormControl<string | null>(null, [Validators.required]),

      }, Uniqe(this.tblShamelBrokerEmployeeService));

    } catch (Exception: any) {
      console.log(Exception);
    }
  }



  public ClearForm() {

    if (this.Form != null)
      this.Form.reset();

  }


  public SetValue() {
    try {


      if (this.selected_broker_employee != null && this.selected_broker_employee.serial != null)
        this.Form.controls['serail'].setValue(this.selected_broker_employee?.serial);

      if (this.selected_broker_employee != null && this.selected_broker_employee.fname != null)
        this.Form.controls['fname'].setValue(this.selected_broker_employee?.fname);

      if (this.selected_broker_employee != null && this.selected_broker_employee.lname != null)
        this.Form.controls['lname'].setValue(this.selected_broker_employee?.lname);

      if (this.selected_broker_employee != null && this.selected_broker_employee.father != null)

        this.Form.controls['father'].setValue(this.selected_broker_employee?.father);

      if (this.selected_broker_employee != null && this.selected_broker_employee.mother != null)
        this.Form.controls['mother'].setValue(this.selected_broker_employee?.mother);

      if (this.selected_broker_employee != null && this.selected_broker_employee.birthdate != null)
        this.Form.controls['birthdate'].setValue(moment(this.selected_broker_employee?.birthdate).toDate());

      if (this.selected_broker_employee != null && this.selected_broker_employee.servicedayes != null)
        this.Form.controls['servicedayes'].setValue(this.selected_broker_employee?.servicedayes);


      if (this.selected_broker_employee != null && this.selected_broker_employee.enterusername != null)
        this.Form.controls['EnterUserName'].setValue(this.selected_broker_employee?.enterusername);


      if (this.selected_broker_employee != null && this.selected_broker_employee.enterdate != null)
        this.Form.controls['enterdate'].setValue(moment(this.selected_broker_employee?.enterdate).toDate());


      if (this.selected_broker_employee != null && this.selected_broker_employee.entertime != null)
        this.Form.controls['entertime'].setValue(this.selected_broker_employee?.entertime);


      if (this.selected_broker_employee != null && this.selected_broker_employee.modifyusername != null)
        this.Form.controls['modifyusername'].setValue(this.selected_broker_employee?.modifyusername);

      if (this.selected_broker_employee.modifydate != null)
        this.Form.controls['modifydate'].setValue(moment(this.selected_broker_employee?.modifydate).toDate());













    } catch (ex: any) {


    }

  }
  ngOnInit(): void {
  }

  public async Save() {



    //Form Not Valid Then return
    if (!this.Form.valid == true) {
      return;
    }


    if (this.selected_broker_employee &&
      this.selected_broker_employee.serial != null &&
      this.selected_broker_employee.serial <= 0) {


      // comment when using real data service
      this.tblShamelBrokerEmployeeService.add(this.selected_broker_employee).subscribe(
        data => {
          if (data > 0) // Succeess 
          {
            this.ClearForm();
          }

        }
      )

    }

    else if (this.selected_broker_employee &&
      this.selected_broker_employee.serial != null &&
      this.selected_broker_employee.serial > 0) {

      // comment when using real data service
      this.tblShamelBrokerEmployeeService.update(this.selected_broker_employee).subscribe(
        data => {
          if (data > 0) // Succeess 
          {
            this.ClearForm();
          }
        }
      )



    }
  }

  onReset() {
    this.Form.reset();
  }

}
