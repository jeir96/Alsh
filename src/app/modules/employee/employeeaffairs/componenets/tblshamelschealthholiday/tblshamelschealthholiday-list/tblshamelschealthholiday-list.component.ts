import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationdialogComponent } from 'src/app/modules/shared/components/confirmationdialog/confirmationdialog.component';
import { ITBLShamelSCHealthHoliday } from 'src/app/modules/shared/models/employees_department/ITBLShamelSCHealthHoliday';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { TBLShamelSCHealthHolidayService } from 'src/app/modules/shared/services/employees_department/tblshamel-schealth-holiday.service';
import { EmployeePageService } from '../../pageservice/employee-page-service';

import { TblshamelschealthholidayModifyComponent } from '../tblshamelschealthholiday-modify/tblshamelschealthholiday-modify.component';

@Component({
  selector: 'app-tblshamelschealthholiday-list',
  templateUrl: './tblshamelschealthholiday-list.component.html',
  styleUrls: ['./tblshamelschealthholiday-list.component.scss']
})
export class TblshamelschealthholidayListComponent implements OnInit,AfterViewInit {
 //Join Variable   
 Selected_Emp: TBLShamelEmployee = {};
 @ViewChild('paginator') paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;
 dataSource: MatTableDataSource<ITBLShamelSCHealthHoliday>;

  @Input() employee_id :number;

  employee_HealthHoliday_List :ITBLShamelSCHealthHoliday []=[];

   // Select Object
   selected_employee_HealthHoliday:ITBLShamelSCHealthHoliday = {};                              
  
 




  displayedColumns: string[] = [ 


  'startdate',
  'enddate',
  'duration',
  'sick',
  'doctor_name' ,
  'documenttype_id',	
  'document_number',
  'documentdate','action'];



  constructor(
    public PageService: EmployeePageService,
    public ShamelSCHealthHolidayService : TBLShamelSCHealthHolidayService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {

      this.employee_HealthHoliday_List =[];
    

      this.dataSource = new MatTableDataSource([]);
    
    
      this.dataSource.data = this.employee_HealthHoliday_List;
  
      this.PageService.Subject_Selected_TBLShamelEmployee.subscribe(
        data => {
          this.Selected_Emp = data;
          this.employee_id = this.Selected_Emp .id;
        }
      )
  
  
      this.PageService.Subject_Selected_TBLShamelEmployee.subscribe
        (
          data => {
            if (data != null && data.TBLShamelSCHealthHolidays!= null)
            {
              this.employee_HealthHoliday_List = data.TBLShamelSCHealthHolidays;
              this.dataSource.data = this.employee_HealthHoliday_List;
            }

          }
        )

     
     }

    
ngOnInit(): void {
  this.dataSource = new MatTableDataSource(this.employee_HealthHoliday_List);
}
ngAfterViewInit() {
  this.dataSource = new MatTableDataSource(this.employee_HealthHoliday_List);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}


   
 


    public async FillTable()
    {
     try{
      console.log('Fill Table ID = ' + this.Selected_Emp.id); 

      if (this.Selected_Emp != null  && this.Selected_Emp.id != null && this.Selected_Emp.id > 0) {

         await this.ShamelSCHealthHolidayService.list(this.Selected_Emp.id).subscribe(
           (data:any)=>
           {      
             this.employee_HealthHoliday_List=data;  
             this.PageService.Selected_TBLShamelEmployee.TBLShamelSCHealthHolidays = data;                        
             this.dataSource.data =this.employee_HealthHoliday_List;
           }
         );
        }
 
 
 
      }catch(ex :any){}
 
 
     }
 
  
     
 
 
 
   
 
 
   Add(): void {
 
     this.selected_employee_HealthHoliday =  {};
     this.selected_employee_HealthHoliday.id =this.Selected_Emp.id;
     
     const dialogRef = this.dialog.open(TblshamelschealthholidayModifyComponent, {
       height: '80%',
       width: '80%',
       data: {obj: this.selected_employee_HealthHoliday,id:this.Selected_Emp.id}
     });
    
     dialogRef.afterClosed().toPromise().then(result => {
      
       this.FillTable();
       
     });
   }
 
 
   async Delete(element:ITBLShamelSCHealthHoliday)
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
          
 
 
           this.ShamelSCHealthHolidayService.delete(element.serial).toPromise().then(res=> 
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
       });
 }catch(ex:any)  
 {
 
 }
 
   }
 
 
   async Update(element:ITBLShamelSCHealthHoliday)
   {
     if (element)
     {
       this.selected_employee_HealthHoliday = element;
       this.selected_employee_HealthHoliday.id =this.Selected_Emp.id;

       const dialogRef = this.dialog.open(TblshamelschealthholidayModifyComponent, {
         height: '80%',
         width: '80%',
         data: {obj: this.selected_employee_HealthHoliday,id:this.Selected_Emp.id}
       });
   
       dialogRef.afterClosed().toPromise().then(result => {
         this.FillTable();        
       });
 
     }
 
 
   }
 
 


}
