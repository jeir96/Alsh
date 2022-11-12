import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ITBLShamelSCEducation } from "src/app/modules/shared/models/employees_department/ITBLShamelSCEducation";
import { TBLShamelEmployee } from "src/app/modules/shared/models/employees_department/TBLShamelEmployee";
import { TblshamelsceducationService } from "src/app/modules/shared/services/employees_department/tblshamelsceducation.service";
import { EmployeePageService } from "../../employee-page-service";
import { ConfirmationdialogComponent } from "../../common/confirmationdialog/confirmationdialog.component";
import { TblshamelsceducationmodifyComponent } from "../tblshamelsceducationmodify/tblshamelsceducationmodify.component";

@Component({
  selector: 'app-tblshamelsceducationlist',
  templateUrl: './tblshamelsceducationlist.component.html',
  styleUrls: ['./tblshamelsceducationlist.component.scss']
})
export class TblshamelsceducationlistComponent implements OnInit, AfterViewInit {
  //Join Variable   
  Selected_Emp: TBLShamelEmployee = {};
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  employee_education_List: ITBLShamelSCEducation[] = [];
  selected_employee_education: ITBLShamelSCEducation;
  displayedColumns: string[] = ['certificate_name', 'specification_name', 'graduationyear', 'country_name',
    'state_name', 'rank_name', 'studyduration', 'action'];


  // Select Object
  selected_employee_education_Rows = new Set<ITBLShamelSCEducation>();
  dataSource: MatTableDataSource<ITBLShamelSCEducation>;



  constructor(
    public PageService: EmployeePageService,
    public educationService: TblshamelsceducationService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {

    this.employee_education_List = [];

    this.dataSource = new MatTableDataSource([]);


    this.dataSource.data = this.employee_education_List;

    this.PageService.Subject_Selected_TBLShamelEmployee.subscribe(
      data => {
        this.Selected_Emp = data;
      }
    )


    this.PageService.Subject_Selected_TBLShamelEmployee.subscribe
      (
        data => {
          this.employee_education_List = data.TBLShamelSCEducations;
          this.dataSource.data = this.employee_education_List;
        }
      )


  }



  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.employee_education_List);
  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.employee_education_List);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  public async FillTable() {
    try {

      if (this.Selected_Emp && this.Selected_Emp.id != null && this.Selected_Emp.id > 0) {

        this.educationService.list(this.Selected_Emp.id).toPromise().then(
          (data: any) => {
            this.employee_education_List = data;
            this.dataSource.data = this.employee_education_List;
            this.PageService.Selected_TBLShamelEmployee.TBLShamelSCEducations = this.employee_education_List;
          }
        );

      }


    }
    catch (ex: any) { }


  }









  Add(): void {

    this.selected_employee_education = {};
    this.selected_employee_education.id = this.Selected_Emp.id;


    const dialogRef = this.dialog.open(TblshamelsceducationmodifyComponent, {
      height: '80%',
      width: '80%',
      data: { obj: this.selected_employee_education, id: this.Selected_Emp.id }
    });

    dialogRef.afterClosed().toPromise().then(result => {

      this.FillTable();

    });
  }


  async Delete(element: ITBLShamelSCEducation) {

    try {
      const dialogRef = this.dialog.open(ConfirmationdialogComponent, {
        data: {
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



          this.educationService.delete(element.serial).toPromise().then(res => {
            snack.dismiss();

            console.log(res);
            if (res == 1)
              this.FillTable();

          });
          this.snackBar.open('تم الحذف', 'Fechar', {
            duration: 2000,
          });

          this.snackBar.dismiss();


        }
      });
    } catch (ex: any) {

    }

  }


  async Update(element: ITBLShamelSCEducation) {
    if (element) {
      this.selected_employee_education = element;
      this.selected_employee_education.id = this.Selected_Emp.id;


      const dialogRef = this.dialog.open(TblshamelsceducationmodifyComponent, {
        height: '80%',
        width: '80%',
        data: { obj: this.selected_employee_education, id: this.Selected_Emp.id }
      });

      dialogRef.afterClosed().toPromise().then(result => {
        this.FillTable();
      });

    }


  }




}
