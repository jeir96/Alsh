import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ITBLShamelAccounter } from '../../../shared/models/employees_department/TBLShamelAccounter';
import { ITBLShamelChangeReason } from '../../../shared/models/employees_department/ITBLShamelChangeReason';
import { ITBLShamelClass } from '../../../shared/models/employees_department/ITBLShamelClass';
import { ITBLShamelDepartment } from '../../../shared/models/employees_department/ITBLShamelDepartment';
import { ITBLShamelDocumentType } from '../../../shared/models/employees_department/ITBLShamelDocumentType';
import { ITBLShamelJobKind } from '../../../shared/models/employees_department/ITBLShamelJobKind';
import { ITBLShamelJobName } from '../../../shared/models/employees_department/ITBLShamelJobName';
import { TBLShamelAccounterService } from '../../../shared/services/employees_department/tblshamel-accounter.service';
import { TblshamelchangereasonService } from '../../../shared/services/employees_department/tblshamelchangereason.service';
import { TblshamelclassService } from '../../../shared/services/employees_department/tblshamelclass.service';
import { TblshameldepartmentService } from '../../../shared/services/employees_department/tblshameldepartment.service';
import { TblshameljobkindService } from '../../../shared/services/employees_department/tblshameljobkind.service';
import { TblshameljobnameService } from '../../../shared/services/employees_department/tblshameljobname.service';

import { map, startWith } from 'rxjs/operators';
import { TBLShamelEmployee } from '../../../shared/models/employees_department/TBLShamelEmployee';
import { MatTableDataSource } from '@angular/material/table';
import { TblshamelmalakstateService } from '../../../shared/services/employees_department/tblshamelmalakstate.service';
import { ITBLShamelMalakState } from '../../../shared/models/employees_department/ITBLShamelMalakState';
import { EmployeeStatsService } from '../../../shared/services/employees_department/employee-stats.service';

@Component({
  selector: 'app-stats1',
  templateUrl: './stats1.component.html',
  styleUrls: ['./stats1.component.scss']
})
export class Stats1Component implements OnInit {

  Form: FormGroup;
  fcl_ID: FormControl=new FormControl();;
  fcl_PAYROL_ID: FormControl=new FormControl();;
  fcl_COMPUTER_ID: FormControl=new FormControl();;
  fcl_GLOBAL_ID: FormControl=new FormControl();;
  fcl_INSURANCE_ID: FormControl=new FormControl();;
  fcl_FNAME: FormControl=new FormControl();;
  fcl_LNAME: FormControl=new FormControl();;

  fcl_FATHER: FormControl=new FormControl();;
  fcl_MOTHER: FormControl=new FormControl();;



  fcl_ID_NUMBER: FormControl=new FormControl();;

  fcl_MALAKSTATE_NAME: FormControl=new FormControl();;

  fcl_INSURANCESALARY: FormControl=new FormControl();;

  fcl_ACCOUNTER_ID: FormControl=new FormControl();;
  fcl_ACCOUNTERSERIAL: FormControl=new FormControl();;

  fcl_AccounterSerail_To: FormControl=new FormControl();;
  fcl_AccounterSerail_From : FormControl=new FormControl();;

  fcl_EMP_IN_MILITARY_SERVICE: FormControl=new FormControl();;
  fcl_changereason: FormControl=new FormControl();;
  fcl_JobName: FormControl=new FormControl();;
  fcl_Class: FormControl=new FormControl();;
  fcl_JobKind: FormControl=new FormControl();;
  fcl_MalakState: FormControl=new FormControl();;
  fcl_Salary: FormControl=new FormControl();;
  fcl_department: FormControl=new FormControl();

  TBLShamelMalakState_List : ITBLShamelMalakState[]=[];
  filteredMalakStateOptions: Observable< ITBLShamelMalakState[]>;
  
