import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ITBLShamelAccounter } from '../../../../shared/models/employees_department/TBLShamelAccounter';
import { ITBLShamelRank } from '../../../../shared/models/employees_department/ITBLShamelRank';
import { TBLShamelUpgradeService } from '../../../../shared/services/employees_department/tblshamel-upgrade.service';
import { TblshamelrankService } from '../../../../shared/services/employees_department/tblshamelrank.service';

@Component({
  selector: 'app-upgrade-prepare-all',
  templateUrl: './upgrade-prepare-all.component.html',
  styleUrls: ['./upgrade-prepare-all.component.scss']
})
export class UpgradePrepareAllComponent implements OnInit {

  Form: UntypedFormGroup ;
  fcl_Auto = new UntypedFormControl();
  AutoValue:number;
  fcl_Rank =new UntypedFormControl();
  fcl_Duration =new UntypedFormControl();
  fcl_Year = new UntypedFormControl();



  
  //Array Of AutoComplere With Filter
  List_TBLShamelRank: ITBLShamelRank[] = [];
  filteredTBLShamelRankOptions: Observable<ITBLShamelRank[]>;


  constructor(
    public TblshamelrankService: TblshamelrankService,
    public ShamelUpgradeService: TBLShamelUpgradeService,    
    private fb: UntypedFormBuilder
  ) { 
    this.Form = this.fb.group({});
    this.Form.addControl('Auto',this.fcl_Auto);
    this.Form.addControl('Duration',this.fcl_Duration);
    this.Form.addControl('Rank',this.fcl_Rank);
    this.Form.addControl('Year',this.fcl_Year);
    


  if (this.TblshamelrankService.list_ITBLShamelRank == null ||
    this.TblshamelrankService.list_ITBLShamelRank == undefined ||
    this.TblshamelrankService.list_ITBLShamelRank.length == 0)
    this.TblshamelrankService.fill();
  this.TblshamelrankService.List_ITBLShamelRank_BehaviorSubject.subscribe(
    data => {
      this.List_TBLShamelRank  = data;
      this.filteredTBLShamelRankOptions = of(this.List_TBLShamelRank);
    }
  )
  }


  


  ngOnInit(): void {
  }

  Apply()
  {

    var rank = this.List_TBLShamelRank.filter(x=>x.rank_id == this.fcl_Rank.value);

    let x =
    {
      'Auto':this.AutoValue,
      'Rank': rank,
      'Duaration':this.fcl_Duration.value,
      'Year':this.fcl_Year.value
    }
    this.ShamelUpgradeService.PrepareAll(x)
  }
}
