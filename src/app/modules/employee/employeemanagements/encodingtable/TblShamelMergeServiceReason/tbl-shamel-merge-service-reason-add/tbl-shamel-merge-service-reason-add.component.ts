import { Component, Inject, OnInit, Optional } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TBLShamelMergeServiceReason } from 'src/app/modules/shared/models/employees_department/TBLShamelMergeServiceReason';

@Component({
  selector: 'app-tbl-shamel-merge-service-reason-add',
  templateUrl: './tbl-shamel-merge-service-reason-add.component.html',
  styleUrls: ['./tbl-shamel-merge-service-reason-add.component.css']
})
export class TblShamelMergeServiceReasonAddComponent implements OnInit {
  myform: UntypedFormGroup;
  frm_MergeServiceReason_id : UntypedFormControl;
  frm_MergeServiceReason_name : UntypedFormControl;
  frm_fixed : UntypedFormControl;
  action:string;
  local_data:TBLShamelMergeServiceReason={};
  constructor(private frmBuilder:UntypedFormBuilder,
    public dialogRef: MatDialogRef<TblShamelMergeServiceReasonAddComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)  {
      this.myform=this.frmBuilder.group({});
      console.log(data);
      this.frm_MergeServiceReason_id= new UntypedFormControl('' ,[Validators.required ,Validators.maxLength(3)]),
      this.frm_MergeServiceReason_name= new UntypedFormControl('', [Validators.required, Validators.maxLength(50)])
      this.frm_fixed= new UntypedFormControl('0', [Validators.required, Validators.maxLength(1)])

      this.myform.addControl('MergeServiceReason_id',this.frm_MergeServiceReason_id);
      this.myform.addControl('MergeServiceReason_name',this.frm_MergeServiceReason_name);
      this.myform.addControl('fixed',this.frm_fixed);

    console.log(this.data);
      this.local_data.mergeservicereason_id = data.mergeservicereason_id;
      this.local_data.mergeservicereason_name = data.mergeservicereason_name;
      this.local_data.Fixed = data.Fixed;

      this.action = this.data.action;
      this.frm_MergeServiceReason_id.setValue(this.local_data.mergeservicereason_id );
      this.frm_MergeServiceReason_name.setValue(this.local_data.mergeservicereason_name );
      this.frm_fixed.setValue(this.local_data.Fixed );
      if(this.local_data.Fixed >0 )
      this.frm_fixed.setValue(true );
      else
      this.frm_fixed.setValue(false );

  }


  doAction(){
    let x: TBLShamelMergeServiceReason ={mergeservicereason_id:this.local_data.mergeservicereason_id,mergeservicereason_name:this.frm_MergeServiceReason_name.value,Fixed:this.frm_fixed.value == true?1:0};
//if(this.local_data.includes(this.frm_cur_name.toString())){
 // console.log(this.local_data.cur_name);
 // console.log(typeof x + "typeof this.local_data");

//}
//else{
    this.dialogRef.close({event:this.action,data:x});
 // }
}

  closeDialog(){
    this.dialogRef.close({event:'إلغاء'});
  }


  ngOnInit(): void {
  }

}


