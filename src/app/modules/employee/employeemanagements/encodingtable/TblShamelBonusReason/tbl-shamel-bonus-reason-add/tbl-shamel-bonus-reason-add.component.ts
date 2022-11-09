import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TBLShamelBonusReason } from 'src/app/modules/shared/models/employees_department/TBLShamelBonusReason';

@Component({
  selector: 'app-tbl-shamel-bonus-reason-add',
  templateUrl: './tbl-shamel-bonus-reason-add.component.html',
  styleUrls: ['./tbl-shamel-bonus-reason-add.component.scss']
})
export class TblShamelBonusReasonAddComponent implements OnInit {

  myform: FormGroup;
  frm_BonusReason_id : FormControl;
  frm_BonusReason_name : FormControl;
  frm_BonusReason_fixed : FormControl;
  action:string;
  local_data:TBLShamelBonusReason={};
  constructor(private frmBuilder:FormBuilder,
    public dialogRef: MatDialogRef<TblShamelBonusReasonAddComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)  {
      this.myform=this.frmBuilder.group({});
      console.log(data);
      this.frm_BonusReason_id= new FormControl('' ,[Validators.required ,Validators.maxLength(3)]),
      this.frm_BonusReason_name= new FormControl('', [Validators.required, Validators.maxLength(50)])
      this.frm_BonusReason_fixed= new FormControl('0', [Validators.required, Validators.maxLength(1)])

      this.myform.addControl('BonusReason_id',this.frm_BonusReason_id);
      this.myform.addControl('BonusReason_name',this.frm_BonusReason_name);
      this.myform.addControl('BonusReason_fixed',this.frm_BonusReason_fixed);

    console.log(this.data);
      this.local_data.bonusreason_id = data.bonusreason_id;
      this.local_data.bonusreason_name = data.bonusreason_name;
      this.local_data.bonusreason_fixed = data.bonusreason_fixed;

      this.action = this.data.action;
      this.frm_BonusReason_id.setValue(this.local_data.bonusreason_id );
      this.frm_BonusReason_name.setValue(this.local_data.bonusreason_name );
      if(this.local_data.bonusreason_fixed >0 )
      this.frm_BonusReason_fixed.setValue(true );
      else
      this.frm_BonusReason_fixed.setValue(false );

  }

  doAction(){
    let x: TBLShamelBonusReason ={bonusreason_id:this.local_data.bonusreason_id,bonusreason_name:this.frm_BonusReason_name.value,bonusreason_fixed:this.frm_BonusReason_fixed.value == true?1:0};

    this.dialogRef.close({event:this.action,data:x});
}

  closeDialog(){
    this.dialogRef.close({event:'إلغاء'});
  }
  ngOnInit(): void {
  }

}
