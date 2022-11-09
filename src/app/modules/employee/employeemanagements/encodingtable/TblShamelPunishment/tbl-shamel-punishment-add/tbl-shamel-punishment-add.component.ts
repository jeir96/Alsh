import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITBLShamelPunishment } from 'src/app/modules/shared/models/employees_department/ITBLShamelPunishment';

@Component({
  selector: 'app-tbl-shamel-punishment-add',
  templateUrl: './tbl-shamel-punishment-add.component.html',
  styleUrls: ['./tbl-shamel-punishment-add.component.scss']
})
export class TblShamelPunishmentAddComponent implements OnInit {

  myform: FormGroup;
  frm_Punishment_id : FormControl;
  frm_Punishment_name : FormControl;
  frm_Punishment_fixed : FormControl;
  action:string;
  local_data:ITBLShamelPunishment={};
  constructor(private frmBuilder:FormBuilder,
    public dialogRef: MatDialogRef<TblShamelPunishmentAddComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)  {
      this.myform=this.frmBuilder.group({});
      console.log(data);
      this.frm_Punishment_id= new FormControl('' ,[Validators.required ,Validators.maxLength(3)]),
      this.frm_Punishment_name= new FormControl('', [Validators.required, Validators.maxLength(50)])
      this.frm_Punishment_fixed= new FormControl('0', [Validators.required, Validators.maxLength(1)])

      this.myform.addControl('Punishment_id',this.frm_Punishment_id);
      this.myform.addControl('Punishment_name',this.frm_Punishment_name);
      this.myform.addControl('Punishment_fixed',this.frm_Punishment_fixed);

    console.log(this.data);
      this.local_data.punishment_id = data.punishment_id;
      this.local_data.punishment_name = data.punishment_name;
      this.local_data.punishment_fixed = data.punishment_fixed;

      this.action = this.data.action;
      this.frm_Punishment_id.setValue(this.local_data.punishment_id );
      this.frm_Punishment_name.setValue(this.local_data.punishment_name );
      if(this.local_data.punishment_fixed >0 )
      this.frm_Punishment_fixed.setValue(true );
      else
      this.frm_Punishment_fixed.setValue(false );

  }

  doAction(){
    let x: ITBLShamelPunishment ={punishment_id:this.local_data.punishment_id,punishment_name:this.frm_Punishment_name.value,punishment_fixed:this.frm_Punishment_fixed.value == true?1:0};

    this.dialogRef.close({event:this.action,data:x});
}

  closeDialog(){
    this.dialogRef.close({event:'إلغاء'});
  }
  ngOnInit(): void {
  }

}
