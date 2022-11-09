import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin, map, Observable, of, startWith } from 'rxjs';
import { TBLShamelArea } from 'src/app/modules/shared/models/employees_department/TBLShamelArea';
import { TblShamelBrokerPrintTotals } from 'src/app/modules/shared/models/finance_department/broker/TblShamelBrokerPrintTotals';
import { TBLShamelAreaService } from 'src/app/modules/shared/services/employees_department/tblshamel-area.service';
import { TblShamelBrokerShatebService } from 'src/app/modules/shared/services/finance_department/broker/tbl-shamel-broker-shateb.service';

@Component({
  selector: 'app-tbl-shamel-broker-print-totals-list',
  templateUrl: './tbl-shamel-broker-print-totals-list.component.html',
  styleUrls: ['./tbl-shamel-broker-print-totals-list.component.scss']
})
export class TblShamelBrokerPrintTotalsListComponent implements OnInit {

  rowClicked: number;

  changeTableRowColor(idx: any) { 
    if(this.rowClicked === idx) this.rowClicked = -1;
    else this.rowClicked = idx;
  }
  
  // pageIndex: number = 1;
  // rowInPage = 100;

  Form: FormGroup;
  broker_print_totals_List: TblShamelBrokerPrintTotals[] = [];

  dataSource = new MatTableDataSource<TblShamelBrokerPrintTotals>(this.broker_print_totals_List);


  List_AREA: TBLShamelArea[] = [];
  List_AREA_Filter: Observable<TBLShamelArea[]> = of([]);

  displayedColumns: string[] = ['area_name', 'fullname', 'daycount', 'totaldaycount'];
  
  constructor(private frmBuilder : FormBuilder,
    private tblShamelAreaService: TBLShamelAreaService,
    private tblShamelBrokerShatebService: TblShamelBrokerShatebService,
    private snackBar: MatSnackBar,) { 

      this.dataSource = new MatTableDataSource<TblShamelBrokerPrintTotals>(this.broker_print_totals_List);

      this.Form = this. frmBuilder.group({
        area_name: new FormControl<string|undefined|null>(null),
        start_date: new FormControl<Date | null>(null),
        end_date: new FormControl<Date | null>(null),
      });
  
      this.LoadData();
    }

    Load_Area() : Observable<TBLShamelArea[]>
{
  if (this.tblShamelAreaService.List_TBLShamelArea == null ||
    this.tblShamelAreaService.List_TBLShamelArea == undefined ||
    this.tblShamelAreaService.List_TBLShamelArea .length == 0)
    return this.tblShamelAreaService.list();

    return of (this.tblShamelAreaService.List_TBLShamelArea );
}

LoadData() {

  forkJoin(
    [this.Load_Area()]
  ).subscribe(res => {
    this.List_AREA = res[0];
    this.List_AREA_Filter = of(res[0]);

  
    if (this.Form != null) {

      this.List_AREA_Filter = this.Form.controls['area_name'].valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._Filtered_AREA(value) : this.List_AREA.slice())
        );


       
    }


  },
    (error) => console.log(error));

}

private _Filtered_AREA(value: string): TBLShamelArea[] {
  if (value != null && this.List_AREA!= null && this.List_AREA.length>0) {
    const filterValue = value;
    return this.List_AREA.filter(obj => obj.Area_Name.includes(filterValue));
  }
  return this.List_AREA.slice();
}

public displayAreaProperty(value: string): string {
  if (value!= null  && this.List_AREA!= null ) {
    let tBLShameArea: any = this.List_AREA.find(crs => crs.Area_ID== +value);
    if (tBLShameArea!= null)
      return tBLShameArea.Area_Name;
  }
  return '';
}

OnSearch()
  {
    if(this.Form.controls['start_date'].value == null || this.Form.controls['end_date'].value == null){
    this.snackBar.open('الرجاء إدخال التواريخ', '', {
      duration: 2000,
    });
    return;
  }
    // this.pageIndex =1;
    this.broker_print_totals_List = [];
    this.dataSource.data = this.broker_print_totals_List;
    this.FillTable();
  }

  public async FillTable() {


    try {

      console.log(this.Form.value);
      // call Search
      this.tblShamelBrokerShatebService.statistics({
        area_name: this.Form.controls['area_name'].value,
        start_date: this.Form.controls['start_date'].value,
        end_date: this.Form.controls['end_date'].value
      }).subscribe(
        (data: TblShamelBrokerPrintTotals[] )=> {

         console.log('data1', data);
          // if Success 
          if (data != null && data .length >0) {
            this.broker_print_totals_List = this.broker_print_totals_List.concat(data);
          }
          this.dataSource.data = this.broker_print_totals_List;

        }
      )

    } catch (ex: any) { }


  }

  // onScroll() {

  //   this.pageIndex = this.pageIndex + 1;

  //   this.overtime_print_totals_List = []; 

  //   this.FillTable();
  // }

  ngOnInit(): void {
  }

}
