import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular';
import { NavService } from '../../shared/components/containers/default-layout/nav.service';

@Component({
  selector: 'app-shatebtax',
  templateUrl: './shatebtax.component.html',
  styleUrls: ['./shatebtax.component.scss']
})
export class ShatebtaxComponent implements OnInit {


  navItems: INavData[] = [

    {
      name: 'شطب',
      url: '/',
      iconComponent: { name: 'cil-speedometer' },
      badge: {
        color: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'شطب الإجازات الصحية' ,
      url: 'finace/module/shatebtax/manage/health',
      iconComponent: { name: 'cil-pencil' },
  
    },
   
    {
      name: 'شطب العقوبات' ,
      url: 'finace/module/shatebtax/manage/punishment',
      iconComponent: { name: 'cil-pencil' },
    }
    ,
    {
      name: 'شطب الحسميات' ,
      url: 'finace/module/shatebtax/manage/vartax',
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