import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TBLShamelBonus } from 'src/app/modules/shared/models/employees_department/TBLShamelBonus';

@Component({
  selector: 'app-tbl-shamel-bonus-add',
  templateUrl: './tbl-shamel-bonus-add.component.html',
  styleUrls: ['./tbl-shamel-bonus-add.component.scss']
})
export class TblShamelBonusAddComponent implements OnInit {

  myform: FormGroup;
  frm_Bonus_id : FormControl;
  frm_Bonus_name : FormControl;
  frm_Bonus_fixed : FormControl;
  action:string;
  local_data:TBLShamelBonus={
    bonus_id: 0,
    bonus_name: '',
    bonus_fixed: 0
  };
  constructor(private frmBuilder:FormBuilder,
    public dialogRef: MatDialogRef<TblShamelBonusAddComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)  {
      this.myform=this.frmBuilder.group({});
      console.log(data);
      this.frm_Bonus_id= new FormControl('' ,[Validators.required ,Validators.maxLength(3)]),
      this.frm_Bonus_name= new FormControl('', [Validators.required, Validators.maxLength(50)])
      this.frm_Bonus_fixed= new FormControl('0', [Validators.required, Validators.maxLength(1)])

      this.myform.addControl('Bonus_id',this.frm_Bonus_id);
      this.myform.addControl('Bonus_name',this.frm_Bonus_name);
      this.myform.addControl('Bonus_fixed',this.frm_Bonus_fixed);

    console.log(this.data);
      this.local_data.bonus_id = data.bonus_id;
      this.local_data.bonus_name = data.bonus_name;
      this.local_data.bonus_fixed = data.bonus_fixed;

      this.action = this.data.action;
      this.frm_Bonus_id.setValue(this.local_data.bonus_id );
      this.frm_Bonus_name.setValue(this.local_data.bonus_name );
      if(this.local_data.bonus_fixed >0 )
      this.frm_Bonus_fixed.setValue(true );
      else
      this.frm_Bonus_fixed.setValue(false );

  }

  doAction(){
    let x: TBLShamelBonus ={bonus_id:this.local_data.bonus_id,bonus_name:this.frm_Bonus_name.value,bonus_fixed:this.frm_Bonus_fixed.value == true?1:0};

    this.dialogRef.close({event:this.action,data:x});
}

  closeDialog(){
    this.dialogRef.close({event:'إلغاء'});
  }
  ngOnInit(): void {
  }

}
