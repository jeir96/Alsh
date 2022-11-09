import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router,NavigationEnd } from '@angular/router';
import { INavData } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { NavService } from './modules/shared/components/containers/default-layout/nav.service';
import { iconSubset } from './modules/shared/components/icons/icon-subset';
import { IGlobalEmployeeList } from './modules/shared/services/employees_department/IGlobalEmployeeList';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'منظومة الشامل الإدارية و المالية';

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
      url: 'employees',
      iconComponent: { name: 'cil-pencil' },
  
    },
   
    {
      name: 'الشؤون المالية' ,
      url: 'finace',
      iconComponent: { name: 'cil-pencil' },
    }
   
    
  ];
  
  constructor(
    private router: Router,
   private navService:NavService,
    private titleService: Title,
    private iconSetService: IconSetService
  ) {
    this.navService.navItems_Subject.next(this.navItems);
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
    
  }

  ngOnInit(): void {
    this.navService.navItems_Subject.next(this.navItems);
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}



