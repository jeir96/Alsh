import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ITBLShamelCertificate } from 'src/app/modules/shared/models/employees_department/ITBLShamelCertificate';
import { TBLShamelCertificateService } from 'src/app/modules/shared/services/employees_department/tblshamel-certificate.service';
import { TblShamelCertificateAddComponent } from '../tbl-shamel-certificate-add/tbl-shamel-certificate-add.component';

@Component({
  selector: 'app-tbl-shamel-certificate-list',
  templateUrl: './tbl-shamel-certificate-list.component.html',
  styleUrls: ['./tbl-shamel-certificate-list.component.scss']
})
export class TblShamelCertificateListComponent implements OnInit {

  ELEMENT_DATA: ITBLShamelCertificate[] = [];
  dataSource = new MatTableDataSource<ITBLShamelCertificate>();

 displayedColumns: string[] = ['certificate_id', 'certificate_name', 'certificate_fixed' ,'action'];

 @ViewChild(MatTable,{static:true}) mytable!: MatTable<any>;

 constructor(public dialog: MatDialog,
   private tBLShamelCertificateService:TBLShamelCertificateService) {
     if (tBLShamelCertificateService.List_ITBLShamelCertificate == null ||
       tBLShamelCertificateService.List_ITBLShamelCertificate.length ==0
     )
     tBLShamelCertificateService.fill();

     tBLShamelCertificateService.List_ITBLShamelCertificate_BehaviorSubject?.subscribe(
       data=>
       {
         this.ELEMENT_DATA = data;
         this.dataSource.data =this.ELEMENT_DATA;
       }
     )
   }


   RefreshDataSource()
   {
     this.tBLShamelCertificateService.fill();
   }

 openDialog(action: any,obj:any) {
  console.log(obj);

   obj.action = action;
   const dialogRef = this.dialog.open(TblShamelCertificateAddComponent, {
     width: '350px',
     data:obj
   });


   dialogRef.afterClosed().subscribe(result => {
     console.log(result);
     console.log(result.event);

     if(result.event == 'إضافة'){
       this.addCertificate(result.data);
     }else if(result.event == 'تعديل'){
       this.updateCertificate(result.data);
     }else if(result.event == 'حذف'){
       this.deleteCertificate(result.data);
     }
   });
 }

 addCertificate(obj: any){

   this.tBLShamelCertificateService.add(obj).subscribe
   (
     data=>
     {
       this.RefreshDataSource();
     }
   );

}





 updateCertificate(obj: any){

   console.log(obj);
   this.tBLShamelCertificateService.update(obj).subscribe
   (
     data=>
     {
       this.RefreshDataSource();
     }
   );


 }
 deleteCertificate(obj:any){
   this.tBLShamelCertificateService.delete(obj).subscribe
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
