import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrokerRoutingModule } from './broker-routing.module';
import { BrokerComponent } from './broker.component';
import { TBLShamelOvertimeEmployeeListComponent } from './components/tblShamelOvertimeEmployee/tblshamel-overtime-employee-list/tblshamel-overtime-employee-list.component';

import { TblShamelOvertimePrintTotalsListComponent } from './components/tblShamelOvertimePrintTotals/tbl-shamel-overtime-print-totals-list/tbl-shamel-overtime-print-totals-list.component';
import { TblShamelOvertimeShatebListComponent } from './components/tblShamelOvertimeShateb/tbl-shamel-overtime-shateb-list/tbl-shamel-overtime-shateb-list.component';
import { TblShamelOvertimeShatebModifyComponent } from './components/tblShamelOvertimeShateb/tbl-shamel-overtime-shateb-modify/tbl-shamel-overtime-shateb-modify.component';


import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import {MatExpansionModule} from '@angular/material/expansion';
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
  UtilitiesModule,
  
  
} from '@coreui/angular';


import { IconModule } from '@coreui/icons-angular';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { ConfirmationDialogComponent } from './components/common/confirmation-dialog/confirmation-dialog.component';
import { TBLShamelOvertimeEmployeeModifyComponent } from './components/tblShamelOvertimeEmployee/tblshamel-overtime-employee-modify/tblshamel-overtime-employee-modify.component';
import { TblshamelBrokerEmployeeListComponent } from './components/tblShamelBrokerEmployee/tblshamel-broker-employee-list/tblshamel-broker-employee-list.component';
import { TblshamelBrokerEmployeeModifyComponent } from './components/tblShamelBrokerEmployee/tblshamel-broker-employee-modify/tblshamel-broker-employee-modify.component';
import { TblShamelBrokerShatebListComponent } from './components/tblShamelBrokerShateb/tbl-shamel-broker-shateb-list/tbl-shamel-broker-shateb-list.component';
import { TblShamelBrokerShatebModifyComponent } from './components/tblShamelBrokerShateb/tbl-shamel-broker-shateb-modify/tbl-shamel-broker-shateb-modify.component';
import { TblShamelBrokerPrintTotalsListComponent } from './components/tblShamelBrokerPrintTotals/tbl-shamel-broker-print-totals-list/tbl-shamel-broker-print-totals-list.component';


/////////////////////////////

//component 
















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
    BrokerComponent,
    TblShamelOvertimeShatebListComponent,
    TblShamelOvertimeShatebModifyComponent,
    TblShamelOvertimePrintTotalsListComponent,
    TblShamelOvertimeShatebModifyComponent,
    TBLShamelOvertimeEmployeeListComponent,
    TBLShamelOvertimeEmployeeModifyComponent,
    ConfirmationDialogComponent,
    TblshamelBrokerEmployeeListComponent,
    TblshamelBrokerEmployeeModifyComponent,
    TblShamelBrokerShatebListComponent,
    TblShamelBrokerShatebModifyComponent,
    TblShamelBrokerPrintTotalsListComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormModule,
    
    CommonModule,
    
    InfiniteScrollModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule,
    RouterModule,  
    MatDividerModule,
  MatToolbarModule, 
  MatButtonModule,
  FlexLayoutModule,
  MatMenuModule,
  MatListModule,
  MatDialogModule,
  MatCardModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatInputModule,
  MatButtonModule,  
  MatGridListModule,
  ScrollingModule ,
  MatToolbarModule ,
  MatSidenavModule ,
  MatIconModule ,
  FormsModule,  
  MatPaginatorModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MomentDateModule,
  MatFormFieldModule,
  FlexLayoutModule  ,
  MatInputModule ,
  MatSelectModule,
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
MatDialogModule,
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
BrokerRoutingModule,
MatExpansionModule

  ]
})
export class BrokerModule { }
