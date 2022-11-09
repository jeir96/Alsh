import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { ViewTBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/ViewTBLSamelEmployee';
import { EmployeeServiceService } from 'src/app/modules/shared/services/employees_department/employee-service.service';
import { ViewTBLShamelEmployeeService } from 'src/app/modules/shared/services/employees_department/view-tbl-shamel-employee.service';
import { EmployeePageService } from '../../employee-page-service';


@Component({
  selector: 'app-deleteemployee',
  templateUrl: './deleteemployee.component.html',
  styleUrls: ['./deleteemployee.component.scss']
})
export class DeleteemployeeComponent implements OnInit {
  Result:string ;
  _Selected_Emp: TBLShamelEmployee = {};
  @Input() set Selected_Emp(obj: TBLShamelEmployee) {
    this._Selected_Emp = obj;
    console.log('بلش');
    if (this._Selected_Emp != null &&
      this._Selected_Emp != undefined) {
      console.log('سث');
      console.log(this._Selected_Emp);
      this.SetValue();
    }
  }

  get Selected_Emp(): TBLShamelEmployee {
    return this._Selected_Emp;
  }
  
  DeleteForm: UntypedFormGroup ;
  autocomplete_EmployeeName = new UntypedFormControl();
  input_Employee_ID =new UntypedFormControl();
  Payrol_ID =new UntypedFormControl();
  Computer_ID =new UntypedFormControl();
  Global_ID =new UntypedFormControl();
  Insurance_ID =new UntypedFormControl();


  filteredEmployeeNameList: ViewTBLShamelEmployee[];
  public height: string;
  EmployeeNameList:ViewTBLShamelEmployee[] = [];
 
  


  
  constructor(private fb: UntypedFormBuilder,
    public restApi:EmployeeServiceService,
    public PageService: EmployeePageService,
    public viewTBLShamelEmployeeService:ViewTBLShamelEmployeeService
    ) {

      this.BuildSeachForm();

      this.PageService.Subject_Selected_TBLShamelEmployee.subscribe(
        data => {
          this.Selected_Emp = data;
          console.log('ddddddddddddddddddddd');
          console.log(this.Selected_Emp.FullName);
          this.autocomplete_EmployeeName.setValue(this.Selected_Emp.FullName);
          
        }
      )

      

       this.viewTBLShamelEmployeeService.getEmpFullName("").subscribe(
          (data:any) => {
          
          this.EmployeeNameList=data;   
           
          console.log(this.EmployeeNameList);
        });
      }


   



  
   

   

   BuildSeachForm()
   {
    this.DeleteForm = this.fb.group({
      });
      this.DeleteForm .addControl('autocomplete_EmployeeName',this.autocomplete_EmployeeName);
      this.DeleteForm .addControl('input_Employee_ID',this.input_Employee_ID);
      this.DeleteForm .addControl('Payrol_ID',this.Payrol_ID);
      this.DeleteForm .addControl('Computer_ID',this.Computer_ID);
      this.DeleteForm .addControl('Global_ID',this.Global_ID);
      this.DeleteForm .addControl('Insurance_ID',this.Insurance_ID);


      

   }


  
  
  
     ngOnInit() {

     


      // Listen for changes to the input
    this.autocomplete_EmployeeName.valueChanges
    .pipe(
      startWith(''),
      map(value => {
        // Filter the options
        this.filteredEmployeeNameList = this.EmployeeNameList.filter(option => option.fullname != null && option.fullname.includes(value.toLowerCase()));
        console.log(this.filteredEmployeeNameList);

        // Recompute how big the viewport should be.
        if (this.filteredEmployeeNameList.length < 4) {
          this.height = (this.filteredEmployeeNameList.length * 50) + 'px';
        } else {
          this.height = '200px'
        }
      })
    ).subscribe();


     }

    private _filterEmployees(value: string): ViewTBLShamelEmployee[] {


    
    const filterValue = value.toLowerCase();

    

    return this.EmployeeNameList.filter(state => state.fullname != null && state.fullname.toLowerCase().includes(filterValue) );
  }


  OnSelectEmpFullNameChange(event: MatAutocompleteSelectedEvent) {
    console.log('Book changed...');
    let selectedBook = event.option.value;
    console.log( event.option);
    console.log( event.option.id);

    console.log(selectedBook);

    this.restApi.search_by_id(event.option.id).subscribe(
      (data:any) => {
        this.Selected_Emp=data;  

    });

  }


  Computer_ID_Filter(val: any) {
    

    this.restApi.search_by_Computer_ID(val).subscribe(
      (data:any) => {
        this.Selected_Emp=data;
    });

   }

   Employee_ID_Filter(val: any) {

    
    this.restApi.search_by_id(val).subscribe(
      (data:any) => {
        this.Selected_Emp=data;
    });
   }
  
   public delete_employee()
   {
     if (this.input_Employee_ID.value != null &&
         this.Selected_Emp != null && 
         this.Selected_Emp.id != null &&
         this.Selected_Emp.id >0)
         this.restApi.delete_employee(this.Selected_Emp.id.toString()).subscribe
     (data=>
      {  
      if (data ==1)
      {
        this.Result = "تم حذف البطاقة بنجاح";
        this.DeleteForm.reset();
      }else 
         this.Result = "حدث خطأ";

     }
   
     );
   
   
   }

   public SetValue()
   {
    if (this.Selected_Emp != null && 
      this.Selected_Emp.id != null &&
      this.Selected_Emp.id >0 )
    {
      this.Payrol_ID.setValue(this.Selected_Emp.Payrol_ID) ;
      this.Computer_ID.setValue(this.Selected_Emp.Computer_ID) ;
      this.Global_ID.setValue(this.Selected_Emp.Global_ID) ;
      this.Insurance_ID.setValue(this.Selected_Emp.Insurance_ID) ;

      this.input_Employee_ID.setValue(this.Selected_Emp.id)    ;
     
    }

   }
   
}
