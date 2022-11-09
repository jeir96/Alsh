
import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ITBLShamelSCFreeHoliday } from 'src/app/modules/shared/models/employees_department/ITBLShamelSCFreeHoliday';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { TBLShamelSCFreeHolidayService } from 'src/app/modules/shared/services/employees_department/tblshamel-scfree-holiday.service';
import { ConfirmationdialogComponent } from '../../common/confirmationdialog/confirmationdialog.component';
import { EmployeePageService } from '../../employee-page-service';
import { TblshamelscfreeholidaymodifyComponent } from '../tblshamelscfreeholidaymodify/tblshamelscfreeholidaymodify.component';

@Component({
  selector: 'app-tblshamelscfreeholidaylist',
  templateUrl: './tblshamelscfreeholidaylist.component.html',
  styleUrls: ['./tblshamelscfreeholidaylist.component.scss']
})
export class TblshamelscfreeholidaylistComponent   implements OnInit ,AfterViewInit  {

   //Join Variable   
   Selected_Emp: TBLShamelEmployee = {};
   @ViewChild('paginator') paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
   dataSource: MatTableDataSource<ITBLShamelSCFreeHoliday>;

 
 
   
 
 
 

    //Join Variable   
    @Input() id:number;
  
    // List For Table
    employee_freeHoliday_List :ITBLShamelSCFreeHoliday []=[];
    selected_employee_freeHoliday :ITBLShamelSCFreeHoliday;
    displayedColumns: string[] = ['freeholidayreason_name' ,'duration', 'startdate', 'enddate','documenttype_name', 'document_number',
                                  'documentdate','action'];
  
  
    // Select Object
    selected_employee_freeHoliday_Rows = new Set<ITBLShamelSCFreeHoliday>();                              
   
  
  
    constructor(
           public PageService: EmployeePageService,

      public ShamelSCFreeHolidayService : TBLShamelSCFreeHolidayService,
      public dialog: MatDialog,
      private snackBar: MatSnackBar) {
        this.employee_freeHoliday_List =[];


       console.log('Free');

        this.dataSource = new MatTableDataSource<ITBLShamelSCFreeHoliday>([]);
    
    
       
    
        this.PageService.Subject_Selected_TBLShamelEmployee.subscribe(
          data => {
            this.Selected_Emp = data;
          }
        )
    
        
    
        this.PageService.Subject_Selected_TBLShamelEmployee.subscribe
          (
            data => {
             
              this.employee_freeHoliday_List = data.TBLShamelSCFreeHolidays;

              this.dataSource.data = this.employee_freeHoliday_List;
            }
          )

       
       }
  
      
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.employee_freeHoliday_List);
  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.employee_freeHoliday_List);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  
     
   
  
  
      public async FillTable()
      {
       try{
        console.log('Fill Table ID = ' + this.id); 

        if (this.Selected_Emp && this.Selected_Emp.id != null && this.Selected_Emp.id > 0) {

          await this.ShamelSCFreeHolidayService.list(this.Selected_Emp.id).toPromise().then(
            (data:any)=>
            {      
              this.employee_freeHoliday_List=data;  
              this.dataSource.data =this.employee_freeHoliday_List;
              console.log(this.employee_freeHoliday_List); 
                  
            }
          );
         }
  
  
  
       }catch(ex :any){}
  
  
      }
  
   
      
  
  
  
    
  
  
    Add(): void {
  
      this.selected_employee_freeHoliday =  {};
      this.selected_employee_freeHoliday.id = this.Selected_Emp.id;

  
      const dialogRef = this.dialog.open(TblshamelscfreeholidaymodifyComponent, {
        height: '80%',
        width: '80%',
        data: {obj: this.selected_employee_freeHoliday,id:this.Selected_Emp.id}
      });
     
      dialogRef.afterClosed().toPromise().then(result => {
       
        this.FillTable();
        
      });
    }
  
  
    async Delete(element:ITBLShamelSCFreeHoliday)
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
           
  
  
            this.ShamelSCFreeHolidayService.delete(element.serial).toPromise().then(res=> 
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
  
  
    async Update(element:ITBLShamelSCFreeHoliday)
    {
      if (element)
      {
        this.selected_employee_freeHoliday = element;      this.selected_employee_freeHoliday.id = this.Selected_Emp.id;

  
        const dialogRef = this.dialog.open(TblshamelscfreeholidaymodifyComponent, {
          height: '80%',
          width: '80%',
          data: {obj: this.selected_employee_freeHoliday,id:this.Selected_Emp.id}
        });
    
        dialogRef.afterClosed().toPromise().then(result => {
          this.FillTable();        
        });
  
      }
  
  
    }
  
  
  
  
  }
  