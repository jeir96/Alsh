import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { INavData } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { NavService } from '../../shared/components/containers/default-layout/nav.service';


@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  
})
export class UpgradeComponent implements OnInit {

  
  navItems: INavData[] = [

    {
      title: true,
      name: 'الترفيعات'
    },
  
    {
      name: 'احصائية رقم 1',
      url: 'manage/employeeinfo',
      iconComponent: { name: 'cil-pencil' },
    }
    ,
  
    {
      name: 'احصائية رقم 2',
      url: 'manage/newemployee',
      iconComponent: { name: 'cil-pencil' },
    },
    {
      name: 'احصائية رقم 3',
      iconComponent: { name: 'cil-pencil' },
      url: 'manage/education',
  
    },

    {
      name: 'طباعة إحالات القرار',
      iconComponent: { name: 'cil-pencil' },
      url: 'employees/module/upgrades/upgrades/printReferralQarar',
  
    },

    {
      name: 'طباعة قرارات الترفيع',
      iconComponent: { name: 'cil-pencil' },
      url: 'employees/module/upgrades/upgrades/printUpgradeQarars',
  
    },
  
    {
      name: 'استبدال أرقام القرار',
      iconComponent: { name: 'cil-pencil' },
      url: 'employees/module/upgrades/upgrades/replaceQararNumbers',
  
    },

    {
      name: 'تهيئة قرارات الترفيع',
      iconComponent: { name: 'cil-pencil' },
      url: 'employees/module/upgrades/upgrades/upgradePromotionQarars',
  
    },
  
  
  
  
  
  ];
    
  
    constructor(private navService:NavService) {
      this.navService.navItems_Subject.next(this.navItems);
    }
  
  ngOnInit(): void {
    

  }


}

