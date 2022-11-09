import { AsyncValidatorFn,  ValidationErrors, FormGroup, AbstractControl } from "@angular/forms";
import { Observable, map, of } from "rxjs";
import { TBLShamelOvertimeEmployeeService } from "src/app/modules/shared/services/finance_department/broker/tblshamel-overtime-employee.service";



export function  Uniqe( OvertimeEmployeeService:TBLShamelOvertimeEmployeeService ) : AsyncValidatorFn
{
    return (FormAbstract: AbstractControl) :  Observable<ValidationErrors  | null > => 
    {

      var Form = FormAbstract as FormGroup;
      if (Form== null )
      return null;
        if (Form.value != null && Form.value.id == null || Form.value.id == undefined)
        return of(null);
        if (Form.value != null && Form.value.documentnum == null || Form.value.documentnum == undefined)
        return of(null);
        if (Form.value != null && Form.value.startdate == null || Form.value.startdate == undefined)
        return of(null);
        if (Form.value != null &&Form.value.documentdate == null || Form.value.documentdate == undefined)
        return of(null);



        return OvertimeEmployeeService.isUniqueRecord (Form.value).
        pipe(map(
          (data:any ) => 
          {           
            return (data && data.length > 0) ? { "OverTimeEmployee": true } : null;
          }
        ));
   
      
    };
    
}
