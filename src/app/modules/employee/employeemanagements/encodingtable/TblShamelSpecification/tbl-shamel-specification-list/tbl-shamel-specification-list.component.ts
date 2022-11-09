import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ITBLShamelSpecification } from 'src/app/modules/shared/models/employees_department/ITBLShamelSpecification';
import { TblshamelspecificationService } from 'src/app/modules/shared/services/employees_department/tblshamelspecification.service';
import { TblShamelSpecificationAddComponent } from '../tbl-shamel-specification-add/tbl-shamel-specification-add.component';

@Component({
  selector: 'app-tbl-shamel-specification-list',
  templateUrl: './tbl-shamel-specification-list.component.html',
  styleUrls: ['./tbl-shamel-specification-list.component.scss']
})
export class TblShamelSpecificationListComponent implements OnInit {

  ELEMENT_DATA: ITBLShamelSpecification[] = [];
  dataSource = new MatTableDataSource<ITBLShamelSpecification>();

 displayedColumns: string[] = ['specification_id', 'specification_name', 'specification_fixed' ,'action'];

 @ViewChild(MatTable,{static:true}) mytable!: MatTable<any>;

 constructor(public dialog: MatDialog,
   private tBLShamelSpecificationService:TblshamelspecificationService) {
     if (tBLShamelSpecificationService.list_TBLShamelSpecification == null ||
       tBLShamelSpecificationService.list_TBLShamelSpecification.length ==0
     )
     tBLShamelSpecificationService.fill();

     tBLShamelSpecificationService.List_TBLShamelSpecification_BehaviorSubject?.subscribe(
       data=>
       {
         this.ELEMENT_DATA = data;
         this.dataSource.data =this.ELEMENT_DATA;
       }
     )
   }


   RefreshDataSource()
   {
     this.tBLShamelSpecificationService.fill();
   }

 openDialog(action: any,obj:any) {
  console.log(obj);

   obj.action = action;
   const dialogRef = this.dialog.open(TblShamelSpecificationAddComponent, {
     width: '350px',
     data:obj
   });


   dialogRef.afterClosed().subscribe(result => {
     console.log(result);
     console.log(result.event);

     if(result.event == 'إضافة'){
       this.addSpecification(result.data);
     }else if(result.event == 'تعديل'){
       this.updateSpecification(result.data);
     }else if(result.event == 'حذف'){
       this.deleteSpecification(result.data);
     }
   });
 }

 addSpecification(obj: any){

   this.tBLShamelSpecificationService.add(obj).subscribe
   (
     data=>
     {
       this.RefreshDataSource();
     }
   );

}





 updateSpecification(obj: any){

   console.log(obj);
   this.tBLShamelSpecificationService.update(obj).subscribe
   (
     data=>
     {
       this.RefreshDataSource();
     }
   );


 }
 deleteSpecification(obj:any){
   this.tBLShamelSpecificationService.delete(obj).subscribe
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
