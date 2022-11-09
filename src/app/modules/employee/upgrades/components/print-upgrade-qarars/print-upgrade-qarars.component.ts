import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { TblShamelUpgradeQararHF } from 'src/app/modules/shared/models/employees_department/tbl-shamel-upgrade-qarar-hf';
import { TblShamelUpgradeQararHFService } from 'src/app/modules/shared/services/employees_department/tbl-shamel-upgrade-qarar-hf.service';
import { TblShamelUpgradeYearService } from 'src/app/modules/shared/services/employees_department/tbl-shamel-upgrade-year.service';
import { TblshamelclassService } from 'src/app/modules/shared/services/employees_department/tblshamelclass.service';
import { TblshameljobnameService } from 'src/app/modules/shared/services/employees_department/tblshameljobname.service';
import {map, startWith} from 'rxjs/operators';
import { TblShamelUpgradeYear } from 'src/app/modules/shared/models/employees_department/TblShamelUpgradeYear';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UpgradeQararsAdjustPrintDialogComponent } from '../upgrade-qarars-adjust-print-dialog/upgrade-qarars-adjust-print-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-print-upgrade-qarars',
  templateUrl: './print-upgrade-qarars.component.html',
  styleUrls: ['./print-upgrade-qarars.component.scss']
})
export class PrintUpgradeQararsComponent implements OnInit {

  List_TblShamelUpgradeQararHF: TblShamelUpgradeQararHF[]= [];
  List_Header: TblShamelUpgradeQararHF[]= [];
  List_Footer1: TblShamelUpgradeQararHF[]= [];
  List_Footer2: TblShamelUpgradeQararHF[]= [];

  headerCurrentIndex = 0;
  footer1CurrentIndex = 0;
  footer2CurrentIndex = 0;

  Form = new FormGroup({
    fcl_UpgradeYear: new FormControl(''),
    fcl_Class: new FormControl(''),
    fcl_JobName: new FormControl(''),
    fcl_FirstQararNum: new FormControl(''),
    fcl_LastQararNum: new FormControl(''),
    fcl_DoNotPrint: new FormControl(''),
  });

  jobNameToAdd: string= "";
  classToAdd: string= "";
  upgradeYearToAdd: string= "";


  // Filtering
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
  
  constructor(
    private tblShamelUpgradeQararHFService: TblShamelUpgradeQararHFService,
    private upgradeYear: TblShamelUpgradeYearService,
    private tblshamelclassService: TblshamelclassService,
    private tblshameljobnameService: TblshameljobnameService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
    ) {

    if (this.tblShamelUpgradeQararHFService.List_TblShamelUpgradeQararHF == null ||
      this.tblShamelUpgradeQararHFService.List_TblShamelUpgradeQararHF.length ==0 )
      this.tblShamelUpgradeQararHFService.fill();

      this.tblShamelUpgradeQararHFService.List_TblShamelUpgradeQararHF_BehaviorSubject.subscribe(
      data=>
      {
        this.List_TblShamelUpgradeQararHF= data;
        
        for(let i = 0; i< this.List_TblShamelUpgradeQararHF.length; i++)
          if(this.List_TblShamelUpgradeQararHF[i].kind == 1)
            this.List_Header.push(this.List_TblShamelUpgradeQararHF[i]);
          else if(this.List_TblShamelUpgradeQararHF[i].kind == 2)
            this.List_Footer1.push(this.List_TblShamelUpgradeQararHF[i]);
          else if(this.List_TblShamelUpgradeQararHF[i].kind == 3)
            this.List_Footer2.push(this.List_TblShamelUpgradeQararHF[i]);
        
        const headerTextArea = document.getElementById('header');
        headerTextArea.textContent= this.List_Header[0].textinside;
        console.log(this.List_Header);

        const headerNumber = document.getElementById('headerNumber');
        headerNumber.textContent= this.List_Header.length+'';

        const footer1TextArea = document.getElementById('footer1');
        footer1TextArea.textContent= this.List_Footer1[0].textinside;

        const footer1Number = document.getElementById('footer1Number');
        footer1Number.textContent= this.List_Footer1.length+'';

        const footer2TextArea = document.getElementById('footer2');
        footer2TextArea.textContent= this.List_Footer2[0].textinside;

        const footer2Number = document.getElementById('footer2Number');
        footer2Number.textContent= this.List_Footer2.length+'';
      }
      );


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
   }

