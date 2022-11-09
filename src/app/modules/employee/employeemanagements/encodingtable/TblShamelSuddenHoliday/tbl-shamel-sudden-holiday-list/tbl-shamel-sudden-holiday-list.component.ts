import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource, MatTable } from "@angular/material/table";
import { TBLShamelSuddenHoliday } from "src/app/modules/shared/models/employees_department/TBLShamelSuddenHoliday";
import { TBLShamelSuddenHolidayService } from "src/app/modules/shared/services/employees_department/tblshamel-sudden-holiday.service";
import { TblShamelSuddenHolidayAddComponent } from "../tbl-shamel-sudden-holiday-add/tbl-shamel-sudden-holiday-add.component";

@Component({
  selector: 'app-tbl-shamel-sudden-holiday-list',
  templateUrl: './tbl-shamel-sudden-holiday-list.component.html',
  styleUrls: ['./tbl-shamel-sudden-holiday-list.component.css']
})
export class TblShamelSuddenHolidayListComponent implements OnInit {

   ELEMENT_DATA: TBLShamelSuddenHoliday[] = [];
   dataSource = new MatTableDataSource<TBLShamelSuddenHoliday>();


   fixed?: number;
  displayedColumns: string[] = ['suddenholiday_id', 'suddenholiday_name', 'Fixed' ,'action'];

  @ViewChild(MatTable,{static:true}) mytable!: MatTable<any>;

  constructor(public dialog: MatDialog,
    private tBLShamelSuddenHolidayService: TBLShamelSuddenHolidayService ) {

      if (tBLShamelSuddenHolidayService.List_TBLShamelSuddenHolidayService == null ||
        tBLShamelSuddenHolidayService.List_TBLShamelSuddenHolidayService.length ==0
      )
      tBLShamelSuddenHolidayService.fill();

      tBLShamelSuddenHolidayService.List_TBLShamelSuddenHolidayService_BehaviorSubject?.subscribe(
        data=>
        {
          console.log('ddd');
          console.log(data);
          this.ELEMENT_DATA = data;
          this.dataSource.data =this.ELEMENT_DATA; 
        }
      )
    }


    RefreshDataSource()    
    {
      this.tBLShamelSuddenHolidayService.fill();
    }

  openDialog(action: any,obj:any) {
   console.log(obj);

    obj.action = action;
    const dialogRef = this.dialog.open(TblShamelSuddenHolidayAddComponent, {
      width: '350px',
      data:obj
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log(result.event);

      if(result.event == 'إضافة'){
        this.addSH(result.data);
      }else if(result.event == 'تعديل'){
        this.updateSH(result.data);
      }else if(result.event == 'حذف'){
        this.deleteSH(result.data);
      }
    });
  }

  addSH(obj: any){

    this.tBLShamelSuddenHolidayService.add(obj).subscribe
    (
      data=>
      {
        this.RefreshDataSource();
      }
    )
 }





  updateSH(obj: any){
    this.tBLShamelSuddenHolidayService.update(obj).subscribe
    (
      data=>
      {
        this.RefreshDataSource();
      }
    )
  }
  deleteSH(obj:any){

    this.tBLShamelSuddenHolidayService.delete(obj).subscribe
    (
      data=>
      {
        this.RefreshDataSource();
      }
    )

  }

  ngOnInit(): void {
  }

}
