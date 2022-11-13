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

          console.log("employee 0", emp)

        return (control: AbstractControl)
            : Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {

              console.log("control", control)

              const formControls: any = control.parent.controls;

              const employee: TBLShamelEmployee = {};

              Object.keys(formControls).forEach(control => {

                console.log("formControls[control]", formControls[control])


                if(control == "FName")
                {
                  employee.FName = formControls[control].value;
                }

                if(control == "LName")
                {
                  employee.LName = formControls[control].value;

                }

                if(control == "Father")
                {
                  employee.Father = formControls[control].value;

                }

                if(control == "Mother")
                {
                  employee.Mother = formControls[control].value;

                }


              })

         if (control.value == null )
         return new Promise(
          resolve => {
              null
          });

            return empService.
            Check_FullName(employee, emp.id).
                pipe(
                    map(
                        (emp: TBLShamelEmployee) => {
                            return (emp && emp.id) ? { "mobNumExists": true } : null;
                        }
                    ));
        };
    }
