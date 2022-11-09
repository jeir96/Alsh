import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITBLShamelFreeHolidayReason } from 'src/app/modules/shared/models/employees_department/ITBLShamelFreeHolidayReason';

@Component({
  selector: 'app-tbl-shamel-free-holiday-reason-add',
  templateUrl: './tbl-shamel-free-holiday-reason-add.component.html',
  styleUrls: ['./tbl-shamel-free-holiday-reason-add.component.scss']
})
export class TblShamelFreeHolidayReasonAddComponent implements OnInit {

  myform: FormGroup;
  frm_FreeHolidayReason_id : FormControl;
  frm_FreeHolidayReason_name : FormControl;
  frm_FreeHolidayReason_fixed : FormControl;
  action:string;
  local_data:ITBLShamelFreeHolidayReason={};
  constructor(private frmBuilder:FormBuilder,
    public dialogRef: MatDialogRef<TblShamelFreeHolidayReasonAddComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)  {
      this.myform=this.frmBuilder.group({});
      console.log(data);
      this.frm_FreeHolidayReason_id= new FormControl('' ,[Validators.required ,Validators.maxLength(3)]),
      this.frm_FreeHolidayReason_name= new FormControl('', [Validators.required, Validators.maxLength(50)])
      this.frm_FreeHolidayReason_fixed= new FormControl('0', [Validators.required, Validators.maxLength(1)])

      this.myform.addControl('FreeHolidayReason_id',this.frm_FreeHolidayReason_id);
      this.myform.addControl('FreeHolidayReason_name',this.frm_FreeHolidayReason_name);
      this.myform.addControl('FreeHolidayReason_fixed',this.frm_FreeHolidayReason_fixed);

    console.log(this.data);
      this.local_data.freeholidayreason_id = data.freeholidayreason_id;
      this.local_data.freeholidayreason_name = data.freeholidayreason_name;
      this.local_data.freeholidayreason_fixed = data.freeholidayreason_fixed;

      this.action = this.data.action;
      this.frm_FreeHolidayReason_id.setValue(this.local_data.freeholidayreason_id );
      this.frm_FreeHolidayReason_name.setValue(this.local_data.freeholidayreason_name );
      if(this.local_data.freeholidayreason_fixed >0 )
      this.frm_FreeHolidayReason_fixed.setValue(true );
      else
      this.frm_FreeHolidayReason_fixed.setValue(false );

  }

  doAction(){
    let x: ITBLShamelFreeHolidayReason ={freeholidayreason_id:this.local_data.freeholidayreason_id,freeholidayreason_name:this.frm_FreeHolidayReason_name.value,freeholidayreason_fixed:this.frm_FreeHolidayReason_fixed.value == true?1:0};

    this.dialogRef.close({event:this.action,data:x});
}

  closeDialog(){
    this.dialogRef.close({event:'إلغاء'});
  }
  ngOnInit(): void {
  }

}
