import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthComponent } from './components/shatebhealth/health/health.component';
import { PunishmentComponent } from './components/shatebpunishment/punishment/punishment.component';
import { VarTaxComponent } from './components/shatebvartax/var-tax/var-tax.component';
import { ShatebtaxComponent } from './shatebtax.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'manage',
    pathMatch: 'full'
  },
  {
    path: 'manage', component: ShatebtaxComponent, data:
    {
      title: 'أنواع الشطب'
    },
    children:[
      { path: 'health', component: HealthComponent } ,
      { path: 'punishment', component: PunishmentComponent } ,
      { path: 'vartax', component: VarTaxComponent } 
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShatebtaxRoutingModule { }
