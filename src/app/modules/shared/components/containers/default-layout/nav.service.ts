import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { INavData } from '@coreui/angular';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NavService {
  
  public  navItems: INavData[] = [

    {
      name: 'منظومة الشامل',
      url: '/',
      iconComponent: { name: 'cil-speedometer' },
      badge: {
        color: 'info',
        text: 'NEW'
      }
    ,
    },
    {
      name: 'الشؤون الإدارية و ادارة الموارد البشرية' ,
      url: 'employees',
      iconComponent: { name: 'cil-pencil' },
  
    },
   
    {
      name: 'الشؤون المالية' ,
      url: 'finace',
      iconComponent: { name: 'cil-pencil' },
    }
   
    
  ];

  public navItems_Subject : BehaviorSubject< INavData[]>= new BehaviorSubject< INavData[]>(this.navItems);

  constructor() { 
    this.navItems_Subject.subscribe(

    )

  }


  ChangeNav(nav:INavData[])
  {
    this.navItems_Subject.next(nav);
    this.navItems = nav;
  }
}
