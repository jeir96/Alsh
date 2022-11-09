import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ITBLShamelChangeReason } from 'src/app/modules/shared/models/employees_department/ITBLShamelChangeReason';
import { ITBLShamelMalakState } from 'src/app/modules/shared/models/employees_department/ITBLShamelMalakState';
import { Stats4 } from 'src/app/modules/shared/models/employees_department/Stats4';
import { TBLShamelSuddenHoliday } from 'src/app/modules/shared/models/employees_department/TBLShamelSuddenHoliday';
import { EmployeeStatsService } from 'src/app/modules/shared/services/employees_department/employee-stats.service';
import { TBLShamelSuddenHolidayService } from 'src/app/modules/shared/services/employees_department/tblshamel-sudden-holiday.service';
import { TblshamelchangereasonService } from 'src/app/modules/shared/services/employees_department/tblshamelchangereason.service';
import { TblshamelmalakstateService } from 'src/app/modules/shared/services/employees_department/tblshamelmalakstate.service';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-stats-between-date',
  templateUrl: './stats-between-date.component.html',
  styleUrls: ['./stats-between-date.component.scss']
})
export class StatsBetweenDateComponent implements OnInit {

  // request for post api
  request :Stats4 = {};

  // form controls
  Form = new UntypedFormGroup({
    fcl_MalakeState: new UntypedFormControl(''),
    fcl_SuddenHoliday: new UntypedFormControl(''),
    fcl_ChangeReason: new UntypedFormControl(''),

    fcl_MalakState: new UntypedFormControl(''),
    fcl_FirstDate: new UntypedFormControl(''),
    fcl_EndDate: new UntypedFormControl(''),

  });

  // boolean variables for disable sudden holidays select and change reason select
  disable1 = false;
  disable2 = false;

  //enable sudden holiday select and disable change reason select
  enableSuddenHoliday(){
    this.Form.get('fcl_SuddenHoliday').enable();
    this.Form.get('fcl_ChangeReason').disable();
  }

  //enable change reason select and disable sudden holiday select
  enableChangeReason(){
    this.Form.get('fcl_ChangeReason').enable(); 
    this.Form.get('fcl_SuddenHoliday').disable(); 

  }

  //disable change reason select and sudden holiday select
  desableAllSelects(){
    this.Form.get('fcl_SuddenHoliday').disable(); 
    this.Form.get('fcl_ChangeReason').disable();

  }

  // add birthdate to the request
  birthdateChecked(){
    this.desableAllSelects();
    this.request= {is_birthdate: true};
  }

  // add first job to the request
  firstJobDateChecked(){
    this.desableAllSelects();
    this.request= {is_FirstJobState: true};
  }

  // add punishment to the request
  punishmentsChecked(){
    this.desableAllSelects();
    this.request= {is_TBLShamelSCPunishment: true};
  }

  // add bonus to the request
  bonusChecked(){
    this.desableAllSelects();
    this.request= {is_TBLShamelSCBonus: true};
  }

  // add free holiday to the request
  freeHolidayChecked(){
    this.desableAllSelects();
    this.request= {is_TBLShamelSCFreeHoliday: true};
  }

  // add legal holiday to the request
  legalHolidayChecked(){
    this.desableAllSelects();
    this.request= {is_TBLShamelSCLegalHoliday: true};
  }

  // add health holiday to the request
  healthHolidayChecked(){
    this.desableAllSelects();
    this.request= {is_TBLShamelSCHealthHoliday: true};
  }

  // add sudden holiday to the request
  suddenHolidayChecked(){
    this.enableSuddenHoliday();
    
  }

  suddenHolidayChanged(){
    let id: number =-1;
    for (let i= 0; i< this.List_TBLSHAMELSUDDENHOLIDAY.length; i++)
      if (this.Form.get('fcl_SuddenHoliday').value == this.List_TBLSHAMELSUDDENHOLIDAY[i].suddenholiday_name)
        id= this.List_TBLSHAMELSUDDENHOLIDAY[i].suddenholiday_id;
    if (id != -1)
      this.request= {is_TBLShamelSCSuddenHoliday: true, suddenholidaY_ID: id };
  }

  // add change reason to the request
  changeReasonChecked(){
    this.enableChangeReason();
  }

  changeReasonChanged(){
    let id: number =-1;
    for (let i= 0; i< this.List_TBLShamelChangeReason.length; i++)
      if (this.Form.get('fcl_ChangeReason').value == this.List_TBLShamelChangeReason[i].changereason_name)
        id= this.List_TBLShamelChangeReason[i].countservice_id;
    if (id != -1)
      this.request= {is_TBLShamelSCJobState: true, changereason_id: id};
  }



