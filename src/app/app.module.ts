import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { TBLShamelUserListComponent } from './modules/shared/components/user/tblshamel-user-list/tblshamel-user-list.component';
import { TBLShamelUserEditComponent } from './modules/shared/components/user/tblshamel-user-edit/tblshamel-user-edit.component';
import { TBLShamelPrivilagesComponent } from './modules/shared/components/user/tblshamel-privilages/tblshamel-privilages.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { TokenInterceptor } from './interceptors/token.interceptor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { MatMomentDateModule, MomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog'; 
import { ReactiveFormsModule } from '@angular/forms';

import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatPaginatorModule } from '@angular/material/paginator'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatInputModule} from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox'; 

import {MatListModule} from '@angular/material/list'; 
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatRadioModule } from '@angular/material/radio';
import { MatTreeModule } from '@angular/material/tree';
import { LoginComponent } from './modules/shared/components/login/login.component';

import {Page404Component} from "./modules/shared/components/page404/page404.component";
import {Page500Component} from "./modules/shared/components/page500/page500.component";
//////////////////////////////

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
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
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from './modules/shared/components/containers';
import { ConfirmationdialogComponent } from './modules/shared/components/confirmationdialog/confirmationdialog.component';



@NgModule({
  declarations: [
    AppComponent   ,
    LoginComponent,
    DefaultFooterComponent,
     DefaultHeaderComponent,
      DefaultLayoutComponent ,
      Page404Component,
      Page500Component,
      ConfirmationdialogComponent,
      TBLShamelUserListComponent,
      TBLShamelUserEditComponent,
      TBLShamelPrivilagesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
   AppRoutingModule,
    BrowserAnimationsModule,
  
    HttpClientModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,    
    HttpClientModule  ,
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
    MatDatepickerModule,
    MomentDateModule,
    MatFormFieldModule,
    FlexLayoutModule  ,
    MatInputModule ,
   
    MatListModule,

    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule ,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    MatMomentDateModule ,
    MatRadioModule,
   MatTreeModule,
   MatCardModule,
   MatProgressSpinnerModule,
   MomentDateModule,
   MatMomentDateModule ,

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

  ],
  providers: [

    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    
  {
    provide: HTTP_INTERCEPTORS,     
    useClass: TokenInterceptor,

    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
