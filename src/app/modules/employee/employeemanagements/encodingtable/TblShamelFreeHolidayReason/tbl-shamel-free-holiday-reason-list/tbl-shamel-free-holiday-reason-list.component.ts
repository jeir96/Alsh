import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ITBLShamelFreeHolidayReason } from 'src/app/modules/shared/models/employees_department/ITBLShamelFreeHolidayReason';
import { TBLShamelFreeHolidayReasonService } from 'src/app/modules/shared/services/employees_department/tblshamel-free-holiday-reason.service';
import { TblShamelFreeHolidayReasonAddComponent } from '../tbl-shamel-free-holiday-reason-add/tbl-shamel-free-holiday-reason-add.component';

@Component({
  selector: 'app-tbl-shamel-free-holiday-reason-list',
  templateUrl: './tbl-shamel-free-holiday-reason-list.component.html',
  styleUrls: ['./tbl-shamel-free-holiday-reason-list.component.scss']
})
export class TblShamelFreeHolidayReasonListComponent implements OnInit {

  ELEMENT_DATA: ITBLShamelFreeHolidayReason[] = [];
  dataSource = new MatTableDataSource<ITBLShamelFreeHolidayReason>();

 displayedColumns: string[] = ['freeholidayreason_id', 'freeholidayreason_name', 'freeholidayreason_fixed' ,'action'];

 @ViewChild(MatTable,{static:true}) mytable!: MatTable<any>;

 constructor(public dialog: MatDialog,
   private tBLShamelFreeHolidayReasonService:TBLShamelFreeHolidayReasonService) {
     if (tBLShamelFreeHolidayReasonService.List_TBLShamelFreeHolidayReason == null ||
      tBLShamelFreeHolidayReasonService.List_TBLShamelFreeHolidayReason.length ==0
     )
     tBLShamelFreeHolidayReasonService.fill();

     tBLShamelFreeHolidayReasonService.List_TBLShamelFreeHolidayReason_BehaviorSubject?.subscribe(
       data=>
       {
         this.ELEMENT_DATA = data;
         this.dataSource.data =this.ELEMENT_DATA;
       }
     )
   }


   RefreshDataSource()
   {
     this.tBLShamelFreeHolidayReasonService.fill();
   }

 openDialog(action: any,obj:any) {
  console.log(obj);

   obj.action = action;
   const dialogRef = this.dialog.open(TblShamelFreeHolidayReasonAddComponent, {
     width: '350px',
     data:obj
   });


   dialogRef.afterClosed().subscribe(result => {
     console.log(result);
     console.log(result.event);

     if(result.event == 'إضافة'){
       this.addFreeHolidayReason(result.data);
     }else if(result.event == 'تعديل'){
       this.updateFreeHolidayReason(result.data);
     }else if(result.event == 'حذف'){
       this.deleteFreeHolidayReason(result.data);
     }
   });
 }

 addFreeHolidayReason(obj: any){

   this.tBLShamelFreeHolidayReasonService.add(obj).subscribe
   (
     data=>
     {
       this.RefreshDataSource();
     }
   );

}





 updateFreeHolidayReason(obj: any){

   console.log(obj);
   this.tBLShamelFreeHolidayReasonService.update(obj).subscribe
   (
     data=>
     {
       this.RefreshDataSource();
     }
   );


 }
 deleteFreeHolidayReason(obj:any){
   this.tBLShamelFreeHolidayReasonService.delete(obj).subscribe
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
