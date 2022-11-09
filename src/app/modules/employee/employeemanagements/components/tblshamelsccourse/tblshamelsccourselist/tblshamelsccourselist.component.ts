
import { AfterContentInit, AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TblshamelsccoursemodifyComponent } from '../tblshamelsccoursemodify/tblshamelsccoursemodify.component';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { ConfirmationdialogComponent } from '../../common/confirmationdialog/confirmationdialog.component';
import { ITBLShamelSCCourse } from 'src/app/modules/shared/models/employees_department/ITBLShamelSCCourse';
import { TblshamelsccourseService } from 'src/app/modules/shared/services/employees_department/tblshamelsccourse.service';
import { EmployeePageService } from '../../employee-page-service';


@Component({
  selector: 'app-tblshamelsccourselist',
  templateUrl: './tblshamelsccourselist.component.html',
  styleUrls: ['./tblshamelsccourselist.component.scss']
})
export class TblshamelsccourselistComponent   implements OnInit ,AfterViewInit  {


  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //Join Variable   
  Selected_Emp:TBLShamelEmployee = {};


  // List For Table
  employee_course_List :ITBLShamelSCCourse []=[];
  dataSource: MatTableDataSource<ITBLShamelSCCourse>;
  
  selected_employee_course :ITBLShamelSCCourse;
  displayedColumns: string[] = ['course_name', 'specification_name', 'studyduration', 'country_name'
                                ,'startdate','enddate' ,'action'];



  constructor(
    public PageService:EmployeePageService,
    public courseService : TblshamelsccourseService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {

      this.dataSource = new MatTableDataSource([]);
     
      this.PageService.Subject_Selected_TBLShamelEmployee.subscribe(
        data=>
        {
          this.Selected_Emp = data;

        }
      )

      this.employee_course_List =[];
      this.dataSource.data= this.employee_course_List ;

      this.PageService.Subject_Selected_TBLShamelEmployee.subscribe
      (
        data=>
        {
          this.employee_course_List  = data.TBLShamelSCCourses;
          this.dataSource.data= this.employee_course_List ;
        }
      )
     
     }


  
   
  ngOnInit(): void { 
    this.dataSource = new MatTableDataSource(this.employee_course_List );
  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.employee_course_List );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
}


    public async FillTable()
    {
     try{
       if (this.Selected_Emp && this.Selected_Emp.id>0)
       {
        this.courseService.list(this.Selected_Emp.id).toPromise().then(
          (data:any)=>
          {      
            this.employee_course_List=data;                   
            this.dataSource.data= this.employee_course_List ;
            this.PageService.Selected_TBLShamelEmployee.TBLShamelSCCourses =  this.employee_course_List;
            
          }
        );
       }
     }catch(ex :any){}
    }

 
    



  


  Add(): void {

    this.selected_employee_course =  {};

    this.selected_employee_course.id = this.Selected_Emp.id;


    const dialogRef = this.dialog.open(TblshamelsccoursemodifyComponent, {
      height: '80%',
      width: '80%',
      data: {obj: this.selected_employee_course,id:this.Selected_Emp.id}
    });
   
    dialogRef.afterClosed().toPromise().then(result => {
     
      this.FillTable();
      
    });
  }


   Delete(element:ITBLShamelSCCourse)
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
         


          this.courseService.delete(element.serial).toPromise().then(res=> 
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


  async Update(element:ITBLShamelSCCourse)
  {
    if (element && element.serial >0)
    {
      this.selected_employee_course = element;

      const dialogRef = this.dialog.open(TblshamelsccoursemodifyComponent, {
        height: '60%',
        width: '80%',
        data: {obj: this.selected_employee_course,id:this.Selected_Emp.id}
      });
  
      dialogRef.afterClosed().toPromise().then(result => {
        this.FillTable();        
      });

    }


  }




}
