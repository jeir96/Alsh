import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TBLShamelBonusReason } from 'src/app/modules/shared/models/employees_department/TBLShamelBonusReason';
import { TBLShamelBonusReasonService } from 'src/app/modules/shared/services/employees_department/tblshamel-bonus-reason.service';
import { TblShamelBonusReasonAddComponent } from '../tbl-shamel-bonus-reason-add/tbl-shamel-bonus-reason-add.component';

@Component({
  selector: 'app-tbl-shamel-bonus-reason-list',
  templateUrl: './tbl-shamel-bonus-reason-list.component.html',
  styleUrls: ['./tbl-shamel-bonus-reason-list.component.scss']
})
export class TblShamelBonusReasonListComponent implements OnInit {

  ELEMENT_DATA: TBLShamelBonusReason[] = [];
  dataSource = new MatTableDataSource<TBLShamelBonusReason>();

 displayedColumns: string[] = ['bonusreason_id', 'bonusreason_name', 'bonusreason_fixed' ,'action'];

 @ViewChild(MatTable,{static:true}) mytable!: MatTable<any>;

 constructor(public dialog: MatDialog,
   private tBLShamelBonusReasonService:TBLShamelBonusReasonService) {
     if (tBLShamelBonusReasonService.List_TBLShamelBonusReason == null ||
      tBLShamelBonusReasonService.List_TBLShamelBonusReason.length ==0
     )
     tBLShamelBonusReasonService.fill();

     tBLShamelBonusReasonService.List_TBLShamelBonusReason_BehaviorSubject?.subscribe(
       data=>
       {
         this.ELEMENT_DATA = data;
         this.dataSource.data =this.ELEMENT_DATA;
       }
     )
   }


   RefreshDataSource()
   {
     this.tBLShamelBonusReasonService.fill();
   }

 openDialog(action: any,obj:any) {
  console.log(obj);

   obj.action = action;
   const dialogRef = this.dialog.open(TblShamelBonusReasonAddComponent, {
     width: '350px',
     data:obj
   });


   dialogRef.afterClosed().subscribe(result => {
     console.log(result);
     console.log(result.event);

     if(result.event == 'إضافة'){
       this.addBonusReason(result.data);
     }else if(result.event == 'تعديل'){
       this.updateBonusReason(result.data);
     }else if(result.event == 'حذف'){
       this.deleteBonusReason(result.data);
     }
   });
 }

 addBonusReason(obj: any){

   this.tBLShamelBonusReasonService.add(obj).subscribe
   (
     data=>
     {
       this.RefreshDataSource();
     }
   );

}





 updateBonusReason(obj: any){

   console.log(obj);
   this.tBLShamelBonusReasonService.update(obj).subscribe
   (
     data=>
     {
       this.RefreshDataSource();
     }
   );


 }
 deleteBonusReason(obj:any){
   this.tBLShamelBonusReasonService.delete(obj).subscribe
   (
     data=>
     {
       this.RefreshDataSource();
     }
   );


 }
  ngOnInit(): void {
  }

}
