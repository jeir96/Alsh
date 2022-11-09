import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { INavData } from "@coreui/angular";
import { IconSetService } from "@coreui/icons-angular";
import { SubscriptionLike } from "rxjs";
import { NavService } from "../shared/components/containers/default-layout/nav.service";







@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
 
})
export class EmployeeComponent implements OnInit , OnDestroy{
  
  
  navItems: INavData[] = [

    {
      title: true,
      name: 'الشؤون الإدارية'
    },
  
    {
      name: 'البطاقة الذاتية',
      url: 'employees/module/employeecards',
      iconComponent: { name: 'cil-pencil' },
    }
    ,
  
    {
      name: 'شؤون العاملين',
      url: 'employees/module/employeeaffairs',
      iconComponent: { name: 'cil-pencil' },
    },
    {
      name: 'الإحصائيات الإدارية',
      iconComponent: { name: 'cil-pencil' },
      url: 'employees/module/statistics',
  
    },
    {
      name: 'الترفيعات الإدارية',
      iconComponent: { name: 'cil-pencil' },
      url: 'employees/module/upgrades',
  
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


