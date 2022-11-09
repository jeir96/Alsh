import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITBLShamelCardPages } from 'src/app/modules/shared/models/employees_department/ITBLShamelCardPages';

@Component({
  selector: 'app-tblshamel-card-pages-add',
  templateUrl: './tblshamel-card-pages-add.component.html',
  styleUrls: ['./tblshamel-card-pages-add.component.scss']
})
export class TBLShamelCardPagesAddComponent implements OnInit {

  myform: FormGroup;
  frm_Serial : FormControl;
  frm_TotalCount : FormControl;
  action:string;
  local_data:ITBLShamelCardPages={};
  constructor(private frmBuilder:FormBuilder,
    public dialogRef: MatDialogRef<TBLShamelCardPagesAddComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)  {
      this.myform=this.frmBuilder.group({});
      console.log(data);
      this.frm_Serial= new FormControl('' ,[Validators.required ,Validators.maxLength(3)]),
      this.frm_TotalCount= new FormControl('', [Validators.required, Validators.maxLength(3)])

      this.myform.addControl('Serial',this.frm_Serial);
      this.myform.addControl('TotalCount',this.frm_TotalCount);

    console.log(this.data);
      this.local_data.Serial = data.Serial;
      this.local_data.TotalCount = data.TotalCount;

      this.action = this.data.action;
      this.frm_Serial.setValue(this.local_data.Serial );
      this.frm_TotalCount.setValue(this.local_data.TotalCount );


  }

  doAction(){
    let x: ITBLShamelCardPages ={Serial:this.local_data.Serial,TotalCount:this.frm_TotalCount.value};

    this.dialogRef.close({event:this.action,data:x});
}

  closeDialog(){
    this.dialogRef.close({event:'إلغاء'});
  }
  ngOnInit(): void {
  }

}
