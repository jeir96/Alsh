import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ITBLShamelDoctor } from 'src/app/modules/shared/models/employees_department/ITBLShamelDoctor';
import { TBLShamelDoctorService } from 'src/app/modules/shared/services/employees_department/tblshamel-doctor.service';


import { TblShamelDoctorAddComponent } from '../tbl-shamel-doctor-add/tbl-shamel-doctor-add.component';


@Component({
  selector: 'app-tbl-shamel-doctor-list',
  templateUrl: './tbl-shamel-doctor-list.component.html',
  styleUrls: ['./tbl-shamel-doctor-list.component.css']
})
export class TblShamelDoctorListComponent implements OnInit {
   ELEMENT_DATA: ITBLShamelDoctor[] = [];
   dataSource = new MatTableDataSource<ITBLShamelDoctor>();

  displayedColumns: string[] = ['doctor_id', 'doctor_name', 'Fixed' ,'action'];
  
  @ViewChild(MatTable,{static:true}) mytable!: MatTable<any>;

  constructor(public dialog: MatDialog,
    private tBLShamelDoctorService:TBLShamelDoctorService) {
      if (tBLShamelDoctorService.List_TBLShamelDoctor == null ||
        tBLShamelDoctorService.List_TBLShamelDoctor.length ==0
      )
      tBLShamelDoctorService.fill();

      tBLShamelDoctorService.List_TBLShamelDoctor_BehaviorSubject?.subscribe(
        data=>
        {
          this.ELEMENT_DATA = data;
          this.dataSource.data =this.ELEMENT_DATA; 
        }
      )
    }


    RefreshDataSource()    
    {
      this.tBLShamelDoctorService.fill();
    }

  openDialog(action: any,obj:any) {
   console.log(obj);

    obj.action = action;
    const dialogRef = this.dialog.open(TblShamelDoctorAddComponent, {
      width: '350px',
      data:obj
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log(result.event);

      if(result.event == 'إضافة'){
        this.addDoctor(result.data);
      }else if(result.event == 'تعديل'){
        this.updateDoctor(result.data);
      }else if(result.event == 'حذف'){
        this.deleteDoctor(result.data);
      }
    });
  }

  addDoctor(obj: any){

    this.tBLShamelDoctorService.add(obj).subscribe
    (
      data=>
      {
        this.RefreshDataSource();
      }
    );

 }





  updateDoctor(obj: any){

    console.log(obj);
    this.tBLShamelDoctorService.update(obj).subscribe
    (
      data=>
      {
        this.RefreshDataSource();
      }
    );


  }
  deleteDoctor(obj:any){
    this.tBLShamelDoctorService.delete(obj).subscribe
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
