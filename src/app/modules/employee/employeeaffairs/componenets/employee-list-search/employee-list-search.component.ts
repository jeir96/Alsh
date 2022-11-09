import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take, takeUntil } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { ViewTBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/ViewTBLSamelEmployee';
import { ViewTBLSamelEmployeeSearch } from 'src/app/modules/shared/models/employees_department/ViewTBLSamelEmployeeSearch';
import { EmployeeServiceService } from 'src/app/modules/shared/services/employees_department/employee-service.service';
import { IGlobalEmployeeList } from 'src/app/modules/shared/services/employees_department/IGlobalEmployeeList';
import { ViewTBLShamelEmployeeService } from 'src/app/modules/shared/services/employees_department/view-tbl-shamel-employee.service';
import { EmployeePageService } from '../pageservice/employee-page-service';


@Component({
  selector: 'app-employee-list-search',
  templateUrl: './employee-list-search.component.html',
  styleUrls: ['./employee-list-search.component.scss']
})
export class EmployeeListSearchComponent implements OnInit {
  // List For Table
  TBLShamelEmployee_List: ViewTBLShamelEmployee[] = [];
  // Selected  overtime_employee
  Selected_Employee: TBLShamelEmployee;
  //
  Selected_Search_Request : any ;

  //Variable For Scroll
  PageIndex: number = 1;
  fcl_EmployeeName: UntypedFormControl ;
  fcl_Payrol_ID: UntypedFormControl ;
  fcl_Global_ID: UntypedFormControl ;
  fcl_Insurance_ID: UntypedFormControl ;
  fcl_Computer_ID: UntypedFormControl ;
  fcl_Employee_ID: UntypedFormControl ;

  
  Payrol_ID_Sort: string ;
  Global_ID_Sort: string ;
  Insurance_ID_Sort: string ;
  Computer_ID_Sort: string ;
  

  EmployeeName_Sort: string ;
  Employee_ID_Sort: string ;



  @Output() OnFindEmployee = new EventEmitter<TBLShamelEmployee>();



  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private pageService:EmployeePageService,
    public restApi:EmployeeServiceService,
    public viewTBLShamelEmployeeService:ViewTBLShamelEmployeeService,
    public GlobalEmployeeList : IGlobalEmployeeList,
    public dialog: MatDialog) {
      this.PageIndex =1;
      this.fcl_EmployeeName= new UntypedFormControl() ;
      this.fcl_Payrol_ID= new UntypedFormControl();
      this.fcl_Global_ID= new UntypedFormControl();
      this.fcl_Insurance_ID= new UntypedFormControl();
      this.fcl_Computer_ID= new UntypedFormControl();
      this.fcl_Employee_ID= new UntypedFormControl();

      this.pageService.Subject_Selected_ViewTBLSamelEmployeeSearch.subscribe(
        data=>
        {
          this.RefreshList();
        }
      )

     }


  ngOnInit(): void {
  }

  SelectItemChange (Selected_Employee: ViewTBLShamelEmployee)
  {
    console.log(Selected_Employee);
    console.log('Selected_Employee');

    this.Selected_Employee = Selected_Employee;
    
    this.pageService.Subject_Selected_ViewTBLSamelEmployee.next(this.Selected_Employee);

    this.pageService.Selected_ViewTBLSamelEmployee=this.Selected_Employee;
    // this.router.navigate(['employeeinfo'],{ relativeTo: this.route });

    

  }

  OnInputEmployeeNameChange(value:any,sort:boolean =true)
  {
    console.log(this.pageService.Selected_ViewTBLSamelEmployeeSearch);
    if (this.pageService.Selected_ViewTBLSamelEmployeeSearch )
    {
      console.log(value.data);
      console.log(this.fcl_EmployeeName.value);

      this.PageIndex =1;
      this.TBLShamelEmployee_List = [];
      this.pageService.Selected_ViewTBLSamelEmployeeSearch.fullName = this.fcl_EmployeeName.value;
      this.pageService.Selected_ViewTBLSamelEmployeeSearch.fullname_sort =  sort;      
      this.pageService.Subject_Selected_ViewTBLSamelEmployeeSearch?.next(this.pageService.Selected_ViewTBLSamelEmployeeSearch);
      console.log(this.pageService.Selected_ViewTBLSamelEmployeeSearch);
    }
   
      

  }

  OnInputEmployeeIDChange($event:any,sort:boolean =true)
  {
    if (this.pageService.Selected_ViewTBLSamelEmployeeSearch )
    {
      this.PageIndex =1;
      this.TBLShamelEmployee_List = [];
      this.pageService.Selected_ViewTBLSamelEmployeeSearch.id = this.fcl_Employee_ID.value;
      this.pageService.Selected_ViewTBLSamelEmployeeSearch.id_sort =  sort;      
      this.pageService.Subject_Selected_ViewTBLSamelEmployeeSearch?.next(this.pageService.Selected_ViewTBLSamelEmployeeSearch);
    }
  }


  OnInputEmployeeComputerIDChange($event:any,sort:boolean =true)
  {
    if (this.pageService.Selected_ViewTBLSamelEmployeeSearch )
    {
      this.PageIndex =1;
      this.TBLShamelEmployee_List = [];
      this.pageService.Selected_ViewTBLSamelEmployeeSearch.computer_ID = this.fcl_Computer_ID.value;
      this.pageService.Selected_ViewTBLSamelEmployeeSearch.computer_id_sort =  sort;      
      this.pageService.Subject_Selected_ViewTBLSamelEmployeeSearch?.next(this.pageService.Selected_ViewTBLSamelEmployeeSearch);
    }

  }
  OnInputEmployeeGlobalIDChange($event:any,sort:boolean =true)
  {
    if (this.pageService.Selected_ViewTBLSamelEmployeeSearch )
    {
      this.PageIndex =1;
      this.TBLShamelEmployee_List = [];
      this.pageService.Selected_ViewTBLSamelEmployeeSearch.global_ID = this.fcl_Global_ID.value;
      this.pageService.Selected_ViewTBLSamelEmployeeSearch.global_id_sort =  sort;      
      this.pageService.Subject_Selected_ViewTBLSamelEmployeeSearch?.next(this.pageService.Selected_ViewTBLSamelEmployeeSearch);
    }
  }
  OnInputEmployeePayrolIDChange($event:any,sort:boolean =true)
  {
    if (this.pageService.Selected_ViewTBLSamelEmployeeSearch )
    {
      this.PageIndex =1;
      this.TBLShamelEmployee_List = [];
      this.pageService.Selected_ViewTBLSamelEmployeeSearch.payrol_ID = this.fcl_Payrol_ID.value;
      this.pageService.Selected_ViewTBLSamelEmployeeSearch.payrol_id_sort =  sort;      
      this.pageService.Subject_Selected_ViewTBLSamelEmployeeSearch?.next(this.pageService.Selected_ViewTBLSamelEmployeeSearch);
    }
  }

  OnInputEmployeeInsuranceIDChange($event:any,sort:boolean =true)
  {
    if (this.pageService.Selected_ViewTBLSamelEmployeeSearch )
    {

      this.PageIndex =1;
      this.TBLShamelEmployee_List = [];
      this.pageService.Selected_ViewTBLSamelEmployeeSearch.insurance_ID = this.fcl_Insurance_ID.value;
      this.pageService.Selected_ViewTBLSamelEmployeeSearch.payrol_id_sort =  sort;      
      this.pageService.Subject_Selected_ViewTBLSamelEmployeeSearch?.next(this.pageService.Selected_ViewTBLSamelEmployeeSearch);
    }
  }

  RefreshList()
  {    
    this.viewTBLShamelEmployeeService.List_ViewTBLSamelEmployee(this.PageIndex,this.pageService?.Selected_ViewTBLSamelEmployeeSearch) .pipe(
      map(value => value),
      take(1),
      takeUntil(this.TBLShamelEmployee_List)
   ).subscribe(
      data=>
      {             
       if (this.TBLShamelEmployee_List == null || this.TBLShamelEmployee_List == undefined || this.TBLShamelEmployee_List.length==0)
          this.TBLShamelEmployee_List= data ;
      else       
          this.TBLShamelEmployee_List.concat(data)  ;

          console.log('complete');
      }
    )

  }


  trackByFn(index:number, item:ViewTBLShamelEmployee) {    
    return item.id; // unique id corresponding to the item
 }


  onScroll() {
    console.log(this.PageIndex);
    this.PageIndex = this.PageIndex + 1;
    console.log(this.PageIndex);
    this.RefreshList();
  }

  public ngOnDestroy (): void {
   
}


}
