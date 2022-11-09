import {AbstractControl,AsyncValidatorFn,ValidationErrors,} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { EmployeeServiceService } from 'src/app/modules/shared/services/employees_department/employee-service.service';
import { EmployeePageService } from '../../../employee-page-service';
export function Validator_GLOBAL_ID( empService:EmployeeServiceService,
                                    id:number|undefined,
                                    pageEmployee:EmployeePageService) : AsyncValidatorFn
{
        return (control: AbstractControl)
            : Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {

            let value_From_Control: string = control.value;
            if (!value_From_Control ||
                value_From_Control.length == 0
            )
                return new Promise(
                    resolve => {
                        null
                    });


                    if (pageEmployee.Selected_TBLShamelEmployee != null &&
                        pageEmployee.Selected_TBLShamelEmployee != undefined)
                           id = pageEmployee.Selected_TBLShamelEmployee.id;

                console.log('Validate Computer ID');
                console.log(pageEmployee.Selected_TBLShamelEmployee);
                console.log(pageEmployee.Selected_TBLShamelEmployee);
                console.log('Validate Computer ID');



            return empService.
            Check_GLOBAL_ID(value_From_Control, id).
                pipe(
                    map(
                        (emp: TBLShamelEmployee) => {
                            return (emp && emp.id) ? { "mobNumExists": true } : null;
                        }
                    ));
        };
    }
