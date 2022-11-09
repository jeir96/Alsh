import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { startWith, map, BehaviorSubject, filter, distinctUntilChanged, debounceTime, switchMap, tap, finalize } from 'rxjs';
import { EmployeeSeachDialogComponent } from '../tblshamelemployee/employee-seach-dialog/employee-seach-dialog.component';
import { ViewTBLShamelEmployeeService } from 'src/app/modules/shared/services/employees_department/view-tbl-shamel-employee.service';
import { IEmployeeNameList } from 'src/app/modules/shared/models/employees_department/IEmployeeNameList';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { EmployeeServiceService } from 'src/app/modules/shared/services/employees_department/employee-service.service';
import { IGlobalEmployeeList } from 'src/app/modules/shared/services/employees_department/IGlobalEmployeeList';

@Component({
  selector: 'app-employee-search-bar',
  templateUrl: './employee-search-bar.component.html',
  styleUrls: ['./employee-search-bar.component.scss']
})
export class EmployeeSearchBarComponent implements OnInit {
  isLoading:any;
  errorMsg:any;

  SearchForm: UntypedFormGroup ;
  autocomplete_EmployeeName = new UntypedFormControl();
  input_Employee_Computer_ID =new UntypedFormControl();
  input_Employee_ID =new UntypedFormControl();

  EmployeeNameList:IEmployeeNameList[] = [];
  filteredEmployeeNameList: IEmployeeNameList[];
  
  SelectedEmp :  BehaviorSubject<TBLShamelEmployee> = new BehaviorSubject({});
  @Output() OnFindEmployee = new EventEmitter<TBLShamelEmployee>();

  constructor( private fb: UntypedFormBuilder,
    public restApi:EmployeeServiceService,

    public viewTBLShamelEmployeeService:ViewTBLShamelEmployeeService,
    public GlobalEmployeeList : IGlobalEmployeeList,
    public dialog: MatDialog, ) {

      this.SelectedEmp.subscribe(data =>
        {
          let I:IEmployeeNameList =
          {
            computer_id : data?.Computer_ID,
            fullname : data?.FullName,
            payrol_id : data?.Payrol_ID,
            id:data?.id,
            global_id:data?.Global_ID,
            insurance_id:data?.Insurance_ID?.toString()
          };

          this.input_Employee_Computer_ID.setValue(this.SelectedEmp.getValue().Computer_ID) ;
          this.input_Employee_ID.setValue(this.SelectedEmp.getValue().id)    ;
          this.autocomplete_EmployeeName.setValue(I);

          this.OnFindEmployee.emit(data);
        }
      );

      if (IGlobalEmployeeList.EmployeeNameList && IGlobalEmployeeList.EmployeeNameList.length>0){
        this.EmployeeNameList=IGlobalEmployeeList.EmployeeNameList;   
       }else{
    
        this.viewTBLShamelEmployeeService.getEmpFullName("").subscribe(
          (data:any) => {
          
          this.EmployeeNameList=data;   
           console.log(data);
    
        });
    
       }
       this.BuildSeachForm();

     }

     BuildSeachForm()
     {
      this.SearchForm = this.fb.group({
        });
        this.SearchForm .addControl('autocomplete_EmployeeName',this.autocomplete_EmployeeName);
        this.SearchForm .addControl('input_Employee_ID',this.input_Employee_ID);
        this.SearchForm .addControl('input_Employee_Computer_ID',this.input_Employee_Computer_ID);
        
  
     }
     
  ngOnInit(): void {


    this.autocomplete_EmployeeName.valueChanges
      .pipe(
        filter(res => {
          return res !== null && res.length >= 4
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        tap(() => {
          this.errorMsg = "";
          this.filteredEmployeeNameList = [];
          this.isLoading = true;
        }),
        switchMap(value => 
          this.viewTBLShamelEmployeeService.getEmpFullName(value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((data: any) => {
        if (data == undefined) {
          this.errorMsg = '';
          this.filteredEmployeeNameList = [];
        } else {
          this.errorMsg = "";
          this.filteredEmployeeNameList= data;
        }
        console.log('أنا عون');
        console.log(this.filteredEmployeeNameList);
      });

    }


 OnSelectEmpFullNameChange(event: MatAutocompleteSelectedEvent) {
  let x :IEmployeeNameList = event.option.value as IEmployeeNameList;
  if (x && x.id)
  {
    
   this.restApi.search_by_id(x.id.toString()).subscribe(
    (data:any) => {
      this.SelectedEmp .next(data);     
      
  });


  }
 }

 display_Employee(emp : IEmployeeNameList)
 {
  return emp && emp.fullname ? emp.fullname : '';
 }

 Computer_ID_Filter(val: any) {

  if (val && _isNumberValue(val) )
  {
    this.restApi.search_by_Computer_ID(val).subscribe(
      (data:any) => {
        
        this.SelectedEmp .next(data);
        
 
    });

  }


  }

  Employee_ID_Filter(val: any) {

    if (val && _isNumberValue(val) )
    {
   
   this.restApi.search_by_id(val).subscribe(
     (data:any) => {        
       this.SelectedEmp .next(data);
     
   });
  }
  }


  btnNextId(id:string)
  {
    if (id &&  _isNumberValue(id))
  {
    this.viewTBLShamelEmployeeService.next_id(id).subscribe(
      (data:any) => {
       

            
        this.SelectedEmp.next(data);
    });
  }
  }

  btnPrevId(id:string)
  {
    if (id &&  _isNumberValue(id))
    {
    this.viewTBLShamelEmployeeService.prev_id(id).subscribe(
      (data:any) => {
        console.log('انا ضمن prev');                      
            console.log(data);
        this.SelectedEmp.next(data); 
    });
  }
  }

  btnNextComputer_ID(Computer_ID:string)
  {
    if (Computer_ID && _isNumberValue(Computer_ID) )
  {
    
    this.viewTBLShamelEmployeeService.next_Computer_ID(Computer_ID).subscribe(
      (data:any) => {
      
     
        this.SelectedEmp .next(data);
    });
  }
  }

  btnPrevComputer_ID(Computer_ID:string)
  {
    console.log(Computer_ID);
    console.log(_isNumberValue(Computer_ID));
    console.log(Computer_ID &&  _isNumberValue(Computer_ID) ==true);


    if (Computer_ID &&  _isNumberValue(Computer_ID) ==true)
    {
      console.log('dsdsdsd');

    this.viewTBLShamelEmployeeService.prev_Computer_ID(Computer_ID).subscribe(
      (data:any) => {
        
        this.SelectedEmp.next(data);  

             
         
    });
  }
  }

  openEmpSearchDialog() {
    const dialogConfig = new MatDialogConfig();    
    const dialogRef = this.dialog.open(EmployeeSeachDialogComponent,dialogConfig );
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
