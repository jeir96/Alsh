import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { FinaceComponent } from './finace.component';

const routes: Routes = [

  {
    path: '',
    redirectTo:'module',
    pathMatch:'full'
  },
 
  {
    path: 'module',
    component: FinaceComponent,
   
    children:[
      {
        path: 'broker',
    
        data: {
          title: 'الوكلاء و الساعات'
        },
        loadChildren: () => import("./broker/broker.module").then(m => m.BrokerModule)
      },
      {
        path: 'shatebtax',
    
        data: {
          title: 'الحسميات'
        },
        loadChildren: () => import("./shatebtax/shatebtax.module").then(m => m.ShatebtaxModule)
      },
      {
        path: 'shatebpayrol',
    
        data: {
          title: 'الرواتب'
        },
        loadChildren: () => import("./payrol/payrol.module").then(m => m.PayrolModule)
      }

    ]
  }
     

    
 
];

  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
