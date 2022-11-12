import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 

import { MatMomentDateModule, MomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';

import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog'; 
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatPaginatorModule } from '@angular/material/paginator'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatInputModule} from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatListModule} from '@angular/material/list'; 
import {MatRadioModule} from '@angular/material/radio'; 

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
//component 

import {MatSelectModule} from '@angular/material/select'; 

import {MatButtonToggleModule} from '@angular/material/button-toggle';



import { MatSortModule } from '@angular/material/sort';

//////////////////////////////

import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};



import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule  
} from '@coreui/angular';


import { IconModule } from '@coreui/icons-angular';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MY_DATE_FORMATS } from '../../shared/models/employees_department/MY_DATE_FORMATS';



import { ConfirmationdialogComponent } from './components/common/confirmationdialog/confirmationdialog.component';
import { DeleteemployeeComponent } from './components/deleteemployee/deleteemployee/deleteemployee.component';
import { EmployeeListSearchComponent } from './components/employee-list-search/employee-list-search.component';
import { EmployeeManagementComponent } from './components/employee-management.component';
import { EmployeeSearchBarComponent } from './components/employee-search-bar/employee-search-bar.component';
import { EmployeechangeidComponent } from './components/employeechangeid/employeechangeid/employeechangeid.component';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';
import { DataEntryDialogComponent } from './components/tblshamelemployee/data-entry-dialog/data-entry-dialog.component';
import { EditEmployeeCardComponent } from './components/tblshamelemployee/edit-employee-card/edit-employee-card.component';
import { EmpShowDataComponent } from './components/tblshamelemployee/emp-show-data/emp-show-data.component';
import { EmployeeSeachDialogComponent } from './components/employee-seach-dialog/employee-seach-dialog.component';
import { NewEmployeeCardComponent } from './components/tblshamelemployee/new-employee-card/new-employee-card.component';
import { ManagementTBLShamelEmployeeDocPicComponent } from './components/TBLShamelEmployeeDocPic/management-tblshamel-employee-doc-pic/management-tblshamel-employee-doc-pic.component';
import { TBLShamelEmployeeDocPicComponent } from './components/TBLShamelEmployeeDocPic/tblshamel-employee-doc-pic/tblshamel-employee-doc-pic.component';
import { TblshamelincmarsoomlistComponent } from './components/tblshamelincmarsoom/tblshamelincmarsoomlist/tblshamelincmarsoomlist.component';
import { TblshamelincmarsoommodifyComponent } from './components/tblshamelincmarsoom/tblshamelincmarsoommodify/tblshamelincmarsoommodify.component';
import { TblshamelscbonuslistComponent } from './components/tblshamelscbonus/tblshamelscbonuslist/tblshamelscbonuslist.component';
import { TblshamelscbonusmodifyComponent } from './components/tblshamelscbonus/tblshamelscbonusmodify/tblshamelscbonusmodify.component';
import { TblshamelsccourselistComponent } from './components/tblshamelsccourse/tblshamelsccourselist/tblshamelsccourselist.component';
import { TblshamelsccoursemodifyComponent } from './components/tblshamelsccourse/tblshamelsccoursemodify/tblshamelsccoursemodify.component';
import { TblshamelsceducationlistComponent } from './components/tblshamelsceducation/tblshamelsceducationlist/tblshamelsceducationlist.component';
import { TblshamelsceducationmodifyComponent } from './components/tblshamelsceducation/tblshamelsceducationmodify/tblshamelsceducationmodify.component';
import { TblshamelscjobstatelistComponent } from './components/tblshamelscjobstate/tblshamelscjobstatelist/tblshamelscjobstatelist.component';
import { TblshamelscjobstatemodifyComponent } from './components/tblshamelscjobstate/tblshamelscjobstatemodify/tblshamelscjobstatemodify.component';
import { TblshamelsccancelpunishmentmodifyComponent } from './components/tblshamelscpunishment/tblshamelsccancelpunishmentmodify/tblshamelsccancelpunishmentmodify.component';
import { TblshamelscpunishmentlistComponent } from './components/tblshamelscpunishment/tblshamelscpunishmentlist/tblshamelscpunishmentlist.component';
import { TblshamelscpunishmentmodifyComponent } from './components/tblshamelscpunishment/tblshamelscpunishmentmodify/tblshamelscpunishmentmodify.component';
import { EncodingComponent } from './encodingtable/encoding.component';
import { TblShamelBonusAddComponent } from './encodingtable/TblShamelBonus/tbl-shamel-bonus-add/tbl-shamel-bonus-add.component';
import { TblShamelBonusListComponent } from './encodingtable/TblShamelBonus/tbl-shamel-bonus-list/tbl-shamel-bonus-list.component';
import { TblShamelBonusReasonAddComponent } from './encodingtable/TblShamelBonusReason/tbl-shamel-bonus-reason-add/tbl-shamel-bonus-reason-add.component';
import { TblShamelBonusReasonListComponent } from './encodingtable/TblShamelBonusReason/tbl-shamel-bonus-reason-list/tbl-shamel-bonus-reason-list.component';
import { TBLShamelCardPagesAddComponent } from './encodingtable/TBLShamelCardPages/tblshamel-card-pages-add/tblshamel-card-pages-add.component';
import { TBLShamelCardPagesListComponent } from './encodingtable/TBLShamelCardPages/tblshamel-card-pages-list/tblshamel-card-pages-list.component';
import { TblShamelCertificateAddComponent } from './encodingtable/TblShamelCertificate/tbl-shamel-certificate-add/tbl-shamel-certificate-add.component';
import { TblShamelCertificateListComponent } from './encodingtable/TblShamelCertificate/tbl-shamel-certificate-list/tbl-shamel-certificate-list.component';
import { TblShamelChangeReasonAddComponent } from './encodingtable/TblShamelChangeReason/tbl-shamel-change-reason-add/tbl-shamel-change-reason-add.component';
import { TblShamelChangeReasonListComponent } from './encodingtable/TblShamelChangeReason/tbl-shamel-change-reason-list/tbl-shamel-change-reason-list.component';
import { TblShamelCourseAddComponent } from './encodingtable/TblShamelCourse/tbl-shamel-course-add/tbl-shamel-course-add.component';
import { TblShamelCourseListComponent } from './encodingtable/TblShamelCourse/tbl-shamel-course-list/tbl-shamel-course-list.component';
import { TblShamelDepartmentAddComponent } from './encodingtable/TblShamelDepartment/tbl-shamel-department-add/tbl-shamel-department-add.component';
import { TblShamelDepartmentListComponent } from './encodingtable/TblShamelDepartment/tbl-shamel-department-list/tbl-shamel-department-list.component';
import { TblShamelDoctorAddComponent } from './encodingtable/TblShamelDoctor/tbl-shamel-doctor-add/tbl-shamel-doctor-add.component';
import { TblShamelDoctorListComponent } from './encodingtable/TblShamelDoctor/tbl-shamel-doctor-list/tbl-shamel-doctor-list.component';
import { TblShamelFreeHolidayReasonAddComponent } from './encodingtable/TblShamelFreeHolidayReason/tbl-shamel-free-holiday-reason-add/tbl-shamel-free-holiday-reason-add.component';
import { TblShamelFreeHolidayReasonListComponent } from './encodingtable/TblShamelFreeHolidayReason/tbl-shamel-free-holiday-reason-list/tbl-shamel-free-holiday-reason-list.component';
import { TblShamelJobKindAddComponent } from './encodingtable/TblShamelJobKind/tbl-shamel-job-kind-add/tbl-shamel-job-kind-add.component';
import { TblShamelJobKindListComponent } from './encodingtable/TblShamelJobKind/tbl-shamel-job-kind-list/tbl-shamel-job-kind-list.component';
import { TblShamelMergeServiceReasonAddComponent } from './encodingtable/TblShamelMergeServiceReason/tbl-shamel-merge-service-reason-add/tbl-shamel-merge-service-reason-add.component';
import { TblShamelMergeServiceReasonListComponent } from './encodingtable/TblShamelMergeServiceReason/tbl-shamel-merge-service-reason-list/tbl-shamel-merge-service-reason-list.component';
import { TblShamelPunishmentAddComponent } from './encodingtable/TblShamelPunishment/tbl-shamel-punishment-add/tbl-shamel-punishment-add.component';
import { TblShamelPunishmentListComponent } from './encodingtable/TblShamelPunishment/tbl-shamel-punishment-list/tbl-shamel-punishment-list.component';
import { TblShamelPunishmentReasonAddComponent } from './encodingtable/TblShamelPunishmentReason/tbl-shamel-punishment-reason-add/tbl-shamel-punishment-reason-add.component';
import { TblShamelPunishmentReasonListComponent } from './encodingtable/TblShamelPunishmentReason/tbl-shamel-punishment-reason-list/tbl-shamel-punishment-reason-list.component';
import { TblShamelRankAddComponent } from './encodingtable/TblShamelRank/tbl-shamel-rank-add/tbl-shamel-rank-add.component';
import { TblShamelRankListComponent } from './encodingtable/TblShamelRank/tbl-shamel-rank-list/tbl-shamel-rank-list.component';
import { TblShamelSpecificationAddComponent } from './encodingtable/TblShamelSpecification/tbl-shamel-specification-add/tbl-shamel-specification-add.component';
import { TblShamelSpecificationListComponent } from './encodingtable/TblShamelSpecification/tbl-shamel-specification-list/tbl-shamel-specification-list.component';
import { TblShamelSuddenHolidayAddComponent } from './encodingtable/TblShamelSuddenHoliday/tbl-shamel-sudden-holiday-add/tbl-shamel-sudden-holiday-add.component';
import { TblShamelSuddenHolidayListComponent } from './encodingtable/TblShamelSuddenHoliday/tbl-shamel-sudden-holiday-list/tbl-shamel-sudden-holiday-list.component';


