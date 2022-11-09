import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITBLShamelDepartment } from 'src/app/modules/shared/models/employees_department/ITBLShamelDepartment';

@Component({
  selector: 'app-tbl-shamel-department-add',
  templateUrl: './tbl-shamel-department-add.component.html',
  styleUrls: ['./tbl-shamel-department-add.component.scss']
})
export class TblShamelDepartmentAddComponent implements OnInit {

  myform: FormGroup;
  frm_Department_id : FormControl;
  frm_Department_name : FormControl;
  frm_Department_fixed : FormControl;
  action:string;
  local_data:ITBLShamelDepartment={};
  constructor(private frmBuilder:FormBuilder,
    public dialogRef: MatDialogRef<TblShamelDepartmentAddComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)  {
      this.myform=this.frmBuilder.group({});
      console.log(data);
      this.frm_Department_id= new FormControl('' ,[Validators.required ,Validators.maxLength(3)]),
      this.frm_Department_name= new FormControl('', [Validators.required, Validators.maxLength(50)])
      this.frm_Department_fixed= new FormControl('0', [Validators.required, Validators.maxLength(1)])

      this.myform.addControl('Department_id',this.frm_Department_id);
      this.myform.addControl('Department_name',this.frm_Department_name);
      this.myform.addControl('Department_fixed',this.frm_Department_fixed);

    console.log(this.data);
      this.local_data.department_id = data.department_id;
      this.local_data.department_name = data.department_name;
      this.local_data.department_fixed = data.department_fixed;

      this.action = this.data.action;
      this.frm_Department_id.setValue(this.local_data.department_id );
      this.frm_Department_name.setValue(this.local_data.department_name );
      if(this.local_data.department_fixed >0 )
      this.frm_Department_fixed.setValue(true );
      else
      this.frm_Department_fixed.setValue(false );

  }

  doAction(){
    let x: ITBLShamelDepartment ={department_id:this.local_data.department_id,department_name:this.frm_Department_name.value,department_fixed:this.frm_Department_fixed.value == true?1:0};

    this.dialogRef.close({event:this.action,data:x});
}

  closeDialog(){
    this.dialogRef.close({event:'إلغاء'});
  }
  ngOnInit(): void {
  }

}
