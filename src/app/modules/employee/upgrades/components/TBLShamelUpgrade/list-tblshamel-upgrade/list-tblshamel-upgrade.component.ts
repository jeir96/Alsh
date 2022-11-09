import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';
import {  map, Observable, of, startWith } from 'rxjs';
import { ITBLShamelAccounter } from '../../../../../shared/models/employees_department/TBLShamelAccounter';
import { ITBLShamelClass } from '../../../../../shared/models/employees_department/ITBLShamelClass';
import { ITBLShamelDepartment } from '../../../../../shared/models/employees_department/ITBLShamelDepartment';
import { ITBLShamelJobName } from '../../../../../shared/models/employees_department/ITBLShamelJobName';
import { ITBLShamelRank } from '../../../../../shared/models/employees_department/ITBLShamelRank';
import { ITBLShamelUpgrade } from '../../../../../shared/models/employees_department/ITBLShamelUpgrade';
import { TBLShamelAccounterService } from '../../../../../shared/services/employees_department/tblshamel-accounter.service';
import { TBLShamelUpgradeService } from '../../../../../shared/services/employees_department/tblshamel-upgrade.service';
import { TblshamelclassService } from '../../../../../shared/services/employees_department/tblshamelclass.service';
import { TblshameldepartmentService } from '../../../../../shared/services/employees_department/tblshameldepartment.service';
import { TblshameljobnameService } from '../../../../../shared/services/employees_department/tblshameljobname.service';
import { TblshamelrankService } from '../../../../../shared/services/employees_department/tblshamelrank.service';

@Component({
  selector: 'app-list-tblshamel-upgrade',
  templateUrl: './list-tblshamel-upgrade.component.html',
  styleUrls: ['./list-tblshamel-upgrade.component.scss']
})
export class ListTBLShamelUpgradeComponent implements OnInit {

  Form: UntypedFormGroup ;
  fcl_Year = new UntypedFormControl();
  fcl_Class=new UntypedFormControl();
  fcl_JobName =new UntypedFormControl();
  fcl_Rank =new UntypedFormControl();
  fcl_Accounter = new UntypedFormControl();
  fcl_EmployeeName = new UntypedFormControl();
  fcl_ID_Start = new UntypedFormControl();
  fcl_ID_End = new UntypedFormControl();
  fcl_TypeDisplay= new UntypedFormControl();
  fcl_Department= new UntypedFormControl();
  
  dataSource = new MatTableDataSource<ITBLShamelUpgrade>();


  List_ITBLShamelRank : ITBLShamelRank[] = [];
  filteredITBLShamelRankOptions: Observable<ITBLShamelRank[]>;

  List_ITBLShamelClass : ITBLShamelClass[] = [];
  filteredITBLShamelClassOptions: Observable<ITBLShamelClass[]>;

  List_ITBLShamelJobName : ITBLShamelJobName[] = [];
  filteredITBLShamelJobNameOptions: Observable<ITBLShamelJobName[]>;
  
  List_Department: ITBLShamelDepartment[] = [];
  filteredDepartmentOptions: Observable<ITBLShamelDepartment[]>;


  List_TBLShamelAccounter: ITBLShamelAccounter[] = [];
  filteredAccounterOptions: Observable<ITBLShamelAccounter[]>;


  displayedColumns: string[] = [
    'Year_ID', 'ID', 'Computer_ID',
    'Global_ID', 'FName', 'LName',
    'Father','Mother',  'Class_ID',
    'JobName_ID', 'SalaryBefore','QualityGrade','GradePercent','SalaryAfter',
    'Qarar_Num','Qarar_Date','action' ];

  constructor( private fb: UntypedFormBuilder,
    public departmentService: TblshameldepartmentService,
    public jobNameService: TblshameljobnameService,
    public ShamelAccounterService :TBLShamelAccounterService,    
    public classService: TblshamelclassService,
    public shamelrankService: TblshamelrankService,
    public ShamelUpgradeService: TBLShamelUpgradeService, 
  
     ) { 
      this.Form = this.fb.group({});
      this.Form.addControl('Year',this.fcl_Year);
      this.Form.addControl('Class',this.fcl_Class);
      this.Form.addControl('Rank',this.fcl_Rank);
      this.Form.addControl('TypeDisplay',this.fcl_TypeDisplay);
      this.Form.addControl('JobName',this.fcl_JobName);
      this.Form.addControl('EmployeeName',this.fcl_EmployeeName);
      this.Form.addControl('ID_Start',this.fcl_ID_Start);
      this.Form.addControl('ID_End',this.fcl_ID_End);

      if (this.shamelrankService.list_ITBLShamelRank == null ||
        this.shamelrankService.list_ITBLShamelRank == undefined ||
        this.shamelrankService.list_ITBLShamelRank.length == 0)
        this.shamelrankService.fill();
      this.shamelrankService.List_ITBLShamelRank_BehaviorSubject.subscribe(
        data => {
          this.List_ITBLShamelRank = data;
          this.filteredITBLShamelRankOptions = of(this.List_ITBLShamelRank );
        }
      )
   
   
   
   
   
   
      if (this.departmentService.List_ITBLShamelDepartment == null ||
        this.departmentService.List_ITBLShamelDepartment == undefined ||
        this.departmentService.List_ITBLShamelDepartment.length == 0)
        this.departmentService.fill();
      this.departmentService.List_ITBLShamelDepartment_BehaviorSubject.subscribe(
        data => {
          this.List_Department = data;
          this.filteredDepartmentOptions = of(this.List_Department);
        }
      )
   
   
      if (this.jobNameService.list_ITBLShamelJobName == null ||
        this.jobNameService.list_ITBLShamelJobName == undefined ||
        this.jobNameService.list_ITBLShamelJobName.length == 0)
        this.jobNameService.fill();
      this.jobNameService.List_ITBLShamelJobName_BehaviorSubject.subscribe(
        data => {
          this.List_ITBLShamelJobName = data;
          this.filteredITBLShamelJobNameOptions = of(this.List_ITBLShamelJobName);
        }
      )


      if (this.ShamelAccounterService.List_TBLShamelAccounter == null ||
        this.ShamelAccounterService.List_TBLShamelAccounter == undefined ||
        this.ShamelAccounterService.List_TBLShamelAccounter.length == 0)
        this.ShamelAccounterService.fill();
      this.ShamelAccounterService.List_TBLShamelAccounter_BehaviorSubject.subscribe(
        data => {
          this.List_TBLShamelAccounter = data;
          this.filteredAccounterOptions = of(this.List_TBLShamelAccounter);
        }
      )

   
      this.FillArrayUsingService();    
   }

  


















