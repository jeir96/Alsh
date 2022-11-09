import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITBLShamelRank } from 'src/app/modules/shared/models/employees_department/ITBLShamelRank';

@Component({
  selector: 'app-tbl-shamel-rank-add',
  templateUrl: './tbl-shamel-rank-add.component.html',
  styleUrls: ['./tbl-shamel-rank-add.component.scss']
})
export class TblShamelRankAddComponent implements OnInit {

  myform: FormGroup;
  frm_Rank_id : FormControl;
  frm_Rank_name : FormControl;
  frm_Rank_fixed : FormControl;

  action:string;

  local_data:ITBLShamelRank={rank_id:0,rank_name:'',rank_fixed:0};

  constructor(private frmBuilder:FormBuilder,
    public dialogRef: MatDialogRef<TblShamelRankAddComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)  {
      this.myform=this.frmBuilder.group({});
      console.log(data);
      this.frm_Rank_id= new FormControl('' ,[Validators.required ,Validators.maxLength(3)]),
      this.frm_Rank_name= new FormControl('', [Validators.required, Validators.maxLength(50)])
      this.frm_Rank_fixed= new FormControl('0', [Validators.required, Validators.maxLength(1)])

      this.myform.addControl('Rank_id',this.frm_Rank_id);
      this.myform.addControl('Rank_name',this.frm_Rank_name);
      this.myform.addControl('Rank_fixed',this.frm_Rank_fixed);

      if (data!= null )
{


      this.local_data.rank_id = data.rank_id;
      this.local_data.rank_name = data.rank_name;
      this.local_data.rank_fixed = data.rank_fixed;

      this.action = this.data.action;
      this.frm_Rank_id.setValue(this.local_data.rank_id );
      this.frm_Rank_name.setValue(this.local_data.rank_name );
      if(this.local_data.rank_fixed >0 )
      this.frm_Rank_fixed.setValue(true );
      else
      this.frm_Rank_fixed.setValue(false );
    }
  }

  doAction(){
    let x: ITBLShamelRank ={rank_id:this.local_data.rank_id,rank_name:this.frm_Rank_name.value,rank_fixed:this.frm_Rank_fixed.value == true?1:0};

    console.log(x);
    this.dialogRef.close({event:this.action,data:x});
}

  closeDialog(){
    this.dialogRef.close({event:'إلغاء'});
  }

  ngOnInit(): void {
  }

}