  // Filtering
  options1: string[]= [];
  filteredOptions1: Observable<string[]>;

  options2: string[]= [];
  filteredOptions2: Observable<string[]>;

  options3: string[]= [];
  filteredOptions3: Observable<string[]>;
  

  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options1.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options2.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filter3(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options3.filter(option => option.toLowerCase().includes(filterValue));
  }

  List_TBLShamelMalakState : ITBLShamelMalakState[]=[];
  List_TBLSHAMELSUDDENHOLIDAY : TBLShamelSuddenHoliday[] =[];
  List_TBLShamelChangeReason : ITBLShamelChangeReason[];

  dataSource = new MatTableDataSource<Stats4>();
  displayedColumns: string[] = [
    'file_number', 'computer_number', 'first_name',
    'last_name', 'father', 'mother',
    'category','job_adjective',  'bitrh_date',
    'commencement_date', 'malak_state', 'last_job_state',
    'document_number', 'document_date', 'document_type'];

  

  constructor(private service: EmployeeStatsService,
    private tblshamelmalakstateService:TblshamelmalakstateService,
    private tBLShamelSuddenHolidayService:TBLShamelSuddenHolidayService,
    private tblshamelchangereasonService:TblshamelchangereasonService) {


      this.Form.addControl('',this.Form.get('fcl_MalakeState'));
      this.Form.addControl('',this.Form.get('fcl_SuddenHoliday'));
      this.Form.addControl('',this.Form.get('fcl_ChangeReason'));
      this.Form.addControl('',this.Form.get('fcl_MalakState'));
      this.Form.addControl('',this.Form.get('fcl_FirstDate'));
      this.Form.addControl('',this.Form.get('fcl_EndDate'));


      if (this.tblshamelmalakstateService.list_ITBLShamelMalakState == null ||
        this.tblshamelmalakstateService.list_ITBLShamelMalakState.length ==0 )
        this.tblshamelmalakstateService.fill();

this.tblshamelmalakstateService.List_ITBLShamelMalakState_BehaviorSubject.subscribe(
  data=>
  {
    this.List_TBLShamelMalakState = data;

    for(let i =0; i< this.List_TBLShamelMalakState.length; i++)
      this.options1.push(this.List_TBLShamelMalakState[i].malakstate_name);
    this.filteredOptions1 = this.Form.get('fcl_MalakeState').valueChanges.pipe(
      startWith(''),
      map(value => this._filter1(value || '')),
    );
  }
);

if (this.tBLShamelSuddenHolidayService.List_TBLShamelSuddenHolidayService == null ||
  this.tBLShamelSuddenHolidayService.List_TBLShamelSuddenHolidayService.length ==0 )
  this.tBLShamelSuddenHolidayService.fill();

this.tBLShamelSuddenHolidayService.List_TBLShamelSuddenHolidayService_BehaviorSubject.subscribe(
data=>
{
this.List_TBLSHAMELSUDDENHOLIDAY = data;

for(let i =0; i< this.List_TBLSHAMELSUDDENHOLIDAY.length; i++)
      this.options2.push(this.List_TBLSHAMELSUDDENHOLIDAY[i].suddenholiday_name);
    this.filteredOptions2 = this.Form.get('fcl_SuddenHoliday').valueChanges.pipe(
      startWith(''),
      map(value => this._filter2(value || '')),
    );
}
);



if (this.tblshamelchangereasonService.List_ITBLShamelChangeReason == null ||
  this.tblshamelchangereasonService.List_ITBLShamelChangeReason.length ==0 )
  this.tblshamelchangereasonService.fill();

this.tblshamelchangereasonService.List_ITBLShamelChangeReason_BehaviorSubject.subscribe(
data=>
{
this.List_TBLShamelChangeReason = data;

for(let i =0; i< this.List_TBLShamelChangeReason.length; i++)
      this.options3.push(this.List_TBLShamelChangeReason[i].changereason_name);
    this.filteredOptions3 = this.Form.get('fcl_ChangeReason').valueChanges.pipe(
      startWith(''),
      map(value => this._filter3(value || '')),
    );
}
);





   }

   ngOnInit(): void {

    // disable both select at start
    this.Form.get('fcl_SuddenHoliday').disable(); 
    this.Form.get('fcl_ChangeReason').disable(); 
    
    
  }

  Search()
  {

    this.request= {...this.request, malakState_Name: this.Form.get('fcl_MalakState').value, first_Date: this.Form.get('fcl_FirstDate').value, end_Date: this.Form.get('fcl_EndDate').value};

    this.service.Stats4(this.request).subscribe(
      res=>{
        this.dataSource= res as any;
        console.log('res', res);
        console.log('req', this.request);
      }
    );
    
  }




  
}
