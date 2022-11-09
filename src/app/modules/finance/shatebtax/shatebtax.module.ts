import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShatebtaxRoutingModule } from './shatebtax-routing.module';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
//component 



import {MatSelectModule} from '@angular/material/select'; 

import {MatButtonToggleModule} from '@angular/material/button-toggle';


import { MatSortModule } from '@angular/material/sort';


import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


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
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateModule, MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
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
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { VarTaxDeleteDialogComponent } from './components/shatebvartax/var-tax-delete-dialog/var-tax-delete-dialog.component';
import { VarTaxEditDialogComponent } from './components/shatebvartax/var-tax-edit-dialog/var-tax-edit-dialog.component';
import { HealthDeleteDialogComponent } from './components/shatebhealth/health-delete-dialog/health-delete-dialog.component';
import { HealthEditDialogComponent } from './components/shatebhealth/health-edit-dialog/health-edit-dialog.component';
import { HealthComponent } from './components/shatebhealth/health/health.component';
import { PunishmentDeleteDialogComponent } from './components/shatebpunishment/punishment-delete-dialog/punishment-delete-dialog.component';
import { PunishmentEditDialogComponent } from './components/shatebpunishment/punishment-edit-dialog/punishment-edit-dialog.component';
import { PunishmentComponent } from './components/shatebpunishment/punishment/punishment.component';

import { ShatebtaxComponent } from './shatebtax.component';
import { VarTaxComponent } from './components/shatebvartax/var-tax/var-tax.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MY_DATE_FORMATS } from '../../shared/models/employees_department/MY_DATE_FORMATS';
import { PunishmentInsertDialogComponent } from './components/shatebpunishment/punishment-insert-dialog/punishment-insert-dialog.component';


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

    ShatebtaxComponent,
    VarTaxDeleteDialogComponent,VarTaxEditDialogComponent,
    PunishmentComponent,PunishmentDeleteDialogComponent,PunishmentEditDialogComponent,
    HealthComponent,HealthDeleteDialogComponent,HealthEditDialogComponent
    , VarTaxComponent,PunishmentInsertDialogComponent
    
  ],
  imports: [
    ShatebtaxRoutingModule,
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

   
  ]
  ,
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class ShatebtaxModule { }
