import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TblShamelReplaceQararNumbers } from 'src/app/modules/shared/models/employees_department/tbl-shamel-replace-qarar-numbers';
import { TblShamelUpgradeGovReport } from 'src/app/modules/shared/models/employees_department/TblShamelUpgradeGovReport';
import { TblshamelScJobStateService } from 'src/app/modules/shared/services/employees_department/tblshamel-sc-job-state.service';

@Component({
  selector: 'app-replace-qarar-numbers',
  templateUrl: './replace-qarar-numbers.component.html',
  styleUrls: ['./replace-qarar-numbers.component.scss']
})
export class ReplaceQararNumbersComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  Form = new FormGroup({
    fcl_QararDate: new FormControl(''),
    fcl_Id: new FormControl(''),
    fcl_NewQararNumber: new FormControl(''),
    fcl_NewQararDate: new FormControl(''),

  });

  request: TblShamelReplaceQararNumbers = {new_Qara_Date: "", new_Qara_Num: 0, old_Qara_Date: "", old_Qara_Num: 0};

  constructor(private tblshamelScJobStateService: TblshamelScJobStateService) {
    
   }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

  View(){
    this.tblshamelScJobStateService.ListQarar(this.request).subscribe(
      res => {
        this.dataSource= res as any;
        console.log('res', res);
        console.log('req', this.request);
      }
    );
  }

  Replace(){
    this.request.old_Qara_Num= +this.Form.get('fcl_Id').value;
    this.request.old_Qara_Date= this.Form.get('fcl_QararDate').value;
    this.request.new_Qara_Num= +this.Form.get('fcl_NewQararNumber').value;
    this.request.new_Qara_Date= this.Form.get('fcl_NewQararDate').value;
    this.tblshamelScJobStateService.UpgradeQarar(this.request).subscribe(
      res => {
        this.dataSource= res as any;
        console.log('res', res);
        console.log('req', this.request);
      }
    );
  }

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'id','worker_name','new_salary','qarar_num','qarar_date'];

}
