import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ITBLShamelSCBonus } from "src/app/modules/shared/models/employees_department/ITBLShamelSCBonus";
import { TBLShamelEmployee } from "src/app/modules/shared/models/employees_department/TBLShamelEmployee";
import { TBLShamelSCBonusService } from "src/app/modules/shared/services/employees_department/tblshamel-scbonus.service";
import { EmployeePageService } from "../../employee-page-service";

import { ConfirmationdialogComponent } from "../../common/confirmationdialog/confirmationdialog.component";
import { TblshamelscbonusmodifyComponent } from "../tblshamelscbonusmodify/tblshamelscbonusmodify.component";
import { FormValidationHelpersService } from "src/app/modules/shared/services/helpers/form-validation-helpers.service";

@Component({
  selector: 'app-tblshamelscbonuslist',
  templateUrl: './tblshamelscbonuslist.component.html',
  styleUrls: ['./tblshamelscbonuslist.component.scss']
})
export class TblshamelscbonuslistComponent implements OnInit, AfterViewInit {

  //Join Variable
  Selected_Emp: TBLShamelEmployee = {};


  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  // List For Table
  employee_Bonus_List: ITBLShamelSCBonus[] = [];
  selected_employee_Bonus: ITBLShamelSCBonus;
  displayedColumns: string[] = ['bonus_name', 'bonusreason_name', 'documenttype_name', 'document_number',
    'documentdate', 'action'];


  // Select Object
  selected_employee_Bonus_Rows = new Set<ITBLShamelSCBonus>();
  dataSource: MatTableDataSource<ITBLShamelSCBonus>;



  constructor(
    public PageService: EmployeePageService,
    public ShamelSCBonusService: TBLShamelSCBonusService,
    public dialog: MatDialog,
    public formValidatorsService: FormValidationHelpersService,
    private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource([]);
    this.PageService.Subject_Selected_TBLShamelEmployee.subscribe(
      data => {
        console.log("data", data)
        this.Selected_Emp = data;
      }
    )

    this.employee_Bonus_List = [];
    this.dataSource.data = this.employee_Bonus_List;

    this.PageService.Subject_Selected_TBLShamelEmployee.subscribe
      (
        data => {
          this.employee_Bonus_List = data.TBLShamelSCBonuss;
          this.dataSource.data = this.employee_Bonus_List;
        }
      )


  }



  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.employee_Bonus_List);
  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.employee_Bonus_List);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }




  public async FillTable() {
    try {
      if (this.Selected_Emp && this.Selected_Emp.id != null && this.Selected_Emp.id > 0) {
        this.ShamelSCBonusService.list(this.Selected_Emp.id).toPromise().then(
          (data: any) => {
            this.employee_Bonus_List = data;
            this.dataSource.data = this.employee_Bonus_List;
            this.PageService.Selected_TBLShamelEmployee.TBLShamelSCBonuss = this.employee_Bonus_List;
          }
        );
      }



    } catch (ex: any) { }


  }



  Add(): void {

    this.selected_employee_Bonus = {};
    this.selected_employee_Bonus.id = this.Selected_Emp.id;

    const dialogRef = this.dialog.open(TblshamelscbonusmodifyComponent, {
      height: '50%',
      width: '60%',
      data: { obj: this.selected_employee_Bonus, id: this.Selected_Emp.id }
    });

    dialogRef.afterClosed().toPromise().then(result => {
      this.FillTable();
    });
  }


  async Delete(element: ITBLShamelSCBonus) {

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



          this.ShamelSCBonusService.delete(element.serial).toPromise().then(res => {
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


  Update(element: ITBLShamelSCBonus) {
    if (element) {
      this.selected_employee_Bonus = element;
      console.log(this.selected_employee_Bonus);

      const dialogRef = this.dialog.open(TblshamelscbonusmodifyComponent, {
        height: '65%',
        width: '50%',
        data: { obj: this.selected_employee_Bonus, id: this.Selected_Emp.id }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.FillTable();
      });

    }


  }




}