 ngOnInit(): void {



 }



 public async FillArrayUsingService() {
   try {

     this.filteredITBLShamelRankOptions = this.fcl_Rank.valueChanges
       .pipe(
         startWith(''),
         map(value => value && typeof value === 'string' ? this._filteredRank(value) : this.List_ITBLShamelRank.slice())
       );
   } catch (ex: any) {
     console.log(ex);

   }

   try {

     this.filteredDepartmentOptions = this.fcl_Department.valueChanges
       .pipe(
         startWith(''),
         map(value => value && typeof value === 'string' ? this._filteredDepartment(value) : this.List_Department.slice())
       );

   } catch (ex: any) {
     console.log(ex);

   }

   try {

    this.filteredAccounterOptions = this.fcl_Accounter.valueChanges
      .pipe(
        startWith(''),
        map(value => value && typeof value === 'string' ? this._filteredAccounter(value) : this.List_TBLShamelAccounter.slice())
      );
  } catch (ex: any) {
    console.log(ex);

  }



   try {

     this.filteredITBLShamelClassOptions = this.fcl_Class.valueChanges
       .pipe(
         startWith(''),
         map(value => value && typeof value === 'string' ? this._filteredClass(value) : this.List_ITBLShamelClass.slice())
       );

   } catch (ex: any) {
     console.log(ex);

   }

  

   

   try {

     this.filteredITBLShamelJobNameOptions = this.fcl_JobName.valueChanges
       .pipe(
         startWith(''),
         map(value => value && typeof value === 'string' ? this._filteredJobName(value) : this.List_ITBLShamelJobName.slice())
       );
   } catch (ex: any) {
     console.log(ex);

   }



 }


 private _filteredAccounter(value: string): ITBLShamelAccounter[] {
  if (value != null) {
    const filterValue = value;
    return this.List_TBLShamelAccounter.filter(obj => obj.accounter_name != null &&  obj.accounter_name.includes(filterValue));
  }
  return this.List_TBLShamelAccounter.slice();
}
 
 private _filteredRank(value: string): ITBLShamelRank[] {
   if (value != null) {
     const filterValue = value;
     return this.List_ITBLShamelRank.filter(obj => obj.rank_name.includes(filterValue));
   }
   return this.List_ITBLShamelRank.slice();
 }


 private _filteredDepartment(value: string): ITBLShamelDepartment[] {
   if (value != null) {
     const filterValue = value;
     return this.List_Department.filter(obj => obj.department_name.includes(filterValue));
   }
   return this.List_Department.slice();
 }

 private _filteredJobName(value: string): ITBLShamelJobName[] {
   if (value != null) {
     const filterValue = value;
     return this.List_ITBLShamelJobName.filter(obj => obj.jobname_name.includes(filterValue));

   }
   return this.List_ITBLShamelJobName.slice();
 }

 

 private _filteredClass(value: string): ITBLShamelClass[] {
   if (value != null) {
     const filterValue = value;
     return this.List_ITBLShamelClass.filter(obj => obj.class_name.includes(filterValue));
   }
   return this.List_ITBLShamelClass.slice();
 }

 //#endregion








 //#region  Display Display Member
 public displayRankProperty(value: string): string {
   if (value != null  && this.List_ITBLShamelRank != null ) {
     let cer: any = this.List_ITBLShamelRank.find(cer => cer.rank_id.toString() == value);
     if (cer)
       return cer.rank_name;
   }
   return '';
 }


 public displayClassProperty(value: string): string {
   if (value && this.List_ITBLShamelClass) {
     let object: any = this.List_ITBLShamelClass.find(obj => obj.class_id.toString() == value);
     if (object)
       return object.class_name;
   }
   return '';
 }


 public displayJobNameProperty(value: string): string {
   if (value && this.List_ITBLShamelJobName) {
     let object: any = this.List_ITBLShamelJobName.find(obj => obj.jobname_id.toString() == value);
     if (object)
       return object.jobname_name;
   }
   return '';
 }





 public displayDeparmentProperty(value: string): string {
   if (value && this.List_Department) {
     let object: any = this.List_Department.find(obj => obj.department_id.toString() == value);
     if (object)
       return object.department_name;
   }
   return '';
 }

 public displayAccounterProperty(value: string): string {
  if (value && this.List_TBLShamelAccounter) {
    let object: any = this.List_TBLShamelAccounter.find(obj => obj.accounter_id != null && obj.accounter_id.toString() == value);
    if (object)
      return object.ACCOUNTER_NAME;
  }
  return '';
}
 
}
