import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource, MatTable } from "@angular/material/table";
import { ITBLShamelCardPages } from "src/app/modules/shared/models/employees_department/ITBLShamelCardPages";
import { TBLShamelCardPagesService } from "src/app/modules/shared/services/employees_department/tblshamel-card-pages.service";

@Component({
  selector: 'app-tblshamel-card-pages-list',
  templateUrl: './tblshamel-card-pages-list.component.html',
  styleUrls: ['./tblshamel-card-pages-list.component.scss']
})
export class TBLShamelCardPagesListComponent implements OnInit {

  ELEMENT_DATA: ITBLShamelCardPages[] = [];
  dataSource = new MatTableDataSource<ITBLShamelCardPages>();

 displayedColumns: string[] = ['Serial', 'TotalCount' ,'action'];

 @ViewChild(MatTable,{static:true}) mytable!: MatTable<any>;

 constructor(public dialog: MatDialog,
   private tBLShamelCardPagesService:TBLShamelCardPagesService) {
     if (tBLShamelCardPagesService.List_ITBLShamelCardPages == null ||
      tBLShamelCardPagesService.List_ITBLShamelCardPages.length ==0
     )
     tBLShamelCardPagesService.fill();

     tBLShamelCardPagesService.List_ITBLShamelCardPages_BehaviorSubject?.subscribe(
       data=>
       {
         this.ELEMENT_DATA = data;
         this.dataSource.data =this.ELEMENT_DATA;
       }
     )
   }


   RefreshDataSource()
   {
     this.tBLShamelCardPagesService.fill();
   }

 openDialog(action: any,obj:any) {
  console.log(obj);

   obj.action = action;
   const dialogRef = this.dialog.open(TBLShamelCardPagesListComponent, {
     width: '350px',
     data:obj
   });


   dialogRef.afterClosed().subscribe(result => {
     console.log(result);
     console.log(result.event);

     if(result.event == 'إضافة'){
       this.addCardPages(result.data);
     }else if(result.event == 'تعديل'){
       this.updateCardPages(result.data);
     }else if(result.event == 'حذف'){
       this.deleteCardPages(result.data);
     }
   });
 }

 addCardPages(obj: any){

   this.tBLShamelCardPagesService.add(obj).subscribe
   (
     data=>
     {
       this.RefreshDataSource();
     }
   );

}





 updateCardPages(obj: any){

   console.log(obj);
   this.tBLShamelCardPagesService.update(obj).subscribe
   (
     data=>
     {
       this.RefreshDataSource();
     }
   );


 }
 deleteCardPages(obj:any){
   this.tBLShamelCardPagesService.delete(obj).subscribe
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
