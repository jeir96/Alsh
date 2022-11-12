import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors, } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITBLShamelSCPunishment } from 'src/app/modules/shared/models/employees_department/ITBLShamelSCPunishment';
import { TBLShamelSCPunishmentService } from 'src/app/modules/shared/services/employees_department/tblshamel-scpunishment.service';
import { TblshamelscjobstateService } from 'src/app/modules/shared/services/employees_department/tblshamelscjobstate.service';


export function Validator_JobState(shamelscjobstateService: TblshamelscjobstateService): AsyncValidatorFn {
    return (control: AbstractControl)
        : Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {

        let frmGroup: FormGroup = control as FormGroup;
        if (frmGroup == null ||
            frmGroup.controls == null
        )
            return new Promise(
                resolve => {
                    null
                });


        return shamelscjobstateService.
            Validate(frmGroup.value).
            pipe(
                map(
                    (emps: ITBLShamelSCPunishment) => {
                        return (emps && emps.serial > 0) ? { "mobNumExists": true } : null;
                    }
                ));
    };
}
