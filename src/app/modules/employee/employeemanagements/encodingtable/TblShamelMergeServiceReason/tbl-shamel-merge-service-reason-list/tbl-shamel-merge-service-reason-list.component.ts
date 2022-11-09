



import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { TBLShamelMergeServiceReason } from 'src/app/modules/shared/models/employees_department/TBLShamelMergeServiceReason';
import { TBLShamelMergeServiceReasonService } from 'src/app/modules/shared/services/employees_department/tblshamel-merge-service-reason.service';
import { TblShamelMergeServiceReasonAddComponent } from '../tbl-shamel-merge-service-reason-add/tbl-shamel-merge-service-reason-add.component';


@Component({
  selector: 'app-tbl-shamel-merge-service-reason-list',
  templateUrl: './tbl-shamel-merge-service-reason-list.component.html',
  styleUrls: ['./tbl-shamel-merge-service-reason-list.component.css']


})
export class TblShamelMergeServiceReasonListComponent {

  //تعريف مصفوفة البيانات
  ELEMENT_DATA: TBLShamelMergeServiceReason[] = [];
  //تعريف DataSource لجدول mat-table
  //نستفيد من DataSource بأن نضيف عديد من الخدمات متل الفلترة
  //اقرأي عنه قليلا
  dataSource = new MatTableDataSource<TBLShamelMergeServiceReason>();

  //انتبهي على اسماء الاعمدة يجب ان تكون مطابقة للموديل
  //مسار الموديل هو
  //app\modules\shared\models\employees_department
  displayedColumns: string[] = ['mergeservicereason_id', 'mergeservicereason_name', 'Fixed', 'action'];


  @ViewChild(MatTable, { static: true }) mytable!: MatTable<any>;

  constructor(
    public dialog: MatDialog,
    //اضفنا السيرفس من أجل جلب البيانات
    private tblShamelMergeServiceReasonService: TBLShamelMergeServiceReasonService
  ) {
    //باعتبار ان السيرفس متل static 
    //ويتم انشاؤها مرة واحدة وتبقى طول حياة البرنامج
    //وضعنا متحولين بكل سيرفس
    //المتحول الاول يمثل مصفوفة تحوي على بيانات الجدول
    //والمتحول التاني من النمط BehavourSubject
    //الهدف هو
    //ان كل ما قام المستخدم بفتح الواجهة سوف يذهب ويحملها من السيرفر
    //قمنا بتخزينها في المصفوفة الاولى والثانية
    //وبالتالي المستخدم يقوم بتحميلها مرة واحدة إلا أذا حملها من الكود
    //الفرق بين المصفوفتين
    //كبيانات نفس الامر
    //ولكن نستفيد من الثاني بان ناخذ القيمة باستخدام subscribe


    //اذا كان المصفوفة بالسيرفس غير معبائة... استدعي التابع fill الذي يقوم بملئها

    if (tblShamelMergeServiceReasonService.List_TBLShamelMergeServiceReason == null ||
      tblShamelMergeServiceReasonService.List_TBLShamelMergeServiceReason.length == 0
    )
      tblShamelMergeServiceReasonService.fill();

    //هنا اشتركنا وبدأنا نستمع للBehavourSubkect
    //فبمجرد ما تغيرت القيمة في المصفوفة سوف تصلنا التحديث
    tblShamelMergeServiceReasonService.List_TBLShamelMergeServiceReason_BehaviorSubject?.subscribe(
      data => {
        //بعد ما وصلنا التحديث سوف نقوم بتحديث متحولاتنا
        this.ELEMENT_DATA = data;
        this.dataSource.data = this.ELEMENT_DATA;
      }
    )
  }


  RefreshDataSource() {
    //تابع يقوم بالتحديث
    this.tblShamelMergeServiceReasonService.fill();
  }

  openDialog(action: any, obj: any) {
    console.log(obj);

    obj.action = action;
    const dialogRef = this.dialog.open(TblShamelMergeServiceReasonAddComponent, {
      width: '350px',
      data: obj
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log(result.event);

      if (result.event == 'إضافة') {
        this.addMSR(result.data);
      } else if (result.event == 'تعديل') {
        this.updateMSR(result.data);
      } else if (result.event == 'حذف') {
        this.deleteMSR(result.data);
      }
    });
  }

  addMSR(msr_obj: any) {
    //استدعاء التابع ADD
    //ضمن السيرفس
    this.tblShamelMergeServiceReasonService.add(msr_obj).subscribe
      (
        data => {
          this.RefreshDataSource();
        }
      )

  }





  updateMSR(msr_obj: any) {
    this.tblShamelMergeServiceReasonService.update(msr_obj).subscribe
      (
        data => {
          this.RefreshDataSource();
        }
      )
  }

  deleteMSR(msr_obj: any) {
    this.tblShamelMergeServiceReasonService.delete(msr_obj).subscribe
      (
        data => {
          this.RefreshDataSource();
        }
      )
  }

  ngOnInit(): void {
  }

}
