import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './statistics.component';
import { StatsBetweenDateComponent } from './stats-between-date/stats-between-date.component';
import { Stats1Component } from './stats1/stats1.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'models',
    pathMatch: 'full'
  },
  {
    path: 'models', component: StatisticsComponent, data:
    {
      title: 'نماذج الإحصائيات'
    },
    children:[
      {
        path: 'stats1', component: Stats1Component, data:
        {
          title: 'احصائية رقم 1'
        }
      },
      {
        path: 'stats2', component: StatsBetweenDateComponent, data:
        {
          title: 'احصائية رقم 2'
        }
      }
    ]
  }
            
           
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
