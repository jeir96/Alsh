import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EmployeeComponent } from "./employee.component";



const routes: Routes = [
  {
    path: '',
    redirectTo:'module',
    pathMatch:'full'
  },

 
  {
    path: 'module',
    component: EmployeeComponent,
   
    children:[
      {
        path: 'employeecards',
    
        data: {
          title: 'البطاقة الذاتية'
        },
        loadChildren: () => import("./employeemanagements/employeemanage.module").then(m => m.EmployeemanageModule)
      },
      {
        path: 'employeeaffairs',
    
        data: {
          title: 'شؤون العاملين'
        },
        loadChildren: () => import("./employeeaffairs/employeeaffairs.module").then(m => m.EmployeeaffairsModule)
      },
      {
        path: 'statistics',
    
        data: {
          title: 'الإحصائيات الإدارية'
        },
        loadChildren: () => import("./statistics/statistics.module").then(m => m.StatisticsModule)
      }
      , {
        path: 'upgrades',
    
        data: {
          title: 'الترفيعات الإدارية'
        },
        loadChildren: () => import("./upgrades/upgrade.module").then(m => m.UpgradeModule)
      }
    ]
  }
     

    
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }


