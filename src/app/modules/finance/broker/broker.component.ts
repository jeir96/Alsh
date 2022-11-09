import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular';
import { NavService } from '../../shared/components/containers/default-layout/nav.service';


@Component({
  selector: 'app-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.scss']
})
export class BrokerComponent implements OnInit {
  
  
  navItems: INavData[] = [

    {
      name: 'شطب الوكلاء',
      url: '/',
      iconComponent: { name: 'cil-speedometer' },
      badge: {
        color: 'info',
        text: 'NEW'
      }
    },
    {
      name: ' ذاتية الساعات' ,
      url: 'finace/module/broker/manage/overtime',
      iconComponent: { name: 'cil-pencil' },
  
    },
    {
      name: ' سجل شطب الساعات' ,
      url: 'finace/module/broker/manage/overttimeshateb',
      iconComponent: { name: 'cil-pencil' },
  
    },
    {
      name: ' احصائيات الساعات' ,
      url: 'finace/module/broker/manage/overttimestatistics',
      iconComponent: { name: 'cil-pencil' },
  
    },

    {
      name: ' ذاتية الوكلاء' ,
      url: 'finace/module/broker/manage/broker',
      iconComponent: { name: 'cil-pencil' },
  
    },
   
    {
      name: ' سجل شطب الوكلاء' ,
      url: 'finace/module/broker/manage/brokershateb',
      iconComponent: { name: 'cil-pencil' },
  
    },

    {
      name: ' احصائيات الوكلاء' ,
      url: 'finace/module/broker/manage/brokerstatistics',
      iconComponent: { name: 'cil-pencil' },
  
    },
   
    
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