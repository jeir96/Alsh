import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeaffairsRoutingModule } from './employeeaffairs-routing.module';
import { EmployeeaffairsComponent } from './employeeaffairs.component';





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
  UtilitiesModule,
  
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';

import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateModule, MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { EmployeeRoutingModule } from '../employee-routing.module';
import { EmployeeListSearchComponent } from './componenets/employee-list-search/employee-list-search.component';
import { TblshamelschealthholidayListComponent } from './componenets/tblshamelschealthholiday/tblshamelschealthholiday-list/tblshamelschealthholiday-list.component';
import { TblshamelschealthholidayModifyComponent } from './componenets/tblshamelschealthholiday/tblshamelschealthholiday-modify/tblshamelschealthholiday-modify.component';
import { TBLShamelSCLEgalHolidayAddComponent } from './componenets/tblshamelsclegalholiday/tblshamel-sc-legal-holiday-add/tblshamel-sc-legal-holiday-add.component';
import { TBLShamelSCLEgalHolidayListComponent } from './componenets/tblshamelsclegalholiday/tblshamel-sc-legal-holiday-list/tblshamel-sc-legal-holiday-list.component';
import { TblshamelscmergeserviceListComponent } from './componenets/tblshamelscmergeservice/tblshamelscmergeservice-list/tblshamelscmergeservice-list.component';
import { TblshamelscmergeserviceModifyComponent } from './componenets/tblshamelscmergeservice/tblshamelscmergeservice-modify/tblshamelscmergeservice-modify.component';
import { TBLShamelSCSuddenHolidayAddComponent } from './componenets/tblshamelscsuddenholiday/tblshamel-sc-sudden-holiday-add/tblshamel-sc-sudden-holiday-add.component';
import { TBLShamelSCSuddenHolidayListComponent } from './componenets/tblshamelscsuddenholiday/tblshamel-sc-sudden-holiday-list/tblshamel-sc-sudden-holiday-list.component';
import { EmployeeaffairsManageComponent } from './componenets/employeeaffairs-manage.component';





@NgModule({
  declarations: [
   
   
    EmployeeListSearchComponent,
   
    TblshamelschealthholidayListComponent,
    TblshamelschealthholidayModifyComponent,
    TBLShamelSCLEgalHolidayAddComponent,
    TBLShamelSCLEgalHolidayListComponent,
    TblshamelscmergeserviceListComponent,
    TblshamelscmergeserviceModifyComponent,
    TBLShamelSCSuddenHolidayAddComponent,
    TBLShamelSCSuddenHolidayListComponent,
    EmployeeaffairsComponent,
    EmployeeaffairsManageComponent
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
    MatDividerModule,
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
  
    MatSnackBarModule,
    MatSortModule,
    MatProgressSpinnerModule,
    SharedModule,
   
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
    EmployeeaffairsRoutingModule
  ]
})
export class EmployeeaffairsModule { }
