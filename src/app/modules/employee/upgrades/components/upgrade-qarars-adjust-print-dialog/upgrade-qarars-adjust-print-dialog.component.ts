import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { TblShamelUpgradeQararsAdjustPrintDialog } from 'src/app/modules/shared/models/employees_department/tbl-shamel-upgrade-qarars-adjust-print-dialog';

@Component({
  selector: 'app-upgrade-qarars-adjust-print-dialog',
  templateUrl: './upgrade-qarars-adjust-print-dialog.component.html',
  styleUrls: ['./upgrade-qarars-adjust-print-dialog.component.scss']
})
export class UpgradeQararsAdjustPrintDialogComponent implements OnInit {

  options1: string[] = [];
  filteredOptions1: Observable<string[]>;
  options2: string[] = [];
  filteredOptions2: Observable<string[]>;
  
  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options1.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options2.filter(option => option.toLowerCase().includes(filterValue));
  }

  constructor(public dialogRef: MatDialogRef<UpgradeQararsAdjustPrintDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TblShamelUpgradeQararsAdjustPrintDialog,) {
  //   //   if (this.tblshamelclassService.List_ITBLShamelClass == null ||
  //   //     this.tblshamelclassService.List_ITBLShamelClass.length ==0 )
  //   //     this.tblshamelclassService.fill();
  
  //   //     this.tblshamelclassService.List_ITBLShamelClass_BehaviorSubject.subscribe(
  //   //     data=>
  //   //     {
  //   //       // this.List_TBLShamelMalakState = data;
  
  //   //       for(let i =0; i< data.length; i++)
  //   //         this.options1.push(data[i].class_name);
  //   //       this.filteredOptions1 = this.Form.get('fcl_Class').valueChanges.pipe(
  //   //         startWith(''),
  //   //         map(value => this._filter1(value || '')),
  //   //       );
  //   //     }
  //   //     );
  
  //   //     if (this.tblshameljobnameService.list_ITBLShamelJobName == null ||
  //   //       this.tblshameljobnameService.list_ITBLShamelJobName.length ==0 )
  //   //       this.tblshameljobnameService.fill();
    
  //   //       this.tblshameljobnameService.List_ITBLShamelJobName_BehaviorSubject.subscribe(
  //   //       data=>
  //   //       {
  //   //         // this.List_TBLShamelMalakState = data;
    
  //   //         for(let i =0; i< data.length; i++)
  //   //           this.options2.push(data[i].jobname_name);
  //   //         this.filteredOptions2 = this.Form.get('fcl_JobName').valueChanges.pipe(
  //   //           startWith(''),
  //   //           map(value => this._filter2(value || '')),
  //   //         );
  //   //       }
  //   //       );
     }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
