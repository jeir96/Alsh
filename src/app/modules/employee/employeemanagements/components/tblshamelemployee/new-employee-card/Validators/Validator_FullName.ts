import {AbstractControl,AsyncValidatorFn,ValidationErrors,} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { EmployeeServiceService } from 'src/app/modules/shared/services/employees_department/employee-service.service';
import { EmployeePageService } from '../../../employee-page-service';
export function Validator_FullName( empService:EmployeeServiceService,
                                    id:number|undefined,
                                    form: any,
                                    pageEmployee:EmployeePageService) : AsyncValidatorFn
        {



        return (control: AbstractControl)
            : Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {

              console.log("form1", empService.employee.FName)

            console.log("form", form)


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
            Check_FullName(value_From_Control, id, empService.employee).
                pipe(
                    map(
                        (emp: TBLShamelEmployee) => {
                            return (emp && emp.id) ? { "mobNumExists": true } : null;
                        }
                    ));
        };
    }
