import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Observable } from 'rxjs';



import * as _moment from 'moment';



import { NewEmployeeCardComponent } from '../new-employee-card/new-employee-card.component';


import { ViewTBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/ViewTBLSamelEmployee';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { EmployeePageService } from '../../employee-page-service';
import { DataEntryDialogComponent } from '../data-entry-dialog/data-entry-dialog.component';
import { EditEmployeeCardComponent } from '../edit-employee-card/edit-employee-card.component';
//
@Component({
  selector: 'app-emp-show-data',
  templateUrl: './emp-show-data.component.html',
  styleUrls: ['./emp-show-data.component.scss']
})
export class EmpShowDataComponent implements OnInit {
  @Input() SelectedEmp : TBLShamelEmployee;
  @Input() SelectedViewEmp : ViewTBLShamelEmployee;

 
  


  PhotoUrl:SafeUrl;
  constructor(
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private pageService : EmployeePageService
    ) { 

      this.pageService.Subject_Selected_TBLShamelEmployee.subscribe
      (
        data=>
        {
          console.log('this.SelectedEmp');

          this.SelectedEmp = data
console.log(this.SelectedEmp );
        }

      )

      this.pageService.Subject_Selected_ViewTBLSamelEmployee.subscribe
      (
        data=>
        {
          console.log('this.SelectedEmp');

          this.SelectedViewEmp = data
console.log(this.SelectedEmp );
        }

      )

      


    }


  ngOnInit(): void {
    console.log( 'iside child');
    console.log( this.SelectedEmp);
    let objectURL = 'data:image/jpeg;base64,' + this.SelectedEmp.Photo;
    this.PhotoUrl    = this.sanitizer.bypassSecurityTrustUrl(objectURL); 
 
            


  }


  Show_EntryOfficer() {

    console.log(this.SelectedEmp);
    const dialogRef = this.dialog.open(DataEntryDialogComponent, {
      data: { dataEmp: this.SelectedEmp },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  Add_Employee() {

    console.log(this.SelectedEmp);
    var Emp = {};
    const dialogRef = this.dialog.open(NewEmployeeCardComponent, {
      height: '90%',
      width: '90%',
      data: { dataEmp: Emp },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  Update_Employee() {

    console.log(this.SelectedEmp);
    if (this.SelectedEmp)
    {
      const dialogRef = this.dialog.open(EditEmployeeCardComponent, {
        data: { dataEmp: this.SelectedEmp },
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });

    }

  }

  Add_Modify_Documents() {

    console.log(this.SelectedEmp);
    const dialogRef = this.dialog.open(DataEntryDialogComponent, {
      data: { dataEmp: this.SelectedEmp },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  Show_Documents() {

    console.log(this.SelectedEmp);
    const dialogRef = this.dialog.open(DataEntryDialogComponent, {
      data: { dataEmp: this.SelectedEmp },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
