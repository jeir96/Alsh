import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ITBLShamelDepartment } from 'src/app/modules/shared/models/employees_department/ITBLShamelDepartment';
import { TblshameldepartmentService } from 'src/app/modules/shared/services/employees_department/tblshameldepartment.service';
import { TblShamelDepartmentAddComponent } from '../tbl-shamel-department-add/tbl-shamel-department-add.component';

@Component({
  selector: 'app-tbl-shamel-department-list',
  templateUrl: './tbl-shamel-department-list.component.html',
  styleUrls: ['./tbl-shamel-department-list.component.scss']
})
export class TblShamelDepartmentListComponent implements OnInit {

  ELEMENT_DATA: ITBLShamelDepartment[] = [];
  dataSource = new MatTableDataSource<ITBLShamelDepartment>();

 displayedColumns: string[] = ['department_id', 'department_name', 'department_fixed' ,'action'];

 @ViewChild(MatTable,{static:true}) mytable!: MatTable<any>;

 constructor(public dialog: MatDialog,
   private tBLShamelDepartmentService:TblshameldepartmentService) {
     if (tBLShamelDepartmentService.List_ITBLShamelDepartment == null ||
      tBLShamelDepartmentService.List_ITBLShamelDepartment.length ==0
     )
     tBLShamelDepartmentService.fill();

     tBLShamelDepartmentService.List_ITBLShamelDepartment_BehaviorSubject?.subscribe(
       data=>
       {
         this.ELEMENT_DATA = data;
         this.dataSource.data =this.ELEMENT_DATA;
       }
     )
   }


   RefreshDataSource()
   {
     this.tBLShamelDepartmentService.fill();
   }

 openDialog(action: any,obj:any) {
  console.log(obj);

   obj.action = action;
   const dialogRef = this.dialog.open(TblShamelDepartmentAddComponent, {
     width: '350px',
     data:obj
   });


   dialogRef.afterClosed().subscribe(result => {
     console.log(result);
     console.log(result.event);

     if(result.event == 'إضافة'){
       this.addDepartment(result.data);
     }else if(result.event == 'تعديل'){
       this.updateDepartment(result.data);
     }else if(result.event == 'حذف'){
       this.deleteDepartment(result.data);
     }
   });
 }

 addDepartment(obj: any){

   this.tBLShamelDepartmentService.add(obj).subscribe
   (
     data=>
     {
       this.RefreshDataSource();
     }
   );

}





 updateDepartment(obj: any){

   console.log(obj);
   this.tBLShamelDepartmentService.update(obj).subscribe
   (
     data=>
     {
       this.RefreshDataSource();
     }
   );


 }
 deleteDepartment(obj:any){
   this.tBLShamelDepartmentService.delete(obj).subscribe
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
