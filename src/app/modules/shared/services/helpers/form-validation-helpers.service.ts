import { Injectable } from '@angular/core';


// type ValidationTypes = "required" | "pattern" | "mobNumExists" | "maxLength" | "dateRange";

@Injectable({
  providedIn: 'root'
})
export class FormValidationHelpersService {

  constructor() { }

  public hasError = (form: any, controlName: string, errorName: string): boolean =>{

    return this.caclFormFieldNestedName(form, controlName).hasError(errorName);
  }

    private hasRequiredValidation(validationName: string): boolean
    {
      return validationName == "required"
    }

    private hasPatternValidation(validationName: string): boolean
    {
      return validationName == "pattern"
    }

    private hasDuplicatedValidation(validationName: string): boolean
    {
      return validationName == "mobNumExists"
    }

    private hasMaxLengthValidation(validationName: string): boolean
    {
      return validationName == "maxLength"
    }

    private hasDateRangeVaidation(validationName: string): boolean
    {
      return validationName == "dateRange"
    }

    private hasRequiredError(form: any, controlName: string): boolean {

      const errors = this.caclFormFieldNestedName(form, controlName).errors;

      if(errors && errors['required'])
      {

        return errors["required"] != undefined;
      }

      return false;

    }

    private hasMaxLengthError(form: any, controlName: string): boolean {

      const errors = this.caclFormFieldNestedName(form, controlName).errors;

      if(errors && errors['maxlength'])
      {
        return errors["maxlength"] != undefined;
      }

      return false;

    }

    private hasPatternError(form: any, controlName: string): boolean {

      const errors = this.caclFormFieldNestedName(form, controlName).errors;

      if(errors && errors['pattern'])
      {
        return errors["pattern"] != undefined;
      }

      return false;

    }

    private hasDuplicatedError(form: any, controlName: string): boolean {

      const errors = this.caclFormFieldNestedName(form, controlName).errors;

      if(errors && errors['mobNumExists'])
      {
        return errors["mobNumExists"] != undefined;
      }

      return false;

    }

    private hasDateRangeError(form: any, controlName: string): boolean {

      const errors = this.caclFormFieldNestedName(form, controlName).errors;

      if(errors && errors['dateRange'])
      {
        return errors["dateRange"] != undefined;
      }

      return false;
    }

    // if message is provided in array, it get printed, otherwise it get calculated automatically
    public printFirstErrorMessage(
        form: any,
        controlName: string,
        label: string,
        errors: {name: string, message?: string}[],
        isFemale?: boolean
      ): string {

      //filter only existing errors on form field
      const errorMessages: string[] =  errors.filter(x => {

        const hasMaxLengthValidation: boolean = this.hasMaxLengthValidation(x.name)

        if(hasMaxLengthValidation)
        {
          return this.hasMaxLengthError(form, controlName);
        }

        return this.hasError(form, controlName, x.name)

      })
      // map errors on form field to messages and return first one
      .map(x => {

        const errorMesseage = ""

        switch(x.name) {
          case("required"): {

            if(x.message)
            {
              return x.message;
            }

            return this.printIsRequired(label, {isFemale})

          }
          case("maxLength"): {
            if(x.message) {
              return x.message;
            }

            return this.printControlMaxLength(form, controlName)
          }
          case("pattern"): {
            if(x.message) {
              return x.message
            }
            return this.printNumberValidation()
          }
          case("mobNumExists"): {
            if(x.message) {
              return x.message;
            }
            return this.printIsDuplicated(label,{isFemale});
          }
          default: return "";
        }

      })


      return errorMessages[0]

    }


    private caclFormFieldNestedName(form: any, formName: string): any
    {


      const formPathAsArray: string[] = formName.split('.').filter(x => x != "")


      if(formPathAsArray.length == 0)
      {
        return form;
      }


      const nestedFormValue = formPathAsArray.reduce((o,i)=> {

        return o.controls[i]
        },
        form
      )


      return nestedFormValue;



      // return form.controls[formName];

    }

