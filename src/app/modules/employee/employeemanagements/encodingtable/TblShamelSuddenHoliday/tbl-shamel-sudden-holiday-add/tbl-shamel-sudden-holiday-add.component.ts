import { Component, OnInit, Optional, Inject } from "@angular/core";
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TBLShamelSuddenHoliday } from "src/app/modules/shared/models/employees_department/TBLShamelSuddenHoliday";

@Component({
  selector: 'app-tbl-shamel-sudden-holiday-add',
  templateUrl: './tbl-shamel-sudden-holiday-add.component.html',
  styleUrls: ['./tbl-shamel-sudden-holiday-add.component.css']

})
export class TblShamelSuddenHolidayAddComponent implements OnInit {

  myform: UntypedFormGroup;
  frm_SuddenHoliday_id : UntypedFormControl;
  frm_SuddenHoliday_name : UntypedFormControl;
  frm_fixed : UntypedFormControl;

  action:string;

  local_data:TBLShamelSuddenHoliday={suddenholiday_id:0,suddenholiday_name:'',Fixed:0};

  constructor(private frmBuilder:UntypedFormBuilder,
    public dialogRef: MatDialogRef<TblShamelSuddenHolidayAddComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)  {
      this.myform=this.frmBuilder.group({});
      console.log(data);
      this.frm_SuddenHoliday_id= new UntypedFormControl('' ,[Validators.required ,Validators.maxLength(3)]),
      this.frm_SuddenHoliday_name= new UntypedFormControl('', [Validators.required, Validators.maxLength(50)])
      this.frm_fixed= new UntypedFormControl('0', [Validators.required, Validators.maxLength(1)])

      this.myform.addControl('SuddenHoliday_id',this.frm_SuddenHoliday_id);
      this.myform.addControl('SuddenHoliday_name',this.frm_SuddenHoliday_name);
      this.myform.addControl('fixed',this.frm_fixed);

      if (data!= null )
{


      this.local_data.suddenholiday_id = data.suddenholiday_id;
      this.local_data.suddenholiday_name = data.suddenholiday_name;
      this.local_data.Fixed = data.Fixed;

      this.action = this.data.action;
      this.frm_SuddenHoliday_id.setValue(this.local_data.suddenholiday_id );
      this.frm_SuddenHoliday_name.setValue(this.local_data.suddenholiday_name );
      if(this.local_data.Fixed >0 )
      this.frm_fixed.setValue(true );
      else
      this.frm_fixed.setValue(false );
    }
  }

  doAction(){
    let x: TBLShamelSuddenHoliday ={suddenholiday_id:this.local_data.suddenholiday_id,suddenholiday_name:this.frm_SuddenHoliday_name.value,Fixed:this.frm_fixed.value == true?1:0};

    console.log(x);
    this.dialogRef.close({event:this.action,data:x});
}

  closeDialog(){
    this.dialogRef.close({event:'إلغاء'});
  }


  ngOnInit(): void {
  }

}
