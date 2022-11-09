import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteemployeeComponent } from './components/deleteemployee/deleteemployee/deleteemployee.component';
import { EmployeeManagementComponent } from './components/employee-management.component';
import { EmployeechangeidComponent } from './components/employeechangeid/employeechangeid/employeechangeid.component';
import { JobServiceDataComponent } from './components/job-service-data/job-service-data.component';
import { PrintEmployeeCardComponent } from './components/print-employee-card/print-employee-card.component';
import { EmpShowDataComponent } from './components/tblshamelemployee/emp-show-data/emp-show-data.component';
import { NewEmployeeCardComponent } from './components/tblshamelemployee/new-employee-card/new-employee-card.component';
import { TblshamelincmarsoomlistComponent } from './components/tblshamelincmarsoom/tblshamelincmarsoomlist/tblshamelincmarsoomlist.component';
import { TblshamelscbonuslistComponent } from './components/tblshamelscbonus/tblshamelscbonuslist/tblshamelscbonuslist.component';
import { TblshamelsccourselistComponent } from './components/tblshamelsccourse/tblshamelsccourselist/tblshamelsccourselist.component';
import { TblshamelsceducationlistComponent } from './components/tblshamelsceducation/tblshamelsceducationlist/tblshamelsceducationlist.component';
import { TblshamelscfreeholidaylistComponent } from './components/tblshamelscfreeholiday/tblshamelscfreeholidaylist/tblshamelscfreeholidaylist.component';
import { TblshamelscjobstatelistComponent } from './components/tblshamelscjobstate/tblshamelscjobstatelist/tblshamelscjobstatelist.component';
import { TblshamelscpunishmentlistComponent } from './components/tblshamelscpunishment/tblshamelscpunishmentlist/tblshamelscpunishmentlist.component';
import { EmployeeCardComponent } from './employee-card.component';


import { EncodingComponent } from './encodingtable/encoding.component';
import { TblShamelStateListComponent } from './encodingtable/tbl-shamel-state-list/tbl-shamel-state-list.component';
import { TblShamelBonusListComponent } from './encodingtable/TblShamelBonus/tbl-shamel-bonus-list/tbl-shamel-bonus-list.component';
import { TblShamelBonusReasonListComponent } from './encodingtable/TblShamelBonusReason/tbl-shamel-bonus-reason-list/tbl-shamel-bonus-reason-list.component';
import { TblShamelCertificateListComponent } from './encodingtable/TblShamelCertificate/tbl-shamel-certificate-list/tbl-shamel-certificate-list.component';
import { TblShamelChangeReasonListComponent } from './encodingtable/TblShamelChangeReason/tbl-shamel-change-reason-list/tbl-shamel-change-reason-list.component';
import { TblShamelCourseListComponent } from './encodingtable/TblShamelCourse/tbl-shamel-course-list/tbl-shamel-course-list.component';
import { TblShamelDepartmentListComponent } from './encodingtable/TblShamelDepartment/tbl-shamel-department-list/tbl-shamel-department-list.component';
import { TblShamelDocumentTypeListComponent } from './encodingtable/TblShamelDocumentType/tbl-shamel-document-type-list/tbl-shamel-document-type-list.component';
import { TblShamelFooterh1ListComponent } from './encodingtable/TblShamelFooterh1/tbl-shamel-footerh1-list/tbl-shamel-footerh1-list.component';
import { TblShamelFooterh2ListComponent } from './encodingtable/TblShamelFooterh2/tbl-shamel-footerh2-list/tbl-shamel-footerh2-list.component';
import { TblShamelFreeHolidayReasonListComponent } from './encodingtable/TblShamelFreeHolidayReason/tbl-shamel-free-holiday-reason-list/tbl-shamel-free-holiday-reason-list.component';
import { TblShamelJobKindListComponent } from './encodingtable/TblShamelJobKind/tbl-shamel-job-kind-list/tbl-shamel-job-kind-list.component';
import { TblShamelJobNameListComponent } from './encodingtable/TblShamelJobName/tbl-shamel-job-name-list/tbl-shamel-job-name-list.component';
import { TblShamelPunishmentListComponent } from './encodingtable/TblShamelPunishment/tbl-shamel-punishment-list/tbl-shamel-punishment-list.component';
import { TblShamelPunishmentReasonListComponent } from './encodingtable/TblShamelPunishmentReason/tbl-shamel-punishment-reason-list/tbl-shamel-punishment-reason-list.component';
import { TblShamelRankListComponent } from './encodingtable/TblShamelRank/tbl-shamel-rank-list/tbl-shamel-rank-list.component';
import { TblShamelSpecificationListComponent } from './encodingtable/TblShamelSpecification/tbl-shamel-specification-list/tbl-shamel-specification-list.component';


