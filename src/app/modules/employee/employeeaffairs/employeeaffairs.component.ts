import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { INavData } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { NavService } from '../../shared/components/containers/default-layout/nav.service';

@Component({
  selector: 'app-employeeaffairs',
  templateUrl: './employeeaffairs.component.html',
  
})
export class EmployeeaffairsComponent implements OnInit {


  navItems: INavData[] = [

    {
      title: true,
      name: 'شؤون العاملين'
    },
  
    {
      name: 'الإجازات الصحية',
      url: 'employees/module/employeeaffairs/manage/schealthholiday',
      iconComponent: { name: 'cil-pencil' },
    }
    ,
  
    {
      name: 'الإجازات الإضطرارية',
      url: 'employees/module/employeeaffairs/manage/scsuddenHoliday',
      iconComponent: { name: 'cil-pencil' },
    },
    {
      name: 'الإجازات القانونية',
      iconComponent: { name: 'cil-pencil' },
      url: 'employees/module/employeeaffairs/manage/sclegalholiday',
  
    },
    {
      name: 'صم الخدمة',
      iconComponent: { name: 'cil-pencil' },
      url: 'employees/module/employeeaffairs/manage/scmergeservice',
  
    },
  
    
    {
      title: true,
      name: 'الجداول المساعدة'
    },
    {
      name: 'جداول الترميز',
      iconComponent: { name: 'cil-pencil' },
  
      children: [
  
       
  
      ]
    },
  
  
  
  ];

 

  constructor(private navService:NavService) {
    this.navService.navItems_Subject.next(this.navItems);
  }

  ngOnInit(): void {
    this.navService.navItems_Subject.next(this.navItems);
  }
  

}


