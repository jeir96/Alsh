import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormValidationHelpersService } from 'src/app/modules/shared/services/helpers/form-validation-helpers.service';
import { Component, Inject, OnInit, Optional, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITBLShamelCourse } from 'src/app/modules/shared/models/employees_department/ITBLShamelCourse';
import { TblshamelcourseService } from 'src/app/modules/shared/services/employees_department/tblshamelcourse.service';

@Component({
  selector: 'app-tbl-shamel-course-add',
  templateUrl: './tbl-shamel-course-add.component.html',
  styleUrls: ['./tbl-shamel-course-add.component.scss']
})
export class TblShamelCourseAddComponent implements OnDestroy {

  addSubscription: Subscription;
  updateSubscription: Subscription;

  Form : FormGroup;
  course_id : FormControl;
  course_name : FormControl;
  course_fixed : FormControl;

  _Selected_SCCourse: ITBLShamelCourse = {};
  id: number;

  set Selected_SCCourse(obj: ITBLShamelCourse) {

    this._Selected_SCCourse = obj;

    if (this._Selected_SCCourse != null &&
      this._Selected_SCCourse != undefined) {

      this.SetValue();
    }
  }

  get Selected_SCCourse(): ITBLShamelCourse {
    return this._Selected_SCCourse;
  }

  get isEditMode() {
    return this.Selected_SCCourse && this.Selected_SCCourse.course_id;
  }

  public get actionName() {
    return this.isEditMode ? "تعديل" : "إضافة"
  }

  constructor(
    public dialogRef: MatDialogRef<TblShamelCourseAddComponent>,
    public courseService: TblshamelcourseService,
    private formValidatorsService: FormValidationHelpersService,
    private snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)  {

    console.log("data", data);

    this.BuildForm();

    if(data && data.obj)
    {
      this.LoadObject(data.obj)
    }

  }


  closeDialog(){
    this.dialogRef.close({event:'إلغاء'});
  }

  private BuildForm() {

    this.Form = new FormGroup({});

    this.course_id= new FormControl('' ,[Validators.required ,Validators.maxLength(3)]),
    this.course_name= new FormControl('', [Validators.required, Validators.maxLength(50)])
    this.course_fixed= new FormControl('', [Validators.required, Validators.maxLength(1)])

    this.Form.addControl('course_id', this.course_id);
    this.Form.addControl('course_name', this.course_name);
    this.Form.addControl('course_fixed', this.course_fixed);

  }

  private LoadObject(data: ITBLShamelCourse) {
    this.Selected_SCCourse = {...data}
  }

  public ClearObject()
  {
    if (!this.Selected_SCCourse)
    this.Selected_SCCourse ={};

  }


  SetValue() {
    if (this.Selected_SCCourse != undefined &&
      this.Selected_SCCourse != null) {
        console.log("test")
      this.course_id.setValue(this.Selected_SCCourse.course_id);
      this.course_name.setValue(this.Selected_SCCourse.course_name);
      this.course_fixed.setValue(this.Selected_SCCourse.course_fixed);

      console.log("form", this.Form)

    }

  }

  public GetValue() {

      if (this.Selected_SCCourse) {

        this.Selected_SCCourse.course_id = Number(this.course_id.value);
        this.Selected_SCCourse.course_name = this.course_name.value;
        this.Selected_SCCourse.course_fixed = this.course_fixed.value;

      }
  }


  Save(){

    if(! this.Form.valid)
    {
      return
    }

    this.GetValue()

    console.log(" form value", this.Selected_SCCourse)


    if(this.isEditMode)
    {
      this.updateSubscription =  this.courseService.update(this.Selected_SCCourse).subscribe(() => {
        this.snackBar.open('تم بنجاح', 'موافق');

        this.Form.reset();
        this.ClearObject();
        this.dialogRef.close({event:this.actionName});


      })
    }
    else {
        this.addSubscription =  this.courseService.add(this.Selected_SCCourse).subscribe(() => {
        this.snackBar.open('تم بنجاح', 'موافق');
        this.Form.reset();

        this.ClearObject();
        this.dialogRef.close({event:this.actionName});

      })
    }

  }

  onReset() {
    this.Form.reset();
  }

  public fieldHasErrors(form: any, field: string) {
    return this.formValidatorsService.fieldHasErrors(form, field);
  }

  public printFirstErrorMessage(
    form: any,
    controlName: string,
    label: string,
    errors: { name: string, message?: string }[],
    isFemale?: boolean
  ): string {
    return this.formValidatorsService.printFirstErrorMessage(form, controlName, label, errors, isFemale);
  }


  public autoPrintFirstErrorMessage(
    form: any,
    controlName: string,
    label: string,
    isFemale?: boolean
  ): string {
    return this.formValidatorsService.autoPrintFirstErrorMessage(form, controlName, label, isFemale);
  }

  ngOnDestroy(): void {
      if(this.addSubscription)
      {
        this.addSubscription.unsubscribe();
      }

      if(this.updateSubscription)
      {
        this.updateSubscription.unsubscribe();
      }
  }


}
