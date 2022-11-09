import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { TblShamelUpgradeYear } from 'src/app/modules/shared/models/employees_department/TblShamelUpgradeYear';
import { CountEmployeeAndQararRequest } from 'src/app/modules/shared/models/employees_department/tblshamelupgrade_help/CountEmployeeAndQararRequest';
import { CountEmployeeAndQararResponse } from 'src/app/modules/shared/models/employees_department/tblshamelupgrade_help/CountEmployeeAndQararResponse';
import { TblShamelUpgradeGovReportService } from 'src/app/modules/shared/services/employees_department/tbl-shamel-upgrade-gov-report.service';
import { TblShamelUpgradeYearService } from 'src/app/modules/shared/services/employees_department/tbl-shamel-upgrade-year.service';
import { TBLShamelUpgradeService } from 'src/app/modules/shared/services/employees_department/tblshamel-upgrade.service';
import { TblshamelclassService } from 'src/app/modules/shared/services/employees_department/tblshamelclass.service';
import { TblshameljobnameService } from 'src/app/modules/shared/services/employees_department/tblshameljobname.service';
import {ITBLShamelJobName} from '../../../../../modules/shared/models/employees_department/ITBLShamelJobName';
@Component({
  selector: 'app-upgrade-promotion-qarars',
  templateUrl: './upgrade-promotion-qarars.component.html',
  styleUrls: ['./upgrade-promotion-qarars.component.scss']
})
export class UpgradePromotionQararsComponent implements OnInit {

  Form = new FormGroup({
    fcl_UpgradeYear: new FormControl(''),
    fcl_Class: new FormControl(''),
    fcl_JobName: new FormControl(''),
    fcl_MaxQararNum: new FormControl(''),
    fcl_QararDate: new FormControl(''),

  });

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


  jobNames : ITBLShamelJobName[] = [];
  jobNameToAdd: string= "";
  jobNameToDelete: string= "";

  getJobName(jobName: string){
    this.jobNameToAdd= jobName;
  }
  selectToDelete(jobName: string){
    this.jobNameToDelete= jobName;
    for(let i= 0; i<this.jobNames.length; i++){
      this.jobNames.forEach(ele=>{
        const element = document.getElementById(ele.jobname_name);
        element.classList.remove('clicked');
      })
    }
    const element = document.getElementById(jobName);
    element.classList.add('clicked');

  }

  addJobName(){
    for(let i= 0; i<this.jobNames.length ; i++)
    if(this.jobNames[i].jobname_name == this.jobNameToAdd)
      return;
      if(this.jobNames.length == 0)
        this.jobNames.push({jobname_id: 1 ,jobname_name: this.jobNameToAdd});
      else
        this.jobNames.push({jobname_id: this.jobNames[length-1].jobname_id+1 ,jobname_name: this.jobNameToAdd});
        this.tblshamelclassService.List_ITBLShamelClass.forEach(ele=>{
          if(ele.class_name == this.Form.get('fcl_Class').value)
            this.tblShamelUpgradeService.CountEmployeeAndQarar({list_tblshameljobName: this.jobNames, class_id: ele.class_id, year_id: +this.Form.get('fcl_UpgradeYear').value, blocked: this.blocked}).subscribe(
              (res: CountEmployeeAndQararResponse) => {
                document.getElementById('one').innerText= res.employees_count==undefined? 0+'': res.employees_count+'';
                document.getElementById('two').innerText= res.qarars_count==undefined? 0+'' : res.qarars_count+'';
              }
            );

        });
  }
  deleteJobName(){
    for(let i= 0; i<this.jobNames.length ; i++)
      if (this.jobNames[i].jobname_name == this.jobNameToDelete)
        this.jobNames.splice(i,1);

  }

  constructor(
    private upgradeYear: TblShamelUpgradeYearService,
    private tblshamelclassService: TblshamelclassService,
    private tblshameljobnameService: TblshameljobnameService,
    private tblShamelUpgradeService : TBLShamelUpgradeService,
    private tblShamelUpgradeGovReportService: TblShamelUpgradeGovReportService) {
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

        this.tblShamelUpgradeService.Get_Upgrade_Max_Qarar_Num().subscribe(
          res =>{
            this.Form.get('fcl_MaxQararNum').setValue(res+"");
            console.log("res",res);
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

  deleteQararNumbers(){
    this.tblShamelUpgradeGovReportService.delete(+this.Form.get('fcl_MaxQararNum').value);
  }

  blocked!: number;
  legalChecked(){
    this.blocked= 2;
  }
  delayChecked(){
    this.blocked= 3;
  }
  
  generateQararNumbers(){
    this.tblShamelUpgradeGovReportService.GenerateUpgradeRreport({list_tblshameljobName: this.jobNames, year_id: +this.Form.get('fcl_UpgradeYear').value, class_id: +this.Form.get('fcl_Class').value, blocked: this.blocked, qarar_num: +this.Form.get('fcl_MaxQararNum').value, qarar_date: this.Form.get('fcl_QararDate').value});
  }
}
