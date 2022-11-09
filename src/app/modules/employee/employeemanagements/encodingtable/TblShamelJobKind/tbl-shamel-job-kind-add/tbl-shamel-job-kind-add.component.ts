import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITBLShamelJobKind } from 'src/app/modules/shared/models/employees_department/ITBLShamelJobKind';

@Component({
  selector: 'app-tbl-shamel-job-kind-add',
  templateUrl: './tbl-shamel-job-kind-add.component.html',
  styleUrls: ['./tbl-shamel-job-kind-add.component.scss']
})
export class TblShamelJobKindAddComponent implements OnInit {

  myform: FormGroup;
  frm_JobKind_id : FormControl;
  frm_JobKind_name : FormControl;
  frm_JobKind_fixed : FormControl;
  action:string;
  local_data:ITBLShamelJobKind={};
  constructor(private frmBuilder:FormBuilder,
    public dialogRef: MatDialogRef<TblShamelJobKindAddComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)  {
      this.myform=this.frmBuilder.group({});
      console.log(data);
      this.frm_JobKind_id= new FormControl('' ,[Validators.required ,Validators.maxLength(3)]),
      this.frm_JobKind_name= new FormControl('', [Validators.required, Validators.maxLength(50)])
      this.frm_JobKind_fixed= new FormControl('0', [Validators.required, Validators.maxLength(1)])

      this.myform.addControl('JobKind_id',this.frm_JobKind_id);
      this.myform.addControl('JobKind_name',this.frm_JobKind_name);
      this.myform.addControl('JobKind_fixed',this.frm_JobKind_fixed);

    console.log(this.data);
      this.local_data.jobkind_id = data.jobkind_id;
      this.local_data.jobkind_name = data.jobkind_name;
      this.local_data.jobkind_fixed = data.course_fixed;

      this.action = this.data.action;
      this.frm_JobKind_id.setValue(this.local_data.jobkind_id );
      this.frm_JobKind_name.setValue(this.local_data.jobkind_name );
      if(this.local_data.jobkind_fixed >0 )
      this.frm_JobKind_fixed.setValue(true );
      else
      this.frm_JobKind_fixed.setValue(false );

  }

  doAction(){
    let x: ITBLShamelJobKind ={jobkind_id:this.local_data.jobkind_id,jobkind_name:this.frm_JobKind_name.value,jobkind_fixed:this.frm_JobKind_fixed.value == true?1:0};

    this.dialogRef.close({event:this.action,data:x});
}

  closeDialog(){
    this.dialogRef.close({event:'إلغاء'});
  }
  ngOnInit(): void {
  }

}
