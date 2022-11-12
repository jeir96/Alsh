import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { EmployeeServiceService } from 'src/app/modules/shared/services/employees_department/employee-service.service';
import { IGlobalEmployeeList } from 'src/app/modules/shared/services/employees_department/IGlobalEmployeeList';
import { DeleteemployeeComponent } from './deleteemployee/deleteemployee/deleteemployee.component';
import { EmployeechangeidComponent } from './employeechangeid/employeechangeid/employeechangeid.component';
import { EmpShowDataComponent } from './tblshamelemployee/emp-show-data/emp-show-data.component';
import { TblshamelincmarsoomlistComponent } from './tblshamelincmarsoom/tblshamelincmarsoomlist/tblshamelincmarsoomlist.component';
import { TblshamelscbonuslistComponent } from './tblshamelscbonus/tblshamelscbonuslist/tblshamelscbonuslist.component';
import { TblshamelsccourselistComponent } from './tblshamelsccourse/tblshamelsccourselist/tblshamelsccourselist.component';
import { TblshamelsceducationlistComponent } from './tblshamelsceducation/tblshamelsceducationlist/tblshamelsceducationlist.component';

import { TblshamelscjobstatelistComponent } from './tblshamelscjobstate/tblshamelscjobstatelist/tblshamelscjobstatelist.component';
import { TblshamelscpunishmentlistComponent } from './tblshamelscpunishment/tblshamelscpunishmentlist/tblshamelscpunishmentlist.component';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss']
})
export class EmployeeManagementComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  public SelectedEmp: BehaviorSubject<TBLShamelEmployee> = new BehaviorSubject({});
  currentChildComponent: BehaviorSubject<string> = new BehaviorSubject('');
  Window: String = '';

  constructor(public activatedRoute: ActivatedRoute,

    private fb: UntypedFormBuilder,
    public restApi: EmployeeServiceService, public GlobalEmployeeList: IGlobalEmployeeList) {

    this.currentChildComponent.subscribe(
      data => { this.Window = data; }
    )


    try {
      this.activatedRoute.params.subscribe(params => {
        this.currentChildComponent.next(params['id']);
        console.log(params['id']);
        console.log('route');

      });


    } catch (Exception: any) { }
  }


  ngAfterViewInit(): void {



  }


  FindEmployeeFromBar(employee: TBLShamelEmployee) {
    this.SelectedEmp.next(employee);
  }

  ngAfterContentInit() {

  }






  ngOnInit() {



    this.ngAfterContentInit();

  }






  ngOnDestroy() {

  }







  ngOnChanges(changes: SimpleChanges) {

  }

}










