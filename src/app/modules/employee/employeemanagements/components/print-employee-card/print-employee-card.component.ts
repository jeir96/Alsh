import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { EmployeePageService } from '../employee-page-service';
import { JobServiceDataAdjustPrintDialogComponent } from '../job-service-data-adjust-print-dialog/job-service-data-adjust-print-dialog.component';

@Component({
  selector: 'app-print-employee-card',
  templateUrl: './print-employee-card.component.html',
  styleUrls: ['./print-employee-card.component.scss']
})
export class PrintEmployeeCardComponent implements OnInit {

  Selected_Emp: TBLShamelEmployee = {};

  Form = new FormGroup({
    fcl_allDataCheckbox: new FormControl(''),
    fcl_punishmentsCheckbox: new FormControl(''),
    fcl_rewardsCheckbox: new FormControl(''),
    fcl_holidaiesCheckbox: new FormControl(''),
  });
  
  constructor(public PageService:EmployeePageService, public dialog: MatDialog) {
    this.PageService.Subject_Selected_TBLShamelEmployee.subscribe(
      data => {
        this.Selected_Emp = data;
      }
    );
   }

  ngOnInit(): void {
  }

  change1(event: any){

  }

  change2(event: any){

  }

  printCard(){

  }

  printInterface(){

  }

  print(){

  }

  adjustPrintFooter(){
    const dialogRef = this.dialog.open(JobServiceDataAdjustPrintDialogComponent, {
      width: '1150px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

}