import { EmployeemanageRoutingModule } from './employeemanage-routing.module';
import { TblshamelscfreeholidaylistComponent } from './components/tblshamelscfreeholiday/tblshamelscfreeholidaylist/tblshamelscfreeholidaylist.component';
import { TblshamelscfreeholidaymodifyComponent } from './components/tblshamelscfreeholiday/tblshamelscfreeholidaymodify/tblshamelscfreeholidaymodify.component';
import { TblShamelJobNameListComponent } from './encodingtable/TblShamelJobName/tbl-shamel-job-name-list/tbl-shamel-job-name-list.component';
import { TblShamelStateListComponent } from './encodingtable/tbl-shamel-state-list/tbl-shamel-state-list.component';

import { TblShamelFooterh1ListComponent } from './encodingtable/TblShamelFooterh1/tbl-shamel-footerh1-list/tbl-shamel-footerh1-list.component';
import { TblShamelFooterh2ListComponent } from './encodingtable/TblShamelFooterh2/tbl-shamel-footerh2-list/tbl-shamel-footerh2-list.component';
import { TblShamelDocumentTypeListComponent } from './encodingtable/TblShamelDocumentType/tbl-shamel-document-type-list/tbl-shamel-document-type-list.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { EmployeeCardComponent } from './employee-card.component';
import { PrintEmployeeCardComponent } from './components/print-employee-card/print-employee-card.component';
import { JobServiceDataComponent } from './components/job-service-data/job-service-data.component';
import { JobServiceDataAdjustPrintDialogComponent } from './components/job-service-data-adjust-print-dialog/job-service-data-adjust-print-dialog.component';