const routes: Routes = [
{
  path:'',
  redirectTo:'Cards',
  pathMatch:'full'
},
 
  {
    path: 'Cards',
    component: EmployeeCardComponent,
  
    children:[
     
      {
        path: 'manage',
        component: EmployeeManagementComponent,
        
        children: [
    
          {
            path: 'scfreeholiday', component: TblshamelscfreeholidaylistComponent, data:
            {
              title: 'الإجازات الخاصة'
            },
          },
          {
            path: 'AddEmp', component: NewEmployeeCardComponent, data:
            {
              title: 'ذاتية الموظف'
            }
          },
    
    
          {
            path: 'employeeinfo', component: EmpShowDataComponent, data:
            {
              title: 'ذاتية الموظف'
            }
          }
    
          ,
          {
            path: 'newemployee', component: NewEmployeeCardComponent, data:
            {
              title: 'ذاتية الموظف'
            }
          },
          {
            path: 'deleteemployee', component: DeleteemployeeComponent, data:
            {
              title: 'ذاتية الموظف'
            }
          },
          {
            path: 'changeid', component: EmployeechangeidComponent, data:
            {
              title: 'ذاتية الموظف'
            }
          },
    
          {
            path: 'bonus', component: TblshamelscbonuslistComponent, data:
            {
              title: 'ذاتية الموظف'
            }
          },
          {
            path: 'course', component: TblshamelsccourselistComponent, data:
            {
              title: 'ذاتية الموظف'
            }
          },
          {
            path: 'education', component: TblshamelsceducationlistComponent, data:
            {
              title: 'ذاتية الموظف'
            }
          },
    
          {
            path: 'scjobstate', component: TblshamelscjobstatelistComponent, data:
            {
              title: 'ذاتية الموظف'
            }
          }
    
          ,
    
          {
            path: 'punishment', component: TblshamelscpunishmentlistComponent, data:
            {
              title: 'ذاتية الموظف'
            }
          },
    
    
          {
            path: 'changeid', component: EmployeechangeidComponent, data:
            {
              title: 'ذاتية الموظف'
            }
          },
    
          {
            path: 'incmarsoom', component: TblshamelincmarsoomlistComponent, data:
            {
              title: 'ذاتية الموظف'
            }
          },
    
          {
            path: 'deletecardid', component: DeleteemployeeComponent, data:
            {
              title: 'ذاتية الموظف'
            }
          },
          {
            path: 'jobservicedata', component: JobServiceDataComponent, data:
            {
              title: 'بيانات الخدمة'
            }
          }, 
          {
            path: 'printcard', component: PrintEmployeeCardComponent, data:
            {
              title: 'بيانات الخدمة'
            }
          }
        ]
      },
    
      {
        path: 'encoding',
        component: EncodingComponent,
        data:
        {
          title: 'جداول الترميز'
        },
        children:
          [
            { path: 'certificate', component: TblShamelCertificateListComponent },
            { path: 'specification', component: TblShamelSpecificationListComponent },
            { path: 'course', component: TblShamelCourseListComponent },
            { path: 'rank', component: TblShamelRankListComponent },
            { path: 'department', component: TblShamelDepartmentListComponent },
            { path: 'jobkind', component: TblShamelJobKindListComponent },        
            { path: 'jobname', component: TblShamelJobNameListComponent },
            { path: 'state', component: TblShamelStateListComponent },
            { path: 'changereason', component: TblShamelChangeReasonListComponent },        
            { path: 'punishment', component: TblShamelPunishmentListComponent },
            { path: 'punishmentreason', component: TblShamelPunishmentReasonListComponent },      
            { path: 'bonus', component: TblShamelBonusListComponent },
            { path: 'bonusreason', component: TblShamelBonusReasonListComponent },
            { path: 'footerh1', component: TblShamelFooterh1ListComponent },
            { path: 'footerh2', component: TblShamelFooterh2ListComponent },
            { path: 'documenttype', component: TblShamelDocumentTypeListComponent },
            { path: 'freeholidayreason', component: TblShamelFreeHolidayReasonListComponent },        
          ]
      }

    ]
  }
  
  
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EmployeemanageRoutingModule { }

/*

  {
    path: '',
    component:DefaultLayoutComponent,
   
    data:
    {
      title: 'ذاتية الموظف'
    },
    children:
      [       
        {
          path: 'manage',
          component: EmployeeManagementComponent,
          data:
          {
            title: 'ذاتية الموظف'
          },
          children:
            [
              {
                path: 'AddEmp', component: NewEmployeeCardComponent, data:
                {
                  title: 'ذاتية الموظف'
                },
              },
              {
                path: 'EmpNameTest', component: AutoEmployeeNameComponent, data:
                {
                  title: 'ذاتية الموظف'
                }
              },
              {
                path: 'Test', component: TestAutoCompleteEmployeeNameComponent, data:
                {
                  title: 'ذاتية الموظف'
                }
              },
              {
                path: 'employeeinfo', component: EmpShowDataComponent, data:
                {
                  title: 'ذاتية الموظف'
                }
              },
              {
                path: 'newemployee', component: NewEmployeeCardComponent, data:
                {
                  title: 'ذاتية الموظف'
                }
              },
              {
                path: 'deleteemployee', component: DeleteemployeeComponent, data:
                {
                  title: 'ذاتية الموظف'
                }
              },
              {
                path: 'changeid', component: EmployeechangeidComponent, data:
                {
                  title: 'ذاتية الموظف'
                }
              },

              {
                path: 'bonus', component: TblshamelscbonuslistComponent, data:
                {
                  title: 'ذاتية الموظف'
                }
              },
              {
                path: 'course', component: TblshamelsccourselistComponent, data:
                {
                  title: 'ذاتية الموظف'
                }
              },
              {
                path: 'education', component: TblshamelsceducationlistComponent, data:
                {
                  title: 'ذاتية الموظف'
                }
              },
              ,
              {
                path: 'jobstate', component: TblshamelscjobstatelistComponent, data:
                {
                  title: 'ذاتية الموظف'
                }
              },

              {
                path: 'punishment', component: TblshamelscpunishmentlistComponent, data:
                {
                  title: 'ذاتية الموظف'
                }
              },


              {
                path: 'changeid', component: EmployeechangeidComponent, data:
                {
                  title: 'ذاتية الموظف'
                }
              },
              {
                path: 'incmarsoom', component: TblshamelincmarsoomlistComponent, data:
                {
                  title: 'ذاتية الموظف'
                }
              },
              {
                path: 'deletecardid', component: DeleteemployeeComponent, data:
                {
                  title: 'ذاتية الموظف'
                }
              },


              {
                path: 'stats4', component: StatsBetweenDateComponent, data:
                {
                  title: 'ذاتية الموظف'
                }
              },




            ]
        },
        {
          path: 'encoding',
          component: EncodingComponent,
          data:
          {
            title: 'جداول الترميز'
          },
          children:
            [
              { path: 'doctor', component: TblShamelDoctorListComponent },
              { path: 'mergeservice', component: TblShamelMergeServiceReasonListComponent },
              { path: 'suddenholiday', component: TblShamelSuddenHolidayListComponent },
              { path: 'bonus', component: TblShamelBonusListComponent },
              { path: 'bonusreason', component: TblShamelBonusReasonListComponent },
              { path: 'cardpage', component: TBLShamelCardPagesListComponent },
              { path: 'certificate', component: TblShamelCertificateListComponent },
              { path: 'changereason', component: TblShamelChangeReasonListComponent },
              { path: 'course', component: TblShamelCourseListComponent },
              { path: 'department', component: TblShamelDepartmentListComponent },
              { path: 'jobkind', component: TblShamelJobKindListComponent },
              { path: 'punishment', component: TblShamelPunishmentListComponent },
              { path: 'rank', component: TblShamelRankListComponent },
              { path: 'specification', component: TblShamelSpecificationListComponent },
            ]
        }
      ]
  },

*/