import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITBLShamelPunishmentReason } from 'src/app/modules/shared/models/employees_department/ITBLShamelPunishmentReason';

@Component({
  selector: 'app-tbl-shamel-punishment-reason-add',
  templateUrl: './tbl-shamel-punishment-reason-add.component.html',
  styleUrls: ['./tbl-shamel-punishment-reason-add.component.scss']
})
export class TblShamelPunishmentReasonAddComponent implements OnInit {

  myform: FormGroup;
  frm_PunishmentReason_id : FormControl;
  frm_PunishmentReason_name : FormControl;
  frm_PunishmentReason_fixed : FormControl;
  action:string;
  local_data:ITBLShamelPunishmentReason={};
  constructor(private frmBuilder:FormBuilder,
    public dialogRef: MatDialogRef<TblShamelPunishmentReasonAddComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)  {
      this.myform=this.frmBuilder.group({});
      console.log(data);
      this.frm_PunishmentReason_id= new FormControl('' ,[Validators.required ,Validators.maxLength(3)]),
      this.frm_PunishmentReason_name= new FormControl('', [Validators.required, Validators.maxLength(50)])
      this.frm_PunishmentReason_fixed= new FormControl('0', [Validators.required, Validators.maxLength(1)])

      this.myform.addControl('PunishmentReason_id',this.frm_PunishmentReason_id);
      this.myform.addControl('PunishmentReason_name',this.frm_PunishmentReason_name);
      this.myform.addControl('PunishmentReason_fixed',this.frm_PunishmentReason_fixed);

    console.log(this.data);
      this.local_data.punishmentreason_id = data.punishmentreason_id;
      this.local_data.punishmentreason_name = data.punishmentreason_name;
      this.local_data.punishmentreason_fixed = data.punishmentreason_fixed;

      this.action = this.data.action;
      this.frm_PunishmentReason_id.setValue(this.local_data.punishmentreason_id );
      this.frm_PunishmentReason_name.setValue(this.local_data.punishmentreason_name );
      if(this.local_data.punishmentreason_fixed >0 )
      this.frm_PunishmentReason_fixed.setValue(true );
      else
      this.frm_PunishmentReason_fixed.setValue(false );

  }

  doAction(){
    let x: ITBLShamelPunishmentReason ={punishmentreason_id:this.local_data.punishmentreason_id,punishmentreason_name:this.frm_PunishmentReason_name.value,punishmentreason_fixed:this.frm_PunishmentReason_fixed.value == true?1:0};

    this.dialogRef.close({event:this.action,data:x});
}

  closeDialog(){
    this.dialogRef.close({event:'إلغاء'});
  }
  ngOnInit(): void {
  }

}
