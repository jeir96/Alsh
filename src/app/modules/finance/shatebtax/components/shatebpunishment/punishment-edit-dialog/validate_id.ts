import { AsyncValidatorFn,  ValidationErrors, AbstractControl, FormControl } from "@angular/forms";
import { Observable, map, of } from "rxjs";
import { ViewTBLShamelEmployeeService } from "src/app/modules/shared/services/employees_department/view-tbl-shamel-employee.service";



export function  Validate_ID( TBLShamelEmployeeService:ViewTBLShamelEmployeeService ) : AsyncValidatorFn
{
    return (formControl: AbstractControl) :  Observable<ValidationErrors>   => 
    {


      if (formControl== null )
      return null;
        if (formControl.value == null ||  formControl.value == undefined || formControl.value.length ==0 )
        return null;



        return TBLShamelEmployeeService.search_by_id (formControl.value).
        pipe(map(
          (data:any ) => 
          {           
            return (data && data.length > 0) ? null : { 'uniq1': true }  ;
          }
        ));
   
      
    };
    
}
