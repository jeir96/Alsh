import { FormGroup } from '@angular/forms';
import {AbstractControl,AsyncValidatorFn,ValidationErrors,} from '@angular/forms';
import { Observable, debounceTime } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { EmployeeServiceService } from 'src/app/modules/shared/services/employees_department/employee-service.service';
import { EmployeePageService } from '../../../employee-page-service';
export function Validator_FullName( empService:EmployeeServiceService,
                                    id:number|undefined,
                                    pageEmployee:EmployeePageService) : AsyncValidatorFn
        {

          console.log("alsdj")

        return (control: AbstractControl)
            : Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {

              const formGroup = control as FormGroup;

              const formGroupControls = formGroup.controls;

              const employee: TBLShamelEmployee = {};

              Object.keys(formGroup.controls).map(x => {

                if(formGroupControls[x])
                {
                  if(x == "FNAME")
                  {
                    employee.FName = formGroupControls[x].value;
                    return
                  }
                  if(x == "LNAME")
                  {
                    employee.LName = formGroupControls[x].value;
                  }
                  if(x == "FATHER")
                  {
                    employee.Father = formGroupControls[x].value;
                  }
                  if(x == "MOTHER")
                  {
                    employee.Mother = formGroupControls[x].value;
                  }

                }


              })



            // if (!controlValues ||
            //   controlValues.length == 0
            // )
            //     return new Promise(
            //         resolve => {
            //             null
            //         });

            console.log("employee", employee);


            if (pageEmployee.Selected_TBLShamelEmployee != null &&
                pageEmployee.Selected_TBLShamelEmployee != undefined)
                    id = pageEmployee.Selected_TBLShamelEmployee.id;

            console.log('Validate Computer ID');
            console.log(pageEmployee.Selected_TBLShamelEmployee);
            console.log(pageEmployee.Selected_TBLShamelEmployee);
            console.log('Validate Computer ID');



            return empService.
            Check_FullName(employee, id).
                pipe(
                    map(
                        (emp: TBLShamelEmployee) => {
                            return (emp && emp.id) ? { "mobNumExists": true } : null;
                        }
                    ));
        };
    }
