import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeaffairsManageComponent } from './componenets/employeeaffairs-manage.component';



import { TblshamelschealthholidayListComponent } from './componenets/tblshamelschealthholiday/tblshamelschealthholiday-list/tblshamelschealthholiday-list.component';
import { TBLShamelSCLEgalHolidayListComponent } from './componenets/tblshamelsclegalholiday/tblshamel-sc-legal-holiday-list/tblshamel-sc-legal-holiday-list.component';
import { TblshamelscmergeserviceListComponent } from './componenets/tblshamelscmergeservice/tblshamelscmergeservice-list/tblshamelscmergeservice-list.component';
import { TBLShamelSCSuddenHolidayListComponent } from './componenets/tblshamelscsuddenholiday/tblshamel-sc-sudden-holiday-list/tblshamel-sc-sudden-holiday-list.component';
import { EmployeeaffairsComponent } from './employeeaffairs.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'manage',
    pathMatch: 'full'
  },
  {
    path: 'manage',
    component: EmployeeaffairsComponent,
    data:
    {
      title: 'شؤون العاملين'
    },
    children:
      [
        {
          path: '',
          component: EmployeeaffairsManageComponent,
          data:
          {
            title: 'شؤون العاملين'
          },
          children:
            [
              {
                path: 'schealthholiday', component: TblshamelschealthholidayListComponent, data:
                {
                  title: 'الاجازات الصحية'
                }
              },
              {
                path: 'sclegalholiday', component: TBLShamelSCLEgalHolidayListComponent, data:
                {
                  title: 'الاجازات'
                }
              },
              {
                path: 'sclegalholiday', component: TBLShamelSCSuddenHolidayListComponent, data:
                {
                  title: 'الاجازات'
                }
              },
              {
                path: 'scmergeservice', component: TblshamelscmergeserviceListComponent, data:
                {
                  title: 'الاجازات'
                }
              },
              {
                path: 'scsuddenHoliday', component: TBLShamelSCSuddenHolidayListComponent, data:
                {
                  title: 'الإجازات الإضطرارية'
                }
              },

            ]
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeaffairsRoutingModule { }
