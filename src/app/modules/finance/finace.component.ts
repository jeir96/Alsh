import { Component, OnInit } from "@angular/core";
import { INavData } from "@coreui/angular";
import { NavService } from "../shared/components/containers/default-layout/nav.service";


@Component({
  selector: 'app-finace',
  templateUrl: './finace.component.html',
  styleUrls: ['./finace.component.scss']
})
export class FinaceComponent implements OnInit {
  
  

  navItems: INavData[] = [

    {
      name: 'القسم المالي',
      url: '/',
      iconComponent: { name: 'cil-speedometer' },
      badge: {
        color: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'الوكلاء' ,
      url: 'finace/module/broker',
      iconComponent: { name: 'cil-pencil' },
  
    },
   
    {
      name: 'الحسميات' ,
      url: 'finace/module/shatebtax',
      iconComponent: { name: 'cil-pencil' },
    }
    ,
    {
      name: 'الرواتب' ,
      url: 'finace/module/shatebpayrol',
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