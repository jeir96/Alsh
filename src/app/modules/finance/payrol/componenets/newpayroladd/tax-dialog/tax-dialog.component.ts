import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TBLShamelMonthService } from 'src/app/modules/shared/services/employees_department/tblshamel-month.service';
import { TBLShamelYearService } from 'src/app/modules/shared/services/employees_department/tblshamel-year.service';
import { TBLShamelShatebHealthService } from 'src/app/modules/shared/services/finance_department/shatebtax/tblshamel-shateb-health.service';
import { TBLShamelShatebPunishmentService } from 'src/app/modules/shared/services/finance_department/shatebtax/tblshamel-shateb-punishment.service';
import { TBLShamelShatebVarTaxService } from 'src/app/modules/shared/services/finance_department/shatebtax/tblshamel-shateb-var-tax.service';

@Component({
  selector: 'app-tax-dialog',
  templateUrl: './tax-dialog.component.html',
  styleUrls: ['./tax-dialog.component.scss']
})
export class TaxDialogComponent implements OnInit, AfterViewInit {

  rowClicked: number;

  changeTableRowColor(idx: any) { 
    if(this.rowClicked === idx) this.rowClicked = -1;
    else this.rowClicked = idx;
  }
  
  dataSource1 = new MatTableDataSource<any>();
  dataSource2 = new MatTableDataSource<any>();
  dataSource3 = new MatTableDataSource<any>();
  displayedColumns1: string[] = [
    'id','firstName','lastName','father','mother','accounterName'];
  displayedColumns2: string[] = [
    'id','firstName','lastName','father','mother','accounterName'];
  displayedColumns3: string[] = [
    'id','firstName','lastName','father','mother','accounterName'];

    fixedYear: string;
    fixedMonth: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;
    this.dataSource3.paginator = this.paginator;
    this.dataSource3.sort = this.sort;
  }
  constructor(public dialogRef: MatDialogRef<TaxDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private tblShamelYearService: TBLShamelYearService,
    private tblShamelMonthService: TBLShamelMonthService,
    private tblShamelShatebHealthService: TBLShamelShatebHealthService,
    private tblShamelShatebPunishmentService: TBLShamelShatebPunishmentService,
    private tblShamelShatebVarTaxService: TBLShamelShatebVarTaxService) { }

  ngOnInit(): void {
    this.tblShamelYearService.GetYearFixed().subscribe(
      res => {
        this.fixedYear = res.year_name;

        this.tblShamelMonthService.GetMonthFixed().subscribe(
          res => {
            this.fixedMonth = res.month_id;

            this.tblShamelShatebHealthService.Get_By_ID_Month_Year(this.data, this.fixedYear, this.fixedMonth ).subscribe(
              (res:any) =>{
                // console.log('res2', res);
                this.dataSource1.data= res;
              }
            );
          }
        );
      }
    );

    this.tblShamelYearService.GetYearFixed().subscribe(
      res => {
        this.fixedYear = res.year_name;

        this.tblShamelMonthService.GetMonthFixed().subscribe(
          res => {
            this.fixedMonth = res.month_id;

            this.tblShamelShatebPunishmentService.Get_By_ID_Month_Year(this.data, this.fixedYear, this.fixedMonth ).subscribe(
              (res:any) =>{
                this.dataSource2.data= res;
              }
            );
          }
        );
      }
    );

    this.tblShamelYearService.GetYearFixed().subscribe(
      res => {
        this.fixedYear = res.year_name;

        this.tblShamelMonthService.GetMonthFixed().subscribe(
          res => {
            this.fixedMonth = res.month_id;

            this.tblShamelShatebVarTaxService.Get_By_ID_Month_Year(this.data, this.fixedYear, this.fixedMonth ).subscribe(
              (res:any) =>{
                this.dataSource3.data= res;
              }
            );
          }
        );
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
