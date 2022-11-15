import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class DateRangeErrorStateMatcher implements ErrorStateMatcher {
  // private errors: FormError[] = [];
  // constructor(errors: FormError[]) {
  //   this.errors = errors;
  // }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {

    const controlErrors = control.errors && Object.keys(control.errors).length > 0;

    if(control.touched && ( this.hasError(form , "dateRange") || controlErrors ) )
    {
      return true;
    }

    return false;
  }

  hasError(form: FormGroupDirective | NgForm | null, errorName: string) {
    return form.hasError(errorName);
  }



}




// export class InputFieldComponent implements OnInit {
// .......
//   errorMatcher: MSTErrorStateMatcher;

//   ngOnInit() {
//     this.errorMatcher = new MSTErrorStateMatcher(this.errors);
//   }
// ....
// }
