import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { EmployeeServiceService } from 'src/app/modules/shared/services/employees_department/employee-service.service';
import { IGlobalEmployeeList } from 'src/app/modules/shared/services/employees_department/IGlobalEmployeeList';

@Component({
  selector: 'app-employeeaffairs-manage',
  templateUrl: './employeeaffairs-manage.component.html',
  styleUrls: ['./employeeaffairs-manage.component.scss']
})
export class EmployeeaffairsManageComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  public SelectedEmp: BehaviorSubject<TBLShamelEmployee> = new BehaviorSubject({});
  currentChildComponent: BehaviorSubject<string> = new BehaviorSubject('');
  Window: String = '';

  constructor(public activatedRoute: ActivatedRoute,   
    public restApi: EmployeeServiceService, 
    public GlobalEmployeeList: IGlobalEmployeeList) {

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










