import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { TblshameljobnameService } from 'src/app/modules/shared/services/employees_department/tblshameljobname.service';
import { EmployeePageService } from '../employee-page-service';
import { JobServiceDataAdjustPrintDialogComponent } from '../job-service-data-adjust-print-dialog/job-service-data-adjust-print-dialog.component';

@Component({
  selector: 'app-job-service-data',
  templateUrl: './job-service-data.component.html',
  styleUrls: ['./job-service-data.component.scss']
})
export class JobServiceDataComponent implements OnInit {

  Selected_Emp: TBLShamelEmployee = {};

  Form = new FormGroup({
    fcl_checkBoxGroup: new FormControl(''),
    fcl_adjectiveJob: new FormControl(''),
    fcl_oneCheckbox: new FormControl(''),
    fcl_twoCheckbox: new FormControl(''),
    fcl_threeCheckbox: new FormControl(''),
    fcl_fourCheckbox: new FormControl(''),
    fcl_fiveCheckbox: new FormControl(''),
    fcl_sixCheckbox: new FormControl(''),
    fcl_sevenCheckbox: new FormControl(''),
  });

  options1: string[] = [];
  filteredOptions1: Observable<string[]>;

  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options1.filter(option => option.toLowerCase().includes(filterValue));
  }

  constructor(public dialog: MatDialog,
    private tblshameljobnameService: TblshameljobnameService,
    public PageService:EmployeePageService) { 

      this.PageService.Subject_Selected_TBLShamelEmployee.subscribe(
        data => {
          this.Selected_Emp = data;
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
          this.options1.push(data[i].jobname_name);
        this.filteredOptions1 = this.Form.get('fcl_adjectiveJob').valueChanges.pipe(
          startWith(''),
          map(value => this._filter1(value || '')),
        );
      }
      );
  }

  ngOnInit(): void {
    this.Form.get('fcl_adjectiveJob').disable();
  }

  adjectiveJobChecked(){
  }

  change1(event: any){
    if (event.source.checked)
    this.Form.get('fcl_adjectiveJob').enable();
  }

  change2(event: any){
    if (event.source.checked)
    this.Form.get('fcl_adjectiveJob').disable();
  }

  change3(event: any){
    if (event.source.checked)
    this.Form.get('fcl_adjectiveJob').disable();
  }

  change4(event: any){

  }

  adjustPrintFooter(){
    const dialogRef = this.dialog.open(JobServiceDataAdjustPrintDialogComponent, {
      width: '1150px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  print(){
    
  }

}
