import { ReturnStatement } from "@angular/compiler";
import { AsyncValidatorFn,  ValidationErrors, FormGroup, AbstractControl } from "@angular/forms";
import { Observable, map, of } from "rxjs";
import { TBLShamelShatebHealthService } from "src/app/modules/shared/services/finance_department/shatebtax/tblshamel-shateb-health.service";
import { TBLShamelShatebPunishmentService } from "src/app/modules/shared/services/finance_department/shatebtax/tblshamel-shateb-punishment.service";
import { TBLShamelShatebVarTaxService } from "src/app/modules/shared/services/finance_department/shatebtax/tblshamel-shateb-var-tax.service";



export function  Uniqe( ShamelShatebVarTaxService: TBLShamelShatebVarTaxService ) : AsyncValidatorFn
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



        return  ShamelShatebVarTaxService.isUniqueRecord (Form.value.id,Form.value.value.documentnum,Form.value.startdate,Form.value.documentdate,Form.value.serial).
        pipe(map(
          (data:any ) => 
          {           
            return (data && data.length > 0) ? { "DecreeDateExists": true } : null;
          }
        ));
   
      
    };
    
}
