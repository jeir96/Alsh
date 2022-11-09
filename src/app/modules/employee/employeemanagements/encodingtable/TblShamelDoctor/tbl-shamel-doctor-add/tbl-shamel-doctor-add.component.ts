import { Component, Inject, OnInit, Optional } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITBLShamelDoctor } from 'src/app/modules/shared/models/employees_department/ITBLShamelDoctor';


@Component({
  selector: 'app-tbl-shamel-doctor-add',
  templateUrl: './tbl-shamel-doctor-add.component.html',
  styleUrls: ['./tbl-shamel-doctor-add.component.css']
})
export class TblShamelDoctorAddComponent implements OnInit {

  myform: UntypedFormGroup;
  frm_Doctor_id : UntypedFormControl;
  frm_Doctor_name : UntypedFormControl;
  frm_fixed : UntypedFormControl;
  action:string;
  local_data:ITBLShamelDoctor={};
  constructor(private frmBuilder:UntypedFormBuilder,
    public dialogRef: MatDialogRef<TblShamelDoctorAddComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)  {
      this.myform=this.frmBuilder.group({});
      console.log(data);
      this.frm_Doctor_id= new UntypedFormControl('' ,[Validators.required ,Validators.maxLength(3)]),
      this.frm_Doctor_name= new UntypedFormControl('', [Validators.required, Validators.maxLength(50)])
      this.frm_fixed= new UntypedFormControl('0', [Validators.required, Validators.maxLength(1)])

      this.myform.addControl('Doctor_id',this.frm_Doctor_id);
      this.myform.addControl('Doctor_name',this.frm_Doctor_name);
      this.myform.addControl('fixed',this.frm_fixed);

    console.log(this.data);
      this.local_data.doctor_id = data.doctor_id;
      this.local_data.doctor_name = data.doctor_name;
      this.local_data.Fixed = data.Fixed;

      this.action = this.data.action;
      this.frm_Doctor_id.setValue(this.local_data.doctor_id );
      this.frm_Doctor_name.setValue(this.local_data.doctor_name );
      if(this.local_data.Fixed >0 )
      this.frm_fixed.setValue(true );
      else
      this.frm_fixed.setValue(false );

  }

  doAction(){
    let x: ITBLShamelDoctor ={doctor_id:this.local_data.doctor_id,doctor_name:this.frm_Doctor_name.value,Fixed:this.frm_fixed.value == true?1:0};

    this.dialogRef.close({event:this.action,data:x});
}

  closeDialog(){
    this.dialogRef.close({event:'إلغاء'});
  }
  ngOnInit(): void {
  }

}