    public autoPrintFirstErrorMessage(
      form: any,
      controlName: string,
      label: string,
      isFemale?: boolean

    ): string {

    const formContrlValue: any = this.caclFormFieldNestedName(form, controlName);


    const formErrors = formContrlValue.errors;

    const errorMessages: string[] =  Object.keys(formErrors).filter(x => {


      const hasRequiredValidation: boolean = this.hasRequiredValidation(x)
      const hasPatternValidation: boolean = this.hasPatternValidation(x)
      const hasMaxLengthValidation: boolean = x == "maxlength"
      const hasDuplicatedValidation: boolean = this.hasDuplicatedValidation(x)
      const hasDateRangeValidation: boolean = this.hasDateRangeVaidation(x);


      if(hasRequiredValidation)
      {
        return this.hasRequiredError(form, controlName)
      }

      if(hasPatternValidation)
      {
        return this.hasPatternError(form, controlName)
      }

      if(hasMaxLengthValidation)
      {
        return this.hasMaxLengthError(form, controlName);
      }

      if(hasDuplicatedValidation)
      {
        return this.hasDuplicatedError(form, controlName);
      }

      if(hasDateRangeValidation)
      {
        return this.hasDateRangeError(form, controlName);
      }

      return this.hasRequiredError(form, controlName)

    })
    // map errors on form field to messages and return first one
    .map(x => {

      const errorMesseage = ""

      switch(x) {
        case("required"): {

          return this.printIsRequired(label, {isFemale})

        }
        case("maxlength"): {

          return this.printControlMaxLength(form, controlName)
        }
        case("pattern"): {

          return this.printNumberValidation()
        }
        case("mobNumExists"): {

          return this.printIsDuplicated(label);
        }
        case("dateRange"): {
          return this.printDateRange(label);
        }
        default: return "";
      }

    })



    return errorMessages[0]

  }

    private getMaxLength(form: any, controlName: string)
    {
      return this.caclFormFieldNestedName(form, controlName).errors["maxlength"]
    }

    public fieldHasErrors(form: any, field: string): boolean {


      // const isFieldPrisitne = this.isFieldPrisitne(form, field);

      // if(isFieldPrisitne)
      // {
      //   return false;
      // }

      const nestedFormValue = this.caclFormFieldNestedName(form, field);

      const errors = nestedFormValue.errors;


      if(errors)
      {
        return Object.keys(errors).length > 0;
      }

      return false;

    }

    private isFieldPrisitne(form: any, controlName: string): boolean {
      return this.caclFormFieldNestedName(form, controlName).pristine == true;
    }

    public printNumberValidation(): string {

      return "يرجى إدخال رقم موجب";

    }

    private printControlMaxLength(form: any, controlName: string): string {

      const maxLength = this.caclFormFieldNestedName(form, controlName).errors["maxlength"]["requiredLength"];

      const maxLengthMessage = this.printMaxNumberLength(maxLength)

      return maxLengthMessage;

    }

    public printMaxNumberLength(maxNumber: number | string): string {

      const maxNumberString = maxNumber.toString();

      const maxNumberErrorMessage = `يرجى عدم إدخال أكثر من ${maxNumberString} محرف`

      return maxNumberErrorMessage;

    }

    public printIsRequired(name: string, options?: {isFemale?: boolean }): string
    {
      const femaleChar = options?.isFemale ? "ة" : ""

      const RequiredMessagee = `${name} مطلوب${femaleChar}`;

      return RequiredMessagee

    }

    public printIsDuplicated(name: string, options?: {isFemale?: boolean }): string
    {
      const femaleChar = options?.isFemale ? "ة" : ""

      const DuplicatedMessage = `${name} مكرر ${femaleChar}`;

      return DuplicatedMessage

    }


    printDateRange(label: string): string {

      const dateRangeMessage = `${label} أصغر من تاريخ النهاية`


      return dateRangeMessage;

    }

}
