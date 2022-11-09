import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { TblShamelUpgradeYearService } from 'src/app/modules/shared/services/employees_department/tbl-shamel-upgrade-year.service';
import { TblshamelclassService } from 'src/app/modules/shared/services/employees_department/tblshamelclass.service';
import { TblshameljobnameService } from 'src/app/modules/shared/services/employees_department/tblshameljobname.service';
import {map, startWith} from 'rxjs/operators';
import { TBLShamelUpgradeService } from 'src/app/modules/shared/services/employees_department/tblshamel-upgrade.service';
import { TblShamelUpgradeYear } from 'src/app/modules/shared/models/employees_department/TblShamelUpgradeYear';
import { Stats4 } from 'src/app/modules/shared/models/employees_department/Stats4';
import { MatTableDataSource } from '@angular/material/table';
import { TblShamelUpgradeGovReport } from 'src/app/modules/shared/models/employees_department/TblShamelUpgradeGovReport';
import { TblShamelUpgradeGovReportService } from 'src/app/modules/shared/services/employees_department/tbl-shamel-upgrade-gov-report.service';
import { TblShamelUpgradeGovReportSearch } from 'src/app/modules/shared/models/employees_department/tbl-shamel-upgrade-gov-report-search';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { UpgradeQararsAdjustPrintDialogComponent } from '../upgrade-qarars-adjust-print-dialog/upgrade-qarars-adjust-print-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TblShamelPrintReferralQararsResult } from 'src/app/modules/shared/models/employees_department/tbl-shamel-print-referral-qarars-result';

@Component({
  selector: 'app-print-referral-qarars',
  templateUrl: './print-referral-qarars.component.html',
  styleUrls: ['./print-referral-qarars.component.scss']
})
export class PrintReferralQararsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  Form = new FormGroup({
    fcl_UpgradeYear: new FormControl(''),
    fcl_Class: new FormControl(''),
    fcl_JobName: new FormControl(''),
    fcl_FirstQararNum: new FormControl(''),
    fcl_LastQararNum: new FormControl(''),

  });

  options1: string[] = [];
  filteredOptions1: Observable<string[]>;
  options2: string[] = [];
  filteredOptions2: Observable<string[]>;
  options3: string[] = [];
  filteredOptions3: Observable<string[]>;

  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options1.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options2.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter3(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options3.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  constructor(
    private upgradeYear: TblShamelUpgradeYearService,
    private tblshamelclassService: TblshamelclassService,
    private tblshameljobnameService: TblshameljobnameService,
    private tblShamelUpgradeService : TBLShamelUpgradeService,
    private tblShamelUpgradeGovReportService : TblShamelUpgradeGovReportService,
    public dialog: MatDialog,
  ) {
    if (this.tblshamelclassService.List_ITBLShamelClass == null ||
      this.tblshamelclassService.List_ITBLShamelClass.length ==0 )
      this.tblshamelclassService.fill();

      this.tblshamelclassService.List_ITBLShamelClass_BehaviorSubject.subscribe(
      data=>
      {
        // this.List_TBLShamelMalakState = data;

        for(let i =0; i< data.length; i++)
          this.options2.push(data[i].class_name);
        this.filteredOptions2 = this.Form.get('fcl_Class').valueChanges.pipe(
          startWith(''),
          map(value => this._filter2(value || '')),
        );
      }
      );

      if (this.tblshameljobnameService.list_ITBLShamelJobName == null ||
        this.tblshameljobnameService.list_ITBLShamelJobName.length ==0 )
        this.tblshameljobnameService.fill();
  
        this.tblshameljobnameService.List_ITBLShamelJobName_BehaviorSubject.subscribe(
        data=>
        {
          // this.List_TBLShamelMalakState = data;
  
          for(let i =0; i< data.length; i++)
            this.options3.push(data[i].jobname_name);
          this.filteredOptions3 = this.Form.get('fcl_JobName').valueChanges.pipe(
            startWith(''),
            map(value => this._filter3(value || '')),
          );
        }
        );


        this.upgradeYear.GetFixedYear().subscribe(
          (res: TblShamelUpgradeYear) =>{
            this.options1.push(res.year_id+'');
            this.filteredOptions1 = this.Form.get('fcl_UpgradeYear').valueChanges.pipe(
              startWith(''),
              map(value => this._filter1(value || '')),
            );
          }
        );


        this.tblShamelUpgradeGovReportService.list().subscribe(
          (res ) =>{
            this.dataSource.data= res as any;
            console.log('res', res);
            console.log('req', this.request);
          }
        );
   }

  ngOnInit(): void {
  }

  jobNameToAdd: string= "";
  getJobName(jobName: string){
    this.jobNameToAdd= jobName;
  }


  request :TblShamelUpgradeGovReportSearch = {};

  Search()
  {

    this.request= {year_id: +this.Form.get('fcl_UpgradeYear').value, class_name:  this.Form.get('fcl_Class').value, jobname_name: this.Form.get('fcl_JobName').value, first_qarar_num: +this.Form.get('fcl_FirstQararNum').value, last_qarar_num: +this.Form.get('fcl_LastQararNum').value};

    this.tblShamelUpgradeGovReportService.Search(this.request).subscribe(
      res=>{
        this.dataSource= res as any;
        console.log('res', res);
        console.log('req', this.request);
      }
    );
    
  }


  dataSource = new MatTableDataSource<TblShamelUpgradeGovReport>();
  displayedColumns: string[] = [
    'upgrade_year','qarar_number','qarar_date','first_name','last_name','class','jobname'];

    adjustPrintFooter(){
      const dialogRef = this.dialog.open(UpgradeQararsAdjustPrintDialogComponent, {
        width: '1150px',
        data: {},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        
      });
    }

    print(){
      
    }
}
