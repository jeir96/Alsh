import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainEntryTbLShamelNewPayrolAddComponent } from './componenets/newpayroladd/TbLShamelNewPayrol/main-entry-tbl-shamel-new-payrol-add/main-entry-tbl-shamel-new-payrol-add.component';
import { TbLShamelNewPayrolAddComponent } from './componenets/newpayroladd/TbLShamelNewPayrol/tblshamelnewpayroladd/tblshamel-new-payrol-add.component';
import { TBLShamelNewPayrolTaxComponent } from './componenets/newpayroltax/tblshamel-new-payrol-tax/tblshamel-new-payrol-tax.component';
import { PayrolComponent } from './payrol.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'manage',
    pathMatch: 'full'
  },
  {
    path: 'manage', component: PayrolComponent, data:
    {
      title: ''
    },
    children:[
      { path: 'salaryinput', component:  MainEntryTbLShamelNewPayrolAddComponent} ,
      { path: 'ta3weedTaxProgramming', component:  TBLShamelNewPayrolTaxComponent} ,
      
     ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrolRoutingModule { }
