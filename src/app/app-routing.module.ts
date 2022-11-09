import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AuthGuardServiceService as AuthGuard
} from './Global/auth-guard-service.service'


import { DefaultLayoutComponent } from './modules/shared/components/containers';
import { LoginComponent } from './modules/shared/components/login/login.component';
import { MainComponent } from './modules/shared/components/main/main.component';
import { Page404Component } from './modules/shared/components/page404/page404.component';
import { Page500Component } from './modules/shared/components/page500/page500.component';

/*
*/
const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
  {
    path: 'dashboard',
    component:MainComponent
  },
      {
        path: 'employees',
        data: {
          title: 'شؤون العاملين'
        },
        canActivate: [AuthGuard],
        loadChildren: () => import("./modules/employee/employee.module").then(m => m.EmployeeModule)
      },
      {
        path: 'finace',
        data: {
          title: 'الشؤون المالية'
        },
    
        canActivate: [AuthGuard],
        loadChildren: () => import("./modules/finance/finance.module").then(m => m.FinanceModule)
      }
    ]

  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'تسجيل دخول إلى منظومة الشامل'
    }
  }
  ,
  
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes /*, { enableTracing: true }*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
