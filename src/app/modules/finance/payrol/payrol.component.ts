import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular';
import { NavService } from '../../shared/components/containers/default-layout/nav.service';

@Component({
  selector: 'app-payrol',
  templateUrl: './payrol.component.html',
  styleUrls: ['./payrol.component.scss']
})
export class PayrolComponent implements OnInit {

  navItems: INavData[] = [

    {
      name: 'الرواتب',
      url: '/',
      iconComponent: { name: 'cil-speedometer' },
      badge: {
        color: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'إدخال بيانات الراتب' ,
      url: 'finace/module/shatebpayrol/manage/salaryinput',
      iconComponent: { name: 'cil-pencil' },
  
    },
   
    {
      name: 'برمجة التعويض والحسم' ,
      url: 'finace/module/shatebpayrol/manage/ta3weedTaxProgramming',
      iconComponent: { name: 'cil-pencil' },
    }
    
   
    
  ];

   




 
constructor(private navService:NavService) {
  this.navService.navItems_Subject.next(this.navItems);
 
}

ngOnInit(): void {
  this.navService.navItems_Subject.next(this.navItems);
}

ngOnDestroy() {
  
}

}