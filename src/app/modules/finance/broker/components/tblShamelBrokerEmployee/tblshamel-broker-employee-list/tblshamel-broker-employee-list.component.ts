import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { forkJoin, map, Observable, of, startWith } from 'rxjs';
import { TBLShamelSex } from 'src/app/modules/shared/models/employees_department/TBLShamelSex';
import { TblShamelBrokerEmployee } from 'src/app/modules/shared/models/finance_department/broker/TblShamelBrokerEmployee';
import { TBLShamelSexService } from 'src/app/modules/shared/services/employees_department/tblshamel-sex.service';
import { TblShamelBrokerEmployeeService } from 'src/app/modules/shared/services/finance_department/broker/tbl-shamel-broker-employee.service';
import { ConfirmationDialogComponent } from '../../common/confirmation-dialog/confirmation-dialog.component';
import { TblshamelBrokerEmployeeModifyComponent } from '../tblshamel-broker-employee-modify/tblshamel-broker-employee-modify.component';

@Component({
  selector: 'app-tblshamel-broker-employee-list',
  templateUrl: './tblshamel-broker-employee-list.component.html',
  styleUrls: ['./tblshamel-broker-employee-list.component.scss']
})
export class TblshamelBrokerEmployeeListComponent implements OnInit {

  rowClicked: number;

  changeTableRowColor(idx: any) { 
    if(this.rowClicked === idx) this.rowClicked = -1;
    else this.rowClicked = idx;
  }
  
  PageIndex: number = 1;
  rowInPage = 100;
  Form: FormGroup;

  List_SEX_NAME: TBLShamelSex[] = [];
  List_SEX_NAME_Filter: Observable<TBLShamelSex[]> = of([]);

  broker_employee_List: TblShamelBrokerEmployee[] = [];
  selected_broker_employee: TblShamelBrokerEmployee;

  displayedColumns: string[] = ['serial', 'fname', 'lname', 'father', 'mother', 'birthdate',
    'sexname', 'servicedayes', 'action'];

  //Data Source For MatTable
  dataSource = new MatTableDataSource<TblShamelBrokerEmployee>(this.broker_employee_List);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<TblShamelBrokerEmployee>;


  constructor(public tblShamelBrokerEmployeeService: TblShamelBrokerEmployeeService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer,
    private frmBuilder : FormBuilder,
    private tblShamelSexService: TBLShamelSexService) { 

      this.dataSource = new MatTableDataSource<TblShamelBrokerEmployee>(this.broker_employee_List);


      this.Form = this. frmBuilder.group({
        serial: new FormControl<number|undefined|null>(null),
        fname: new FormControl<string|undefined|null>(null),
        lname: new FormControl<string|undefined|null>(null),
        father: new FormControl<string|undefined|null>(null),
        mother: new FormControl<string|undefined|null>(null),
        birthdate: new FormControl<Date|undefined|null>(null),
        sex_name: new FormControl<string|undefined|null>(null),
        servicedayes: new FormControl<number|undefined|null>(null),     
        servicedayes_operator: new FormControl<string|undefined|null>(null),
        fullname: new FormControl<string|undefined|null>(null)
      });

      this.LoadData();

      this.selected_broker_employee = {
        serial: 0,
        fname: '',
        lname: '',
        father: '',
        mother: '',
        birthdate: moment("01- 01-2022", 'MM-DD-YYYY').toDate(),
        sex_name: '',
        servicedayes: 0,
      };
    }

    Load_Sex() : Observable<TBLShamelSex[]>
{
  if (this.tblShamelSexService.List_TBLShamelSex == null ||
    this.tblShamelSexService.List_TBLShamelSex == undefined ||
    this.tblShamelSexService.List_TBLShamelSex .length == 0)
    return this.tblShamelSexService.list();

    return of (this.tblShamelSexService.List_TBLShamelSex );
}

LoadData() {

  forkJoin(
    [this.Load_Sex()]
  ).subscribe(res => {
    this.List_SEX_NAME = res[0];
    this.List_SEX_NAME_Filter = of(res[0]);

  
    if (this.Form != null) {

      this.List_SEX_NAME_Filter = this.Form.controls['sex_name'].valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._Filtered_SEX_NAME(value) : this.List_SEX_NAME.slice())
        );


       
    }


  },
    (error) => console.log(error));

}

private _Filtered_SEX_NAME(value: string): TBLShamelSex[] {
  if (value != null && this.List_SEX_NAME!= null && this.List_SEX_NAME.length>0) {
    const filterValue = value;
    return this.List_SEX_NAME.filter(obj => obj.Sex_Name.includes(filterValue));
  }
  return this.List_SEX_NAME.slice();
}

public displaySexNameProperty(value: string): string {
  if (value!= null  && this.List_SEX_NAME!= null ) {
    let tBLShameSex: any = this.List_SEX_NAME.find(crs => crs.Sex_Name== value);
    if (tBLShameSex!= null)
      return tBLShameSex.Sex_Name;
  }
  return '';
}

onScroll() {

  this.PageIndex = this.PageIndex + 1;

  this.broker_employee_List = []; 

  this.FillTable();
}

public async FillTable() {


  try {

    console.log(this.Form.value);
    // call Search
    this.tblShamelBrokerEmployeeService.Search(this.Form.value, this.PageIndex).subscribe(
      (data: TblShamelBrokerEmployee[] )=> {

       
        // if Success 
        if (data != null && data .length >0) {
          this.broker_employee_List = this.broker_employee_List.concat(data);
        }
        this.dataSource.data = this.broker_employee_List;

      }
    )

  } catch (ex: any) { }


}

OnSearch()
  {
    this.PageIndex =1;
    this.broker_employee_List = [];
    this.dataSource.data = this.broker_employee_List;
    this.FillTable();
  }

  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
  }


  Add(name: string): void {
    // Init selected_overtime_employee
    this.selected_broker_employee = {
      serial: 0,
      fname: '',
      lname: '',
      father: '',
      mother: '',
      birthdate: moment("01- 01-2022", 'MM-DD-YYYY').toDate(),
      sex_name: '',
      servicedayes: 0,
    };

    const dialogRef = this.dialog.open(TblshamelBrokerEmployeeModifyComponent, {
      height: '60%',
      width: '60%',
      data: { obj: this.selected_broker_employee }
    });

    dialogRef.afterClosed().toPromise().then(result => {
      console.log(result);
      if (result) {
        this.FillTable();
        this.dataSource.paginator = this.paginator;
        this.snackBar.open('تمت الإضافة', '', {
          duration: 2000,
        });
      }
    });
  }


  async Delete(element: TblShamelBrokerEmployee) {
    try {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
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
          if (element?.serial != null && element.serial > 0)
            this.tblShamelBrokerEmployeeService.delete(element?.serial).subscribe
              (
                data => {
                  this.FillTable();
                }

              )




          this.dataSource.paginator = this.paginator;
          this.snackBar.open('تم الحذف', '', {
            duration: 2000,
          });



        }
      });
    } catch (ex: any) {

    }

  }


  async Update(element: TblShamelBrokerEmployee) {
    if (element) {
      this.selected_broker_employee = element;

      const dialogRef = this.dialog.open(TblshamelBrokerEmployeeModifyComponent, {
        height: '60%',
        width: '60%',
        data: { obj: this.selected_broker_employee }
      });

      dialogRef.afterClosed().toPromise().then(result => {
        this.FillTable();

        if (result)
          this.snackBar.open('تم التعديل', '', {
            duration: 2000,
          });
      });

    }


  }

}
