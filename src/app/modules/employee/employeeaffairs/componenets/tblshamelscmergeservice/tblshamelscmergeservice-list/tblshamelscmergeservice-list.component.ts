import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationdialogComponent } from 'src/app/modules/shared/components/confirmationdialog/confirmationdialog.component';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { TBLShamelSCMergeService } from 'src/app/modules/shared/models/employees_department/TBLShamelSCMergeService';
import { TBLShamelSCSuddenHoliday } from 'src/app/modules/shared/models/employees_department/TBLShamelSCSuddenHoliday';
import { TBLShamelSCMergeServiceService } from 'src/app/modules/shared/services/employees_department/tblshamel-sc-merge-service.service';

import { EmployeePageService } from '../../pageservice/employee-page-service';
import { TBLShamelSCSuddenHolidayAddComponent } from '../../tblshamelscsuddenholiday/tblshamel-sc-sudden-holiday-add/tblshamel-sc-sudden-holiday-add.component';
import { TblshamelscmergeserviceModifyComponent } from '../tblshamelscmergeservice-modify/tblshamelscmergeservice-modify.component';

@Component({
  selector: 'app-tblshamelscmergeservice-list',
  templateUrl: './tblshamelscmergeservice-list.component.html',
  styleUrls: ['./tblshamelscmergeservice-list.component.scss']
})
export class TblshamelscmergeserviceListComponent implements OnInit,AfterViewInit {
 //Join Variable   
 Selected_Emp: TBLShamelEmployee = {};
 @ViewChild('paginator') paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;
 dataSource : MatTableDataSource<TBLShamelSCMergeService> = new  MatTableDataSource<TBLShamelSCMergeService>([]);
   
  @Input() employee_id :number | undefined;
  // List For Table
  employee_List_TBLShamelSCMergeService :TBLShamelSCMergeService []=[];
  selected_employee_MergeService :TBLShamelSCMergeService = {};
  displayedColumns: string[] = ['years', 'months', 'days','mergeservicereason_id','documenttype_id','document_number', 'documentdate','action'];
  
 
  
  constructor(
    public PageService: EmployeePageService,
    public SCMergeServiceService : TBLShamelSCMergeServiceService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {
      this.dataSource = new  MatTableDataSource<TBLShamelSCMergeService>([]);
    
      this.dataSource.data = this.employee_List_TBLShamelSCMergeService;
  
      this.PageService.Subject_Selected_TBLShamelEmployee.subscribe(
        data => {
          this.Selected_Emp = data;
          this.employee_id = this.Selected_Emp .id;
        }
      )

      this.PageService.Subject_Selected_TBLShamelEmployee.subscribe
        (
          data => {
            if (data != null && data.TBLShamelSCMergeServices!= null )
            {
console.log(data);
            
            this.employee_List_TBLShamelSCMergeService = data.TBLShamelSCMergeServices;

            this.dataSource.data = this.employee_List_TBLShamelSCMergeService;
          }
          }
        )


    
     }
  
  
    
ngOnInit(): void {

  this.dataSource.data =this. employee_List_TBLShamelSCMergeService;
}
ngAfterViewInit() {
  this.dataSource.data =this.employee_List_TBLShamelSCMergeService;
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

  
    public async FillTable()
    {
     try{
    
      if (this.Selected_Emp != null  && this.Selected_Emp.id != null && this.Selected_Emp.id > 0) {

        await this.SCMergeServiceService.list(this.Selected_Emp.id).subscribe(
          (data:any)=>
          {     
            

            if (this.PageService.Selected_TBLShamelEmployee != null)
              this.PageService.Selected_TBLShamelEmployee.TBLShamelSCMergeServices = data;                        
            this.employee_List_TBLShamelSCMergeService=data;  
            this.dataSource.data =this.employee_List_TBLShamelSCMergeService;     
          }
        );
       }
  
  
  
     }catch(ex :any){}
  
  
    }
  
  
    
  
  
  
  
  
  
  Add(): void {
  
    this.selected_employee_MergeService =  {  };
  
    this.selected_employee_MergeService.id =this.Selected_Emp.id;
  
    console.log('dsd fasdf asdf asdf asdfdsfdsfdfsfddfsdfs');

  console.log(this.selected_employee_MergeService);

    const dialogRef = this.dialog.open(TblshamelscmergeserviceModifyComponent, {
      height: '80%',
       width: '80%',
      data: {obj: this.selected_employee_MergeService,id:this.Selected_Emp.id}
    });
   
    dialogRef.afterClosed().toPromise().then(result => {
     
      this.FillTable();
      
    });
  }
  
  
  async Delete(element:TBLShamelSCSuddenHoliday)
  {
    
  try{
      const dialogRef = this.dialog.open(ConfirmationdialogComponent,{
        data:{
          message: 'هل أنت متأكد من الحذف?',
          buttonText: {
            ok: 'نعم',
            cancel: 'لا'
          }
        }
      });
  
      
  
      dialogRef.afterClosed().toPromise().then((confirmed: boolean) => {
        if (confirmed) {
     
          const snack = this.snackBar.open('سوف يتم الآن الحذف');
         
  
  if (element.serial!= null && element.serial>0)
  {
    this.SCMergeServiceService.delete(element.serial).toPromise().then(res=> 
      {
        snack.dismiss();
  
        console.log(res);
        if (res==1)
          this.FillTable();
  
      });
      this.snackBar.open('تم الحذف', 'Fechar', {
        duration: 2000,
      });
  
      this.snackBar.dismiss();
  }
    
  
         
        }
      });
  }catch(ex:any)  
  {
  
  }
  
  }
  
  
  async Update(element:TBLShamelSCSuddenHoliday)
  {
    if (element!= null && element!= undefined)
    {
      this.selected_employee_MergeService = element;
 
      this.selected_employee_MergeService.id =this.Selected_Emp.id;
    
      const dialogRef = this.dialog.open(TblshamelscmergeserviceModifyComponent, {
        height: '60%',
        width: '80%',
        data: {obj: this.selected_employee_MergeService,id:this.Selected_Emp.id}
      });
  
      dialogRef.afterClosed().toPromise().then(result => {
        this.FillTable();        
      });
  
    }
  
  
  }
  
  
  
  
  }
  