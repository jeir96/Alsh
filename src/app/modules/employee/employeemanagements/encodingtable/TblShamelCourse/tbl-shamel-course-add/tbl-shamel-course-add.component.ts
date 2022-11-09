import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITBLShamelCourse } from 'src/app/modules/shared/models/employees_department/ITBLShamelCourse';

@Component({
  selector: 'app-tbl-shamel-course-add',
  templateUrl: './tbl-shamel-course-add.component.html',
  styleUrls: ['./tbl-shamel-course-add.component.scss']
})
export class TblShamelCourseAddComponent implements OnInit {

  myform: FormGroup;
  frm_Course_id : FormControl;
  frm_Course_name : FormControl;
  frm_Course_fixed : FormControl;
  action:string;
  local_data:ITBLShamelCourse={};
  constructor(private frmBuilder:FormBuilder,
    public dialogRef: MatDialogRef<TblShamelCourseAddComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)  {
      this.myform=this.frmBuilder.group({});
      console.log(data);
      this.frm_Course_id= new FormControl('' ,[Validators.required ,Validators.maxLength(3)]),
      this.frm_Course_name= new FormControl('', [Validators.required, Validators.maxLength(50)])
      this.frm_Course_fixed= new FormControl('0', [Validators.required, Validators.maxLength(1)])

      this.myform.addControl('Course_id',this.frm_Course_id);
      this.myform.addControl('Course_name',this.frm_Course_name);
      this.myform.addControl('Course_fixed',this.frm_Course_fixed);

    console.log(this.data);
      this.local_data.course_id = data.course_id;
      this.local_data.course_name = data.course_name;
      this.local_data.course_fixed = data.course_fixed;

      this.action = this.data.action;
      this.frm_Course_id.setValue(this.local_data.course_id );
      this.frm_Course_name.setValue(this.local_data.course_name );
      if(this.local_data.course_fixed >0 )
      this.frm_Course_fixed.setValue(true );
      else
      this.frm_Course_fixed.setValue(false );

  }

  doAction(){
    let x: ITBLShamelCourse ={course_id:this.local_data.course_id,course_name:this.frm_Course_name.value,course_fixed:this.frm_Course_fixed.value == true?1:0};

    this.dialogRef.close({event:this.action,data:x});
}

  closeDialog(){
    this.dialogRef.close({event:'إلغاء'});
  }
  ngOnInit(): void {
  }

}
