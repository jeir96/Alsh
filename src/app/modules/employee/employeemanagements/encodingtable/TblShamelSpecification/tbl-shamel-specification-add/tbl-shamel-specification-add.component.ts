import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITBLShamelSpecification } from 'src/app/modules/shared/models/employees_department/ITBLShamelSpecification';

@Component({
  selector: 'app-tbl-shamel-specification-add',
  templateUrl: './tbl-shamel-specification-add.component.html',
  styleUrls: ['./tbl-shamel-specification-add.component.scss']
})
export class TblShamelSpecificationAddComponent implements OnInit {

  myform: FormGroup;
  frm_Specification_id : FormControl;
  frm_Specification_name : FormControl;
  frm_Specification_fixed : FormControl;
  action:string;
  local_data:ITBLShamelSpecification={};
  constructor(private frmBuilder:FormBuilder,
    public dialogRef: MatDialogRef<TblShamelSpecificationAddComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)  {
      this.myform=this.frmBuilder.group({});
      console.log(data);
      this.frm_Specification_id= new FormControl('' ,[Validators.required ,Validators.maxLength(3)]),
      this.frm_Specification_name= new FormControl('', [Validators.required, Validators.maxLength(50)])
      this.frm_Specification_fixed= new FormControl('0', [Validators.required, Validators.maxLength(1)])

      this.myform.addControl('Specification_id',this.frm_Specification_id);
      this.myform.addControl('Specification_name',this.frm_Specification_name);
      this.myform.addControl('Specification_fixed',this.frm_Specification_fixed);

    console.log(this.data);
      this.local_data.specification_id = data.specification_id;
      this.local_data.specification_name = data.specification_name;
      this.local_data.specification_fixed = data.specification_fixed;

      this.action = this.data.action;
      this.frm_Specification_id.setValue(this.local_data.specification_id );
      this.frm_Specification_name.setValue(this.local_data.specification_name );
      if(this.local_data.specification_fixed >0 )
      this.frm_Specification_fixed.setValue(true );
      else
      this.frm_Specification_fixed.setValue(false );

  }

  doAction(){
    let x: ITBLShamelSpecification ={specification_id:this.local_data.specification_id,specification_name:this.frm_Specification_name.value,specification_fixed:this.frm_Specification_fixed.value == true?1:0};

    this.dialogRef.close({event:this.action,data:x});
}

  closeDialog(){
    this.dialogRef.close({event:'إلغاء'});
  }
  ngOnInit(): void {
  }

}
