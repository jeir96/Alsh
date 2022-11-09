import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular';
import { NavService } from '../containers/default-layout/nav.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  navItems: INavData[] = [

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
      url: '../employees',
      iconComponent: { name: 'cil-pencil' },
  
    },
   
    {
      name: 'الشؤون المالية' ,
      url: 'finace',
      iconComponent: { name: 'cil-pencil' },
    },
   
    
  ];
  
  constructor( private navService : NavService) { 
    this.navService.navItems_Subject.next(this.navItems);
  }

  ngOnInit(): void {
    this.navService.navItems_Subject.next(this.navItems);
  }

}
