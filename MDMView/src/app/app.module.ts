import { SuspiciousordersService } from './services/suspiciousOrders.service';
import { VisaFraudPopUpComponent } from './admin/popup/visa-fraud-pop-up/visa-fraud-pop-up.component';
import { VisaFraudService } from './services/visaFraud.service.';
import { UpdaateTargetPopUpComponent } from './admin/popup/update-target-pop-up/update-target-pop-up.component';
import { MonthlyTargetService } from './services/monthly-target.service';
import { MonthlyTargetComponent } from './admin/monthlyTarget/monthlyTarget.component';
import { GaChannelMappingService } from './services/ga-channel-mapping.service';
import { AdjustNetworkMappingPopUpComponent } from './admin/popup/adjust-network-mapping-pop-up/adjust-network-mapping-pop-up.component';
import { GANetworkMappingPopUpComponent } from './admin/popup/ga-network-mapping-pop-up/ga-network-mapping-pop-up.component';
import { SpendChannelService } from './services/spend-channel.service';
import { AddNetworkCostPopUpComponent } from './admin/popup/add-network-cost-pop-up/add-network-cost-pop-up.component';
import { EditNetworkCostPopUpComponent } from './admin/popup/edit-network-cost-pop-up/edit-network-cost-pop-up.component';
import { NeworkCostService } from './services/nework-cost.service';
import { EditHotelPopUpComponent } from './admin/popup/edit-hotel-pop-up/edit-hotel-pop-up.component';
import { LoginService } from './services/login-service.service';
import { AuthGuard } from './auth.guard';
import { AdminModule } from './admin/admin.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NullhotelsComponent } from './components/nullhotels/nullhotels.component';
import { MatTableModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { HotelService} from './services/hotel.service';
import { UserService} from './services/user.service';
import { HotelTableComponent } from './components/hotel-table/hotel-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { RouteModule } from './route/route.module';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';
import { YesNoPopUpComponent } from './admin/popup/yes-no-pop-up/yes-no-pop-up.component';
import { UpdateUserPopUpComponent } from './admin/popup/update-user-pop-up/update-user-pop-up.component';
import { AddNewuserPopupComponent } from './admin/popup/add-newuser-popup/add-newuser-popup.component';
import { SuccessPopUpComponent } from './admin/popup/success-pop-up/success-pop-up.component';
import { EditSingleUserComponent } from './components/edit-single-user/edit-single-user.component';
import { GetUserDetailsComponent } from './admin/get-user-details/get-user-details.component';
import { UpdateUserPasswordPopuuComponent } from './admin/popup/update-user-password-popuu/update-user-password-popuu.component';
 //import { AuthguardGuard } from './authguard.guard';
/*
const appRoutes:Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    //canActivate: [LoginComponent],
    component: DashboardComponent
  },
  {
    path: 'hotels',
    //canActivate: [LoginComponent],
    component: HotelTableComponent
  }
  ] */

@NgModule({
  declarations: [
    AppComponent,
    NullhotelsComponent,
    HotelTableComponent,
    LoginComponent,
    DashboardComponent,
    CustomAlertComponent,
    EditSingleUserComponent
  ],
  imports: [
    MatTableModule,
    BrowserModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    //RouterModule.forRoot(appRoutes)
    RouteModule,
    AdminModule,
    
  ],
  providers: [HotelService,
    UserService,
    AuthGuard,
    LoginService,
    NeworkCostService,
    SpendChannelService,
    GaChannelMappingService,
    MonthlyTargetService,
    VisaFraudService,
    SuspiciousordersService,
    GetUserDetailsComponent
    
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CustomAlertComponent,
    EditHotelPopUpComponent,
    EditNetworkCostPopUpComponent,
    AddNetworkCostPopUpComponent,
    AdjustNetworkMappingPopUpComponent,
    GANetworkMappingPopUpComponent,
    UpdaateTargetPopUpComponent,
    VisaFraudPopUpComponent,
    YesNoPopUpComponent,
    UpdateUserPopUpComponent,
    AddNewuserPopupComponent,
    SuccessPopUpComponent,
    UpdateUserPasswordPopuuComponent

  ]
})
export class AppModule { }
