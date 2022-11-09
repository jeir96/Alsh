import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ITBLShamelPunishmentReason } from 'src/app/modules/shared/models/employees_department/ITBLShamelPunishmentReason';
import { TBLShamelPunishmentReasonService } from 'src/app/modules/shared/services/employees_department/tblshamel-punishment-reason.service';
import { TblShamelPunishmentReasonAddComponent } from '../tbl-shamel-punishment-reason-add/tbl-shamel-punishment-reason-add.component';

@Component({
  selector: 'app-tbl-shamel-punishment-reason-list',
  templateUrl: './tbl-shamel-punishment-reason-list.component.html',
  styleUrls: ['./tbl-shamel-punishment-reason-list.component.scss']
})
export class TblShamelPunishmentReasonListComponent implements OnInit {

  ELEMENT_DATA: ITBLShamelPunishmentReason[] = [];
  dataSource = new MatTableDataSource<ITBLShamelPunishmentReason>();

 displayedColumns: string[] = ['punishmentreason_id', 'punishmentreason_name', 'punishmentreason_fixed' ,'action'];

 @ViewChild(MatTable,{static:true}) mytable!: MatTable<any>;

 constructor(public dialog: MatDialog,
   private tBLShamelPunishmentReasonService:TBLShamelPunishmentReasonService) {
     if (tBLShamelPunishmentReasonService.List_ITBLShamelPunishmentReason == null ||
      tBLShamelPunishmentReasonService.List_ITBLShamelPunishmentReason.length ==0
     )
     tBLShamelPunishmentReasonService.fill();

     tBLShamelPunishmentReasonService.List_ITBLShamelPunishmentReason_BehaviorSubject?.subscribe(
       data=>
       {
         this.ELEMENT_DATA = data;
         this.dataSource.data =this.ELEMENT_DATA;
       }
     )
   }


   RefreshDataSource()
   {
     this.tBLShamelPunishmentReasonService.fill();
   }

 openDialog(action: any,obj:any) {
  console.log(obj);

   obj.action = action;
   const dialogRef = this.dialog.open(TblShamelPunishmentReasonAddComponent, {
     width: '350px',
     data:obj
   });


   dialogRef.afterClosed().subscribe(result => {
     console.log(result);
     console.log(result.event);

     if(result.event == 'إضافة'){
       this.addPunishmentReason(result.data);
     }else if(result.event == 'تعديل'){
       this.updatePunishmentReason(result.data);
     }else if(result.event == 'حذف'){
       this.deletePunishmentReason(result.data);
     }
   });
 }

 addPunishmentReason(obj: any){

   this.tBLShamelPunishmentReasonService.add(obj).subscribe
   (
     data=>
     {
       this.RefreshDataSource();
     }
   );

}





 updatePunishmentReason(obj: any){

   console.log(obj);
   this.tBLShamelPunishmentReasonService.update(obj).subscribe
   (
     data=>
     {
       this.RefreshDataSource();
     }
   );


 }
 deletePunishmentReason(obj:any){
   this.tBLShamelPunishmentReasonService.delete(obj).subscribe
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
