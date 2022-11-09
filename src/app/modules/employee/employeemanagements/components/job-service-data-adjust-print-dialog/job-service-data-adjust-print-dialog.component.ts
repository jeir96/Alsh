import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { TblShamelUpgradeQararsAdjustPrintDialog } from 'src/app/modules/shared/models/employees_department/tbl-shamel-upgrade-qarars-adjust-print-dialog';
import { TblshamelPrintFooterService } from 'src/app/modules/shared/services/employees_department/tblshamel-print-footer.service';
import { TblshamelclassService } from 'src/app/modules/shared/services/employees_department/tblshamelclass.service';

@Component({
  selector: 'app-job-service-data-adjust-print-dialog',
  templateUrl: './job-service-data-adjust-print-dialog.component.html',
  styleUrls: ['./job-service-data-adjust-print-dialog.component.scss']
})
export class JobServiceDataAdjustPrintDialogComponent implements OnInit {

  private readonly _matDialogRef: MatDialogRef<JobServiceDataAdjustPrintDialogComponent>;

  Form = new FormGroup({
    
  });

  
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

  constructor(public dialogRef: MatDialogRef<JobServiceDataAdjustPrintDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TblShamelUpgradeQararsAdjustPrintDialog,
    private tblshamelclassService: TblshamelclassService,
    private tblshamelPrintFooterService: TblshamelPrintFooterService) {

      this._matDialogRef= dialogRef;

      // if (this.tblshamelclassService.List_ITBLShamelClass == null ||
      //   this.tblshamelclassService.List_ITBLShamelClass.length ==0 )
      //   this.tblshamelclassService.fill();
  
      //   this.tblshamelclassService.List_ITBLShamelClass_BehaviorSubject.subscribe(
      //   data=>
      //   {
      //     // this.List_TBLShamelMalakState = data;
  
      //     for(let i =0; i< data.length; i++)
      //       this.options1.push(data[i].class_name);
      //     this.filteredOptions1 = this.Form.get('fcl_addjective1').valueChanges.pipe(
      //       startWith(''),
      //       map(value => this._filter1(value || '')),
      //     );
      //   }
      //   );
  
        // if (this.tblshameljobnameService.list_ITBLShamelJobName == null ||
        //   this.tblshameljobnameService.list_ITBLShamelJobName.length ==0 )
        //   this.tblshameljobnameService.fill();
    
        //   this.tblshameljobnameService.List_ITBLShamelJobName_BehaviorSubject.subscribe(
        //   data=>
        //   {
        //     // this.List_TBLShamelMalakState = data;
    
        //     for(let i =0; i< data.length; i++)
        //       this.options2.push(data[i].jobname_name);
        //     this.filteredOptions2 = this.Form.get('fcl_JobName').valueChanges.pipe(
        //       startWith(''),
        //       map(value => this._filter2(value || '')),
        //     );
        //   }
        //   );
     }

  ngOnInit(): void {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    matDialogConfig.position = { left: `50px`, top: `150px` };
    this._matDialogRef.updatePosition(matDialogConfig.position);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(){
    this.tblshamelPrintFooterService.add(
      {
        form_name: "PrintEmpExperience",
        name1: this.data.name1,
        name2: this.data.name2,
        name3: this.data.name3,
        name4: this.data.name4,
        name5: this.data.name5,
        title1: this.data. title1,
        title2: this.data.title2,
        title3: this.data.title3,
        title4: this.data.title4,
        title5: this.data.title5,
        user_id: 0
      })
  }

}
