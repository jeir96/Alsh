import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { ViewTBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/ViewTBLSamelEmployee';
import { ViewTBLSamelEmployeeSearch } from 'src/app/modules/shared/models/employees_department/ViewTBLSamelEmployeeSearch';
import { EmployeeServiceService } from 'src/app/modules/shared/services/employees_department/employee-service.service';
import { ViewTBLShamelEmployeeService } from 'src/app/modules/shared/services/employees_department/view-tbl-shamel-employee.service';
@Injectable({
  providedIn: 'root'
})
export class EmployeePageService {

  ModeEntry:string = 'add';


    Selected_TBLShamelEmployee?:TBLShamelEmployee;
    Subject_Selected_TBLShamelEmployee : BehaviorSubject<TBLShamelEmployee> = new  BehaviorSubject<TBLShamelEmployee>({});

    Selected_ViewTBLSamelEmployee?:ViewTBLSamelEmployeeSearch;    
    Subject_Selected_ViewTBLSamelEmployee : BehaviorSubject<ViewTBLShamelEmployee> = new  BehaviorSubject<ViewTBLShamelEmployee>({});


    Selected_ViewTBLSamelEmployeeSearch?:ViewTBLSamelEmployeeSearch = {};
    Subject_Selected_ViewTBLSamelEmployeeSearch : BehaviorSubject<ViewTBLSamelEmployeeSearch> = new  BehaviorSubject<ViewTBLSamelEmployeeSearch>({});



    constructor(
      public restApi:EmployeeServiceService,
      public viewTBLShamelEmployeeService:ViewTBLShamelEmployeeService
      ) {

    this.Subject_Selected_ViewTBLSamelEmployee.subscribe(
      data=>
      {
        console.log('start of this.Subject_Selected_ViewTBLSamelEmployee.subscribe');
        console.log(data);
        console.log('end  of this.Subject_Selected_ViewTBLSamelEmployee.subscribe');


        this.Selected_ViewTBLSamelEmployee = data;

        if (this.Selected_ViewTBLSamelEmployee != null &&
            this.Selected_ViewTBLSamelEmployee != undefined &&
            this.Selected_ViewTBLSamelEmployee.id != null &&
            this.Selected_ViewTBLSamelEmployee.id != undefined)
            this.restApi.search_by_id(this.Selected_ViewTBLSamelEmployee.id.toString()).subscribe
            (
              data =>
              {

                console.log('Employee Full Information');

                console.log(data);

               
                this.Subject_Selected_TBLShamelEmployee.next( data);
              }

            )


      }

    )

    this.Subject_Selected_TBLShamelEmployee.subscribe(
      data=>
      {
        this.Selected_TBLShamelEmployee = data;

      }

    )

     }



     public ngOnDestroy (): void {
      this.Subject_Selected_TBLShamelEmployee.complete();
    }

    public Refresh_Selected_Employee()
    {
      if (this.Selected_TBLShamelEmployee != null &&
        this.Selected_TBLShamelEmployee != undefined &&
        this.Selected_TBLShamelEmployee.id != null &&
        this.Selected_TBLShamelEmployee.id != undefined)
        this.restApi.search_by_id(this.Selected_TBLShamelEmployee.id.toString()).subscribe
        (
          data =>
          {

            console.log('Employee Full Information');

            console.log(data);

           
            this.Subject_Selected_TBLShamelEmployee.next( data);
          }

        )


  }
    
}