/////////////////////////////




export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  }
};



@NgModule({
  declarations: [
  
    NewEmployeeCardComponent,
    EditEmployeeCardComponent,
    EmpShowDataComponent,
    EmployeeSeachDialogComponent,
    DataEntryDialogComponent,
    
    ConfirmationdialogComponent,
    TblshamelsceducationlistComponent,
    TblshamelsceducationmodifyComponent,
    TblshamelsccourselistComponent,
    TblshamelsccoursemodifyComponent,
    TblshamelscjobstatelistComponent,
    TblshamelscjobstatemodifyComponent,
    TblshamelscbonuslistComponent,
    TblshamelscbonusmodifyComponent,
  
    TblshamelscpunishmentlistComponent,
    TblshamelscpunishmentmodifyComponent,
    TblshamelsccancelpunishmentmodifyComponent,
    TblshamelincmarsoomlistComponent,
    TblshamelincmarsoommodifyComponent,
    EmployeechangeidComponent,
    DeleteemployeeComponent,
    TBLShamelEmployeeDocPicComponent,
    ManagementTBLShamelEmployeeDocPicComponent,
    EmployeeSearchBarComponent,
  
    ListEmployeeComponent,
  
  
  
  
  
   
    EmployeeManagementComponent,
    EmployeeListSearchComponent,
   
  
  
  
  
  
  

    EncodingComponent,
    TblShamelBonusAddComponent,
    TblShamelBonusListComponent,
    TblShamelBonusReasonAddComponent,
    TblShamelBonusReasonListComponent,
    TBLShamelCardPagesAddComponent,
    TBLShamelCardPagesListComponent,
    TblShamelCertificateAddComponent,
    TblShamelCertificateListComponent,
    TblShamelChangeReasonAddComponent,
    TblShamelChangeReasonListComponent,
    TblShamelCourseAddComponent,
    TblShamelCourseListComponent,
    TblShamelDepartmentAddComponent,
    TblShamelDepartmentListComponent,
    TblShamelDoctorAddComponent,
    TblShamelDoctorListComponent,
    TblShamelFreeHolidayReasonAddComponent,
    TblShamelFreeHolidayReasonListComponent,
    TblShamelJobKindAddComponent,
    TblShamelJobKindListComponent,
    TblShamelMergeServiceReasonAddComponent,
    TblShamelMergeServiceReasonListComponent,
    TblShamelPunishmentAddComponent,
    TblShamelPunishmentListComponent,
    TblShamelPunishmentReasonAddComponent,
    TblShamelPunishmentReasonListComponent,
    TblShamelRankAddComponent,
    TblShamelRankListComponent,
    TblShamelSpecificationAddComponent,
    TblShamelSpecificationListComponent,
    TblShamelSuddenHolidayAddComponent,
    TblShamelSuddenHolidayListComponent,
    TblshamelscfreeholidaylistComponent,
    TblshamelscfreeholidaymodifyComponent,
    TblShamelJobNameListComponent,
    TblShamelStateListComponent,
    
    TblShamelFooterh1ListComponent,
    TblShamelFooterh2ListComponent,
    TblShamelDocumentTypeListComponent,
    EmployeeCardComponent,
    PrintEmployeeCardComponent,
    JobServiceDataComponent,
    JobServiceDataAdjustPrintDialogComponent
  ],
  imports: [  
    CommonModule,
    RouterModule,
    
    MatCardModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,    
    MatGridListModule,
    ScrollingModule ,
    MatToolbarModule ,
    MatSidenavModule ,
    MatIconModule ,
    
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MomentDateModule,
    MatFormFieldModule,
    FlexLayoutModule  ,
    MatInputModule ,
   
    MatListModule,
    InfiniteScrollModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule ,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    MatMomentDateModule ,
    MatButtonToggleModule ,
    SharedModule,
    MatSnackBarModule,
    MatSortModule,
    MatProgressSpinnerModule,
    SharedModule,
    PerfectScrollbarModule,
    AvatarModule,
 BadgeModule,
 BreadcrumbModule,
 ButtonGroupModule,
 ButtonModule,
 CardModule,
 DropdownModule,
 FooterModule,
 FormModule,
 GridModule,
 HeaderModule,
 ListGroupModule,
 NavModule,
 ProgressModule,
 SidebarModule,
 TabsModule,
 UtilitiesModule,
 IconModule,
 EmployeemanageRoutingModule
  ],
  exports:[
   
  ],
  providers: [

    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    
  {
    provide: HTTP_INTERCEPTORS,     
    useClass: TokenInterceptor,

    multi: true
  }
  ]
  
})

export class EmployeemanageModule { }