  ngOnInit(): void {
  }

  addHeader(){
    const headerTextArea = document.getElementById('header');
    this.tblShamelUpgradeQararHFService.add({serial: this.List_Header[this.List_Header.length-1].serial+1, kind: 1, fixed: 0, textinside: headerTextArea.textContent});
  }

  updateHeader(){
    const headerTextArea = document.getElementById('header');
    this.tblShamelUpgradeQararHFService.update({serial: this.List_Header[this.headerCurrentIndex].serial, kind: 1, fixed: 0, textinside: headerTextArea.textContent});
  }

  nextHeader(){
    const headerTextArea = document.getElementById('header');
    if(this.headerCurrentIndex < this.List_Header.length)
      headerTextArea.textContent= this.List_Header[++this.headerCurrentIndex].textinside;
  }

  previousHeader(){
    const headerTextArea = document.getElementById('header');
    if(this.headerCurrentIndex > 0 )
      headerTextArea.textContent= this.List_Header[--this.headerCurrentIndex].textinside;
  }


  addFooter1(){
    const footer1TextArea = document.getElementById('footer1');
    this.tblShamelUpgradeQararHFService.add({serial: this.List_Footer1[this.List_Footer1.length-1].serial+1, kind: 2, fixed: 0, textinside: footer1TextArea.textContent});

  }

  updateFooter1(){
    const footer1TextArea = document.getElementById('footer1');
    this.tblShamelUpgradeQararHFService.update({serial: this.List_Footer1[this.footer1CurrentIndex].serial, kind: 2, fixed: 0, textinside: footer1TextArea.textContent});
    
  }

  nextFooter1(){
    const footer1TextArea = document.getElementById('footer1');
    if(this.footer1CurrentIndex < this.List_Footer1.length)
      footer1TextArea.textContent= this.List_Footer1[++this.footer1CurrentIndex].textinside;
  }

  previousFooter1(){
    const footer1TextArea = document.getElementById('footer1');
    if(this.footer1CurrentIndex > 0)
      footer1TextArea.textContent= this.List_Footer1[--this.footer1CurrentIndex].textinside;
  }


  addFooter2(){
    const footer2TextArea = document.getElementById('footer2');
    this.tblShamelUpgradeQararHFService.add({serial: this.List_Footer2[this.List_Footer2.length-1].serial+1, kind: 3, fixed: 0, textinside: footer2TextArea.textContent});

  }

  updateFooter2(){
    const footer2TextArea = document.getElementById('footer2');
    this.tblShamelUpgradeQararHFService.update({serial: this.List_Footer2[this.footer2CurrentIndex].serial, kind: 3, fixed: 0, textinside: footer2TextArea.textContent});
    
  }

  nextFooter2(){
    const footer2TextArea = document.getElementById('footer2');
    if(this.footer2CurrentIndex < this.List_Footer2.length)
      footer2TextArea.textContent= this.List_Footer2[++this.footer2CurrentIndex].textinside;
  }

  previousFooter2(){
    const footer2TextArea = document.getElementById('footer2');
    if(this.footer2CurrentIndex > 0)
      footer2TextArea.textContent= this.List_Footer2[--this.footer2CurrentIndex].textinside;
  }


  getJobName(jobNameTodAdd: string){
    this.jobNameToAdd= jobNameTodAdd;
  }

  getClass(classToAdd: string){
    this.classToAdd= classToAdd;
  }

  getUpgradeYear(upgradeYearToAdd: string){
    this.upgradeYearToAdd= upgradeYearToAdd;
  }


  adjustPrintFooter(){
    const dialogRef = this.dialog.open(UpgradeQararsAdjustPrintDialogComponent, {
      width: '1150px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  print(){
    if(this.Form.get('fcl_UpgradeYear').value == null || this.Form.get('fcl_Class').value == null || this.Form.get('fcl_JobName').value == null || this.Form.get('fcl_FirstQararNum').value == null || this.Form.get('fcl_LastQararNum').value == null)
      this._snackBar.open('يجب اختيار الفئة والصفة الوظيفية أو رقم القرار', '', {
        duration: 5000
      });
    else{

    }
    
  }
}
