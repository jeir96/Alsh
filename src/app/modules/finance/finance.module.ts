import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FinanceRoutingModule } from './finance-routing.module';

import { FinaceComponent } from './finace.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';


import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MY_DATE_FORMATS } from '../shared/models/employees_department/MY_DATE_FORMATS';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

//////////////////////////////

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
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
  UtilitiesModule,
  
} from '@coreui/angular';


import { IconModule } from '@coreui/icons-angular';


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
    FinaceComponent,  
  ],
  imports: [
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
FinanceRoutingModule
  ],
  
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class FinanceModule {  
 }
