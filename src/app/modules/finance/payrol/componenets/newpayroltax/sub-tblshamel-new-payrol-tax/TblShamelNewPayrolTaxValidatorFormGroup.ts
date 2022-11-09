import {
    AbstractControl,
    AsyncValidatorFn,
    FormGroup,
    ValidationErrors,
  } from '@angular/forms';

  import { Observable, of } from 'rxjs';

import { TblShamelNewPayrolTaxService } from 'src/app/modules/shared/services/finance_department/payrol/tbl-shamel-new-payrol-tax.service';

  
  export class TblShamelNewPayrolTaxValidatorFormGroup {
    static Validate(tblshamelnewpayroltaxservice: TblShamelNewPayrolTaxService): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors> => {

        var formGroup = control as FormGroup;
        if (formGroup== null || formGroup==undefined)return of(null) ;

        if (formGroup.value== null || formGroup.value==undefined)
        of(null) ;

        if (formGroup.value.payroltaxtype=='ta3weed')
        {
            if (formGroup.value.ta3weed_name == null || 
                formGroup.value.ta3weed_name == undefined ||
                formGroup.value.ta3weed_name.length==0)
                {                    
                    return of ({  });
                } 

            if (formGroup.value.ta3weedp_name == null || 
                formGroup.value.ta3weedp_name == undefined )
                {
                        return of ({  });
                } 
            
                var arr =tblshamelnewpayroltaxservice.List_ta3weed.filter(x=>x.ta3weed_name == formGroup.value.ta3weed_name);
                    if (arr!= null && formGroup.value.serial!= null && formGroup.value.serial>0)
                    {
                        arr= arr.filter(x=>x.serial == formGroup.value.serial);                        
                    }
                    if (arr!=null && arr.length>0)
                    {
                        formGroup.controls['ta3weed_name'].setErrors({ ta3weed_name_exist: true });
                        return of ({  });
                    }


                    return of (null);                             
        } else if (formGroup.value.payroltaxtype=='taxtemp')
        {
            if (formGroup.value.taxtemp_name == null || 
                formGroup.value.taxtemp_name == undefined )
                {
                    return of ({  });
                } 

            if (formGroup.value.taxtempp_name == null || 
                    formGroup.value.taxtempp_name == undefined )
                    {
                        return of ({  });
                    } 
            
            var arr =tblshamelnewpayroltaxservice.List_taxtemp.filter(x=>x.taxtemp_name == formGroup.value.taxtemp_name);

            if (arr!= null && formGroup.value.serial!= null && formGroup.value.serial>0)
            {
                arr= arr.filter(x=>x.serial == formGroup.value.serial);                        
            }
            if (arr!=null && arr.length>0)
               return of ({ usernameAlreadyExists: true });

            return of ({  });  


        } else if (formGroup.value.payroltaxtype=='recurr')
        {
            if (formGroup.value.taxrecurr_name == null || 
                formGroup.value.taxrecurr_name == undefined )
                {
                    return of ({  });
                } 

            if (formGroup.value.taxrecurrp_name == null || 
                    formGroup.value.taxrecurrp_name == undefined )
                    {
                        return of ({  });
                    } 
            
            var arr =tblshamelnewpayroltaxservice.List_recurr.filter(x=>x.taxrecurr_name == formGroup.value.taxrecurr_name);

            if (arr!= null && formGroup.value.serial!= null && formGroup.value.serial>0)
            {
                arr= arr.filter(x=>x.serial == formGroup.value.serial);                        
            }
            if (arr!=null && arr.length>0)
               return of ({ usernameAlreadyExists: true });

            return of ({  });  

        } 


        


        return of ({  });  


      };
    }
  }