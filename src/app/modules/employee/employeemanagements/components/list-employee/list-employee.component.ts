import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';
import { IEmployeeNameList } from 'src/app/modules/shared/models/employees_department/IEmployeeNameList';
import { ViewTBLShamelEmployeeService } from 'src/app/modules/shared/services/employees_department/view-tbl-shamel-employee.service';


@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListEmployeeComponent implements OnInit {
  
  
  displayedColumns= ["id"];
  constructor(public serv:ViewTBLShamelEmployeeService) { }
  List_Employee  : BehaviorSubject<IEmployeeNameList[]> =new BehaviorSubject<IEmployeeNameList[]>([]) ;

  ngOnInit(): void {
    this.serv.getEmpFullName('').subscribe(
      (data)=>{ this.List_Employee.next(  data as IEmployeeNameList[])  ;}
    )

    
  }
  search()
  {

    this.serv.getEmpFullName('محمد').subscribe(
      (data)=>{ 
        console.log(data);
        this.List_Employee.next(  data as IEmployeeNameList[])  ;}
    )

  }
  
}