  Accounter_List: ITBLShamelAccounter[] = [];
  filteredAccounterOptions: Observable<ITBLShamelAccounter[]>;


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

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'FullName', 'PAYROL_ID', 'COMPUTER_ID',
    'GLOBAL_ID', 'INSURANCE_ID'
    /*
    ,
     'FNAME',
    'LNAME','FATHER',  'MOTHER',
    'BIRTH_PLACE', 'BIRTHDATE'
  */
  ];


  constructor(
  
    public departmentService: TblshameldepartmentService,
    public jobNameService: TblshameljobnameService,
    public jobKindService: TblshameljobkindService,
    public classService: TblshamelclassService,
    public changereasonService: TblshamelchangereasonService,
    public ShamelAccounterService :TBLShamelAccounterService,
    public ShamelmalakstateService :TblshamelmalakstateService,
    public EmployeeStatsService :EmployeeStatsService,
    private fb: UntypedFormBuilder,
    private ngZone: NgZone,) {

      this.dataSource = new MatTableDataSource<any>([]);

      


      if (this.ShamelmalakstateService.list_ITBLShamelMalakState== null ||
        this.ShamelmalakstateService.list_ITBLShamelMalakState == undefined ||
        this.ShamelmalakstateService.list_ITBLShamelMalakState.length == 0)
        this.ShamelmalakstateService.fill();
      this.ShamelmalakstateService.List_ITBLShamelMalakState_BehaviorSubject.subscribe(
        data => {
          this.TBLShamelMalakState_List = data;
          this.filteredMalakStateOptions = of(this.TBLShamelMalakState_List);
        }
      )

      if (this.ShamelAccounterService.List_TBLShamelAccounter== null ||
        this.ShamelAccounterService.List_TBLShamelAccounter == undefined ||
        this.ShamelAccounterService.List_TBLShamelAccounter.length == 0)
        this.ShamelAccounterService.fill();
      this.ShamelAccounterService.List_TBLShamelAccounter_BehaviorSubject.subscribe(
        data => {
          this.Accounter_List = data;
          this.filteredAccounterOptions = of(this.Accounter_List);
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

    this.Form = new FormGroup({});
    this.fcl_ID = new FormControl<number|undefined>(undefined);
    this.fcl_COMPUTER_ID = new FormControl<number|undefined>(undefined);
    this.fcl_INSURANCE_ID = new FormControl<number|undefined>(undefined);
    this.fcl_PAYROL_ID =  new FormControl<number|undefined>(undefined);
    this.fcl_ID_NUMBER =  new FormControl<number|undefined>(undefined);
    this.fcl_ACCOUNTER_ID=  new FormControl<number|undefined>(undefined);
    this.fcl_FNAME =  new FormControl<string|undefined>(undefined);
    this.fcl_LNAME =  new FormControl<string|undefined>(undefined);
    this.fcl_FATHER =  new FormControl<string|undefined>(undefined);
    this.fcl_MOTHER =  new FormControl<string|undefined>(undefined);
    this.fcl_MalakState =  new FormControl<string|undefined>(undefined);
    this.fcl_AccounterSerail_From =  new FormControl<number|undefined>(undefined);
    this.fcl_AccounterSerail_To =  new FormControl<number|undefined>(undefined);
    this.fcl_EMP_IN_MILITARY_SERVICE =  new FormControl<boolean|undefined>(undefined);
    
    this.fcl_Class =  new FormControl<number|undefined>(undefined);
    this.fcl_JobKind =  new FormControl<number|undefined>(undefined);
    this.fcl_JobName =  new FormControl<number|undefined>(undefined);
    this.fcl_department =  new FormControl<number|undefined>(undefined);
    this.fcl_changereason =  new FormControl<number|undefined>(undefined);

   

    this.Form.addControl('ID',this.fcl_ID);
    this.Form.addControl('COMPUTER_ID',this.fcl_COMPUTER_ID);
    this.Form.addControl('INSURANCE_ID',this.fcl_INSURANCE_ID);
    this.Form.addControl('PAYROL_ID',this.fcl_PAYROL_ID);
    this.Form.addControl('GLOBAL_ID',this.fcl_GLOBAL_ID);
    this.Form.addControl('ID_NUMBER',this.fcl_ID_NUMBER);
    this.Form.addControl('ACCOUNTER_ID',this.fcl_ACCOUNTER_ID);
    this.Form.addControl('FNAME',this.fcl_FNAME);
    this.Form.addControl('LNAME',this.fcl_LNAME);
    this.Form.addControl('FATHER',this.fcl_FATHER);
    this.Form.addControl('MOTHER',this.fcl_MOTHER);

    this.Form.addControl('MalakState',this.fcl_MalakState);
    this.Form.addControl('EMP_IN_MILITARY_SERVICE',this.fcl_EMP_IN_MILITARY_SERVICE);
    this.Form.addControl('AccounterSerail_From',this.fcl_AccounterSerail_From);
    this.Form.addControl('AccounterSerail_To',this.fcl_AccounterSerail_To);



    this.Form.addControl('Class',this.fcl_Class);
    this.Form.addControl('JobKind',this.fcl_JobKind);
    this.Form.addControl('JobName',this.fcl_JobName);
    this.Form.addControl('department',this.fcl_department);
    this.Form.addControl('changereason',this.fcl_changereason);





  }

  ngOnInit(): void {
  }

  public async FillArrayUsingService() {


    try {

      this.filteredMalakStateOptions = this.fcl_MalakState.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredMalakState(value) : this.TBLShamelMalakState_List.slice())
        );

    } catch (ex: any) {
      console.log(ex);

    }

    try {

      this.filteredDepartmentOptions = this.fcl_department.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredDepartment(value) : this.Department_List.slice())
        );

    } catch (ex: any) {
      console.log(ex);

    }


    try {

      this.filteredChangeReasonOptions = this.fcl_changereason.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredChangeReason(value) : this.ChangeReason_List.slice())
        );

    } catch (ex: any) {
      console.log(ex);

    }


    try {

      this.filteredClassOptions = this.fcl_Class.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredClass(value) : this.Class_List.slice())
        );

    } catch (ex: any) {
      console.log(ex);

    }


    try {

      this.filteredJobKindOptions = this.fcl_JobKind.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredJobKind(value) : this.JobKind_List.slice())
        );
    } catch (ex: any) {
      console.log(ex);

    }

    try {

      this.filteredJobNameOptions = this.fcl_JobName.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredJobName(value) : this.JobName_List.slice())
        );
    } catch (ex: any) {
      console.log(ex);

    }

    try {

      this.filteredAccounterOptions = this.fcl_ACCOUNTER_ID.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredAccounter(value) : this.Accounter_List.slice())
        );
    } catch (ex: any) {
      console.log(ex);

    }

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

  private _filteredAccounter(value: string): ITBLShamelAccounter[] {
    if (value != null) {
      const filterValue = value;
      return this.Accounter_List.filter(obj => obj.accounter_name != null &&  obj.accounter_name.includes(filterValue));
    }
    return this.Accounter_List.slice();
  }

  

  private _filteredMalakState(value: string): ITBLShamelMalakState[] {
    if (value != null) {
      const filterValue = value;
      return this.TBLShamelMalakState_List.filter(obj => obj.malakstate_name.includes(filterValue));
    }
    return this.TBLShamelMalakState_List.slice();
  }

  private _filteredClass(value: string): ITBLShamelClass[] {
    if (value != null) {
      const filterValue = value;
      return this.Class_List.filter(obj => obj.class_name.includes(filterValue));
    }
    return this.Class_List.slice();
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
  
  public displayAccounterProperty(value: string): string {
    if (value!= null  && this.Accounter_List != null ) {
      let object: any = this.Accounter_List.find(obj => obj?.accounter_id != null && obj?.accounter_id.toString() == value);
      if (object!= null )
        return object.ACCOUNTER_NAMNE;
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


  public displayMalakStateProperty(value: string): string {
    if (value!= null && this.TBLShamelMalakState_List!= null) {
      let object: any = this.TBLShamelMalakState_List.find(obj => obj.malakstate_id.toString() == value);
      if (object!= null)
        return object.malakstate_name;
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




  public displayDeparmentProperty(value: string): string {
    if (value && this.Department_List) {
      let object: any = this.Department_List.find(obj => obj.department_id.toString() == value);
      if (object)
        return object.department_name;
    }
    return '';
  }

  //#endregion

  ExcuteSearch ()
  {
    let SearchRequest =
    {
      'ID': (this.fcl_ID.value!= null?this.fcl_ID.value:null ),
      'COMPUTER_ID': (this.fcl_ID.value!= null?this.fcl_COMPUTER_ID.value:null ),
      'PAYROL_ID': (this.fcl_ID.value!= null?this.fcl_PAYROL_ID.value:null ),
      'INSURANCE_ID': (this.fcl_ID.value!= null?this.fcl_INSURANCE_ID.value:null ),
      'GLOBAL_ID': (this.fcl_ID.value!= null?this.fcl_GLOBAL_ID.value:null ),
      'ID_NUMBER': (this.fcl_ID.value!= null?this.fcl_ID_NUMBER.value:null ),
      'FNAME': (this.fcl_ID.value!= null?this.fcl_FNAME.value:null ),
      'LNAME': (this.fcl_ID.value!= null?this.fcl_LNAME.value:null ),
      'FATHER': (this.fcl_ID.value!= null?this.fcl_FATHER.value:null ),
      'MOTHER': (this.fcl_ID.value!= null?this.fcl_MOTHER.value:null ),
      'MalakState': (this.fcl_ID.value!= null?this.fcl_MalakState.value:null ),
      'ACCOUNTER_ID': (this.fcl_ID.value!= null?this.fcl_ACCOUNTER_ID.value:null ),
      'EMP_IN_MILITARY_SERVICE': (this.fcl_ID.value!= null?this.fcl_EMP_IN_MILITARY_SERVICE.value:null ),
      'changereason': (this.fcl_ID.value!= null?this.fcl_changereason.value:null ),
      'department': (this.fcl_ID.value!= null?this.fcl_department.value:null ),
      'Class': (this.fcl_ID.value!= null?this.fcl_Class.value:null ),
      'JobKind': (this.fcl_ID.value!= null?this.fcl_JobKind.value:null ),
      'JobName': (this.fcl_ID.value!= null?this.fcl_JobName.value:null ),
      'INSURANCESALARY': (this.fcl_ID.value!= null?this.fcl_INSURANCESALARY.value:null ),            

      'AccounterSerail_From': (this.fcl_ID.value!= null?this.fcl_AccounterSerail_From.value:null ),            
      'AccounterSerail_To': (this.fcl_ID.value!= null?this.fcl_AccounterSerail_To.value:null ),            


       



    }
    this.EmployeeStatsService.Stats1(SearchRequest).subscribe
    (
      data=>
      {
        if (data!= null )
          this.dataSource.data = (data as any[]);
        else 
          this.dataSource.data = [];
      }
    )
  }
}
