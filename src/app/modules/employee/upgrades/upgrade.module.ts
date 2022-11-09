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
import { MatDividerModule } from '@angular/material/divider';
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

import { ListTBLShamelUpgradeComponent } from './components/TBLShamelUpgrade/list-tblshamel-upgrade/list-tblshamel-upgrade.component';
import { UpgradePrepareAllComponent } from './components/upgrade-prepare-all/upgrade-prepare-all.component';
import { UpgradeRoutingModule } from './upgrade-routing.module';
import { UpgradeComponent } from './upgrade.component';
import { PrintReferralQararsComponent } from './components/print-referral-qarars/print-referral-qarars.component';
import { PrintUpgradeQararsComponent } from './components/print-upgrade-qarars/print-upgrade-qarars.component';
import { ReplaceQararNumbersComponent } from './components/replace-qarar-numbers/replace-qarar-numbers.component';
import { UpgradePromotionQararsComponent } from './components/upgrade-promotion-qarars/upgrade-promotion-qarars.component';
import { UpgradeQararsAdjustPrintDialogComponent } from './components/upgrade-qarars-adjust-print-dialog/upgrade-qarars-adjust-print-dialog.component';


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
   
    ListTBLShamelUpgradeComponent,
    UpgradePrepareAllComponent,
    UpgradeComponent,
    PrintReferralQararsComponent,
    PrintUpgradeQararsComponent,
    ReplaceQararNumbersComponent,
    UpgradePromotionQararsComponent,
    UpgradeQararsAdjustPrintDialogComponent
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
 UpgradeRoutingModule
  ],
  exports:[
  
  ],
  providers: [
    { provide:MAT_DATE_FORMATS  , useValue: MY_FORMATS }
  ]
  
})

export class UpgradeModule { }
