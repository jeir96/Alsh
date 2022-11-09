import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokerComponent } from './broker.component';
import { TblshamelBrokerEmployeeListComponent } from './components/tblShamelBrokerEmployee/tblshamel-broker-employee-list/tblshamel-broker-employee-list.component';
import { TblShamelBrokerPrintTotalsListComponent } from './components/tblShamelBrokerPrintTotals/tbl-shamel-broker-print-totals-list/tbl-shamel-broker-print-totals-list.component';
import { TblShamelBrokerShatebListComponent } from './components/tblShamelBrokerShateb/tbl-shamel-broker-shateb-list/tbl-shamel-broker-shateb-list.component';
import { TBLShamelOvertimeEmployeeListComponent } from './components/tblShamelOvertimeEmployee/tblshamel-overtime-employee-list/tblshamel-overtime-employee-list.component';
import { TblShamelOvertimePrintTotalsListComponent } from './components/tblShamelOvertimePrintTotals/tbl-shamel-overtime-print-totals-list/tbl-shamel-overtime-print-totals-list.component';
import { TblShamelOvertimeShatebListComponent } from './components/tblShamelOvertimeShateb/tbl-shamel-overtime-shateb-list/tbl-shamel-overtime-shateb-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'manage',
    pathMatch: 'full'
  },
  {
    path: 'manage', component: BrokerComponent, data:
    {
      title: 'الوكلاء'
    },
    children:[
      { path: 'overtime', component: TBLShamelOvertimeEmployeeListComponent }  ,
      { path: 'overttimeshateb', component: TblShamelOvertimeShatebListComponent } , 
      { path: 'overttimestatistics', component: TblShamelOvertimePrintTotalsListComponent }  ,
      { path: 'broker', component: TblshamelBrokerEmployeeListComponent }  ,
      { path: 'brokershateb', component: TblShamelBrokerShatebListComponent } , 
      { path: 'brokerstatistics', component: TblShamelBrokerPrintTotalsListComponent }  ,
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokerRoutingModule { }
