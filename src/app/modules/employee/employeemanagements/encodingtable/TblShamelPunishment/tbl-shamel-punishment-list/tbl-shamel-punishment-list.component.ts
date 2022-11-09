import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ITBLShamelPunishment } from 'src/app/modules/shared/models/employees_department/ITBLShamelPunishment';
import { TBLShamelPunishmentService } from 'src/app/modules/shared/services/employees_department/tblshamel-punishment.service';
import { TblShamelPunishmentAddComponent } from '../tbl-shamel-punishment-add/tbl-shamel-punishment-add.component';

@Component({
  selector: 'app-tbl-shamel-punishment-list',
  templateUrl: './tbl-shamel-punishment-list.component.html',
  styleUrls: ['./tbl-shamel-punishment-list.component.scss']
})
export class TblShamelPunishmentListComponent implements OnInit {

  ELEMENT_DATA: ITBLShamelPunishment[] = [];
  dataSource = new MatTableDataSource<ITBLShamelPunishment>();

 displayedColumns: string[] = ['punishment_id', 'punishment_name', 'punishment_fixed' ,'action'];

 @ViewChild(MatTable,{static:true}) mytable!: MatTable<any>;

 constructor(public dialog: MatDialog,
   private tBLShamelPunishmentService:TBLShamelPunishmentService) {
     if (tBLShamelPunishmentService.List_ITBLShamelPunishment == null ||
      tBLShamelPunishmentService.List_ITBLShamelPunishment.length ==0
     )
     tBLShamelPunishmentService.fill();

     tBLShamelPunishmentService.List_ITBLShamelPunishment_BehaviorSubject?.subscribe(
       data=>
       {
         this.ELEMENT_DATA = data;
         this.dataSource.data =this.ELEMENT_DATA;
       }
     )
   }


   RefreshDataSource()
   {
     this.tBLShamelPunishmentService.fill();
   }

 openDialog(action: any,obj:any) {
  console.log(obj);

   obj.action = action;
   const dialogRef = this.dialog.open(TblShamelPunishmentAddComponent, {
     width: '350px',
     data:obj
   });


   dialogRef.afterClosed().subscribe(result => {
     console.log(result);
     console.log(result.event);

     if(result.event == 'إضافة'){
       this.addPunishment(result.data);
     }else if(result.event == 'تعديل'){
       this.updatePunishment(result.data);
     }else if(result.event == 'حذف'){
       this.deletePunishment(result.data);
     }
   });
 }

 addPunishment(obj: any){

   this.tBLShamelPunishmentService.add(obj).subscribe
   (
     data=>
     {
       this.RefreshDataSource();
     }
   );

}





 updatePunishment(obj: any){

   console.log(obj);
   this.tBLShamelPunishmentService.update(obj).subscribe
   (
     data=>
     {
       this.RefreshDataSource();
     }
   );


 }
 deletePunishment(obj:any){
   this.tBLShamelPunishmentService.delete(obj).subscribe
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
