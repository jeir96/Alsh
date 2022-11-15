import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ITBLShamelCourse } from 'src/app/modules/shared/models/employees_department/ITBLShamelCourse';
import { TblshamelcourseService } from 'src/app/modules/shared/services/employees_department/tblshamelcourse.service';
import { ConfirmationdialogComponent } from '../../../components/common/confirmationdialog/confirmationdialog.component';
import { TblShamelCourseAddComponent } from '../tbl-shamel-course-add/tbl-shamel-course-add.component';

@Component({
  selector: 'app-tbl-shamel-course-list',
  templateUrl: './tbl-shamel-course-list.component.html',
  styleUrls: ['./tbl-shamel-course-list.component.scss']
})
export class TblShamelCourseListComponent implements OnInit, OnDestroy {

  addSubscription: Subscription;
  deleteSubscribtion: Subscription;

 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;

 courses_list: ITBLShamelCourse[] = [];
 dataSource = new MatTableDataSource<ITBLShamelCourse>();

 displayedColumns: string[] = ['course_id', 'course_name', 'course_fixed' ,'action'];

 @ViewChild(MatTable,{static:true}) mytable!: MatTable<any>;

 constructor(public dialog: MatDialog,
   private tBLShamelCourseService:TblshamelcourseService,
    private snackBar: MatSnackBar) {
     if (tBLShamelCourseService.List_ITBLShamelCourse == null ||
       tBLShamelCourseService.List_ITBLShamelCourse.length ==0
     )
     this.FillTable();

     tBLShamelCourseService.List_ITBLShamelCourse_BehaviorSubject?.subscribe(
       data=>
       {
         this.courses_list = data;
         this.dataSource.data = this.courses_list;
       }
     )
   }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


   RefreshDataSource()
   {
     this.FillTable();
   }

   Add() {

   const dialogRef = this.dialog.open(TblShamelCourseAddComponent, {
     width: '50%',
     height: '30%',
   });


   dialogRef.afterClosed().subscribe(result => {
     console.log(result);
     console.log(result.event);

     if(result.event == 'إضافة'){
       this.addCourse(result.data);
     }else if(result.event == 'تعديل'){
       this.Update(result.data);
     }else if(result.event == 'حذف'){
       this.Delete(result.data);
     }
   });
 }

  addCourse(obj: any){

    this.addSubscription = this.tBLShamelCourseService.add(obj).subscribe
    (
      data=>
      {
        this.RefreshDataSource();
      }
    );

  }


  isCourseFixed(isFixed: boolean): string {
    return isFixed == true ? "نعم" : "لا";
  }




  Delete(element:ITBLShamelCourse)
  {

    const dialogRef = this.dialog.open(ConfirmationdialogComponent,{
      data:{
        message: 'هل أنت متأكد من الحذف?',
        buttonText: {
          ok: 'نعم',
          cancel: 'لا'
        }
      }
    });



    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {

        const snack = this.snackBar.open('سوف يتم الآن الحذف');


        this.deleteSubscribtion = this.tBLShamelCourseService.delete(element.course_id).subscribe(res=>
          {
            snack.dismiss();

            console.log(res);
            if (res)
              this.FillTable();

          });
          this.snackBar.open('تم الحذف', 'Fechar', {
            duration: 2000,
          });

          this.snackBar.dismiss();


      }
    });


  }


  FillTable() {
    this.tBLShamelCourseService.fill();
  }

  Update(element:ITBLShamelCourse)
  {
    if (element)
    {
      const dialogRef = this.dialog.open(TblShamelCourseAddComponent, {
        width: '50%',
        height: '30%',
        data: {obj: {...element},id: element.course_id}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.FillTable();
      });

    }


  }

  ngOnDestroy(): void {
      if(this.addSubscription)
      {
        this.addSubscription.unsubscribe();
      }

      if(this.deleteSubscribtion){
        this.deleteSubscribtion.unsubscribe();
      }
  }
}
