import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import * as moment from "moment";
import { Observable, map, of, forkJoin } from "rxjs";
import { ITBLShamelSCCourse } from "src/app/modules/shared/models/employees_department/ITBLShamelSCCourse";
import { TblshamelsccourseService } from "src/app/modules/shared/services/employees_department/tblshamelsccourse.service";


export function Validator_Date_Range(): ValidatorFn {
    return (control: AbstractControl): (ValidationErrors | null) => {
        //هنا الكونترول هو FormGroup
        let formGroup: FormGroup = {...control} as FormGroup;

        const startDate = formGroup.value["startdate"];

        const endDate = formGroup.value["enddate"];

        if (formGroup == null)
            return of(null);

        if (formGroup.controls == null)
            return of(null);
        if (formGroup.controls['startdate'].value == null ||
            formGroup.controls['enddate'].value == null
        ) {
            return of(null);
        }

        return startDateGreaterThandEndDate(startDate, endDate) ? {"dateRange" : true} : null;

    };
}

function  startDateGreaterThandEndDate(startDate: string, endDate: string) {
    return startDate > endDate;
}
