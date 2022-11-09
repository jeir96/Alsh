import { Component, OnInit, AfterViewInit, OnChanges, ViewChild, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ITBLShamelSCJobState } from "src/app/modules/shared/models/employees_department/ITBLShamelSCJobState";
import { TBLShamelEmployee } from "src/app/modules/shared/models/employees_department/TBLShamelEmployee";
import { TblshamelscjobstateService } from "src/app/modules/shared/services/employees_department/tblshamelscjobstate.service";
import { EmployeePageService } from "../../employee-page-service";
import { ConfirmationdialogComponent } from "../../common/confirmationdialog/confirmationdialog.component";
import { TblshamelscjobstatemodifyComponent } from "../tblshamelscjobstatemodify/tblshamelscjobstatemodify.component";

@Component({
  selector: 'app-tblshamelscjobstatelist',
  templateUrl: './tblshamelscjobstatelist.component.html',
  styleUrls: ['./tblshamelscjobstatelist.component.scss']
})
export class TblshamelscjobstatelistComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  //Join Variable   
  Selected_Emp: TBLShamelEmployee = {};
  @Input() id: number;

  // List For Table
  employee_JobState_List: ITBLShamelSCJobState[] = [];
  dataSource = new MatTableDataSource<ITBLShamelSCJobState>();

  selected_employee_JobState: ITBLShamelSCJobState;
  displayedColumns: string[] = [
    'department_name', 'jobname_name', 'jobkind_name',
    'class_name', 'changereason_name', 'begindata',
    'changedate','salary',  'documenttype_name',
    'doc_number', 'doc_date',
    'action'];


  // Select Object
  selected_employee_JobState_Rows = new Set<ITBLShamelSCJobState>();



  constructor(
    public PageService: EmployeePageService,
    public jobStateService: TblshamelscjobstateService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar

  ) {
    this.employee_JobState_List = [];
    this.dataSource = new MatTableDataSource(this.employee_JobState_List);

    this.PageService.Subject_Selected_TBLShamelEmployee.subscribe(
      data => {
        this.Selected_Emp = data;
        this.id = this.Selected_Emp.id
      }
    )


    this.dataSource.data = this.employee_JobState_List;

    this.PageService.Subject_Selected_TBLShamelEmployee.subscribe
      (
        data => {
          this.employee_JobState_List = data.TBLShamelSCJobStates;
          this.dataSource.data = this.employee_JobState_List;
        }
      )



  }


  ngOnChanges() {


  }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.employee_JobState_List);
  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.employee_JobState_List);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  public async FillTable() {
    try {
      if (this.Selected_Emp && this.Selected_Emp.id > 0) {
        this.jobStateService.list(this.Selected_Emp.id).toPromise().then(
          (data: any) => {
            this.employee_JobState_List = data;
            this.dataSource = new MatTableDataSource<ITBLShamelSCJobState>(this.employee_JobState_List);
            this.dataSource.paginator = this.paginator;




          }
        );
      }



    } catch (ex: any) {
      console.log(ex);

    }


  }









  Add(): void {

    this.selected_employee_JobState = {};
    this.selected_employee_JobState.id = this.Selected_Emp.id;

    if (this.employee_JobState_List != null &&
      this.employee_JobState_List.length > 0) {
      let last_employee_JobState: ITBLShamelSCJobState = this.employee_JobState_List[this.employee_JobState_List.length - 1];
      console.log("dsds");
      console.log(last_employee_JobState);
      if (last_employee_JobState != null) {
        this.selected_employee_JobState.id = this.id;
        this.selected_employee_JobState.department_id = last_employee_JobState.department_id;
        this.selected_employee_JobState.jobname_id = last_employee_JobState.jobname_id;
        this.selected_employee_JobState.jobkind_id = last_employee_JobState.jobkind_id;
        this.selected_employee_JobState.class_id = last_employee_JobState.class_id;
      }
    }

    const dialogRef = this.dialog.open(TblshamelscjobstatemodifyComponent, {
      height: '80%',
      width: '80%',
      data: { obj: this.selected_employee_JobState, id: this.Selected_Emp.id }
    });

    dialogRef.afterClosed().toPromise().then(result => {

      this.FillTable();

    });
  }


  async Delete(element: ITBLShamelSCJobState) {

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


if (element.serial!= null)
{
          this.jobStateService.delete(element.serial).toPromise().then(res => {
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
        }
      });
    
    } catch (ex: any) {
      console.log(ex);
    }

  }


  async Update(element: ITBLShamelSCJobState) {

    if (element != null && element.serial != null && element.serial > 0) {
      this.selected_employee_JobState = element;
      this.selected_employee_JobState.id = this.Selected_Emp.id;

      const dialogRef = this.dialog.open(TblshamelscjobstatemodifyComponent, {
        height: '80%',
        width: '80%',
        data: { obj: this.selected_employee_JobState, id: this.Selected_Emp.id }
      });

      dialogRef.afterClosed().toPromise().then(result => {
        this.FillTable();
      });

    }


  }




}
