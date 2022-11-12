import { FormControl, FormGroup } from '@angular/forms';
import {AbstractControl,AsyncValidatorFn,ValidationErrors,} from '@angular/forms';
import { Observable, debounceTime } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { EmployeeServiceService } from 'src/app/modules/shared/services/employees_department/employee-service.service';
import { EmployeePageService } from '../../../employee-page-service';
export function Validator_FullName( empService:EmployeeServiceService,                                    
                                    emp:TBLShamelEmployee) : AsyncValidatorFn
        {

          console.log("alsdj")

        return (control: AbstractControl)
            : Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {

              const Fname = control as FormControl;

         if (Fname.value == null )
         return new Promise(
          resolve => {
              null
          });


              



         
          


            

          



            return empService.
            Check_FullName(emp, emp.id).
                pipe(
                    map(
                        (emp: TBLShamelEmployee) => {
                            return (emp && emp.id) ? { "mobNumExists": true } : null;
                        }
                    ));
        };
    }
