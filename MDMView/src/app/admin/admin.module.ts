import { YesNoPopUpComponent } from './popup/yes-no-pop-up/yes-no-pop-up.component';
import { SuspiciousOrders } from './suspiciousOrders/suspiciousOrders.component';
import { VisaFraud } from './visaFraud/visaFraud.component';
import { UpdaateTargetPopUpComponent } from './popup/update-target-pop-up/update-target-pop-up.component';
import { MonthlyTargetComponent } from './monthlyTarget/monthlyTarget.component';
import { GAUpdateChannelMappingComponent } from './spendChannel/ga-update-channel-mapping/ga-update-channel-mapping.component';
import { AddNetworkCostPopUpComponent } from './popup/add-network-cost-pop-up/add-network-cost-pop-up.component';
import { NetworkCostAddComponent } from './network-cost/network-cost-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotelUpload } from './hotel/hotelUpload.component';
import { AuthGuard } from './../auth.guard';
import { ChannelComponent } from './channel/channel.component';
import { RouterModule,Routes } from '@angular/router';
import { HotelComponent } from './hotel/hotel.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRouteModule } from './admin-route/admin-route.module';
import { BrowserTransferStateModule, BrowserModule } from '@angular/platform-browser';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

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
import { TestComponent } from './test/test.component';
import { EditHotelPopUpComponent } from './popup/edit-hotel-pop-up/edit-hotel-pop-up.component';
import { NetworkCostComponent } from './network-cost/network-cost.component';
import { EditNetworkCostPopUpComponent } from './popup/edit-network-cost-pop-up/edit-network-cost-pop-up.component';
import { AddNdewChannelComponent } from './spendChannel/add-new-channel/add-new-channel.component';
import { AdjustChannelMappingComponent } from './spendChannel/adjust-channel-mapping/adjust-channel-mapping.component';
import { GAChannelMappingComponent } from './spendChannel/ga-channel-mapping/ga-channel-mapping.component';
import { AdjustNetworkMappingPopUpComponent } from './popup/adjust-network-mapping-pop-up/adjust-network-mapping-pop-up.component';
import { GANetworkMappingPopUpComponent } from './popup/ga-network-mapping-pop-up/ga-network-mapping-pop-up.component';
import { VisaFraudPopUpComponent } from './popup/visa-fraud-pop-up/visa-fraud-pop-up.component';
import { SuspiciousordersService } from '../services/suspiciousOrders.service';
import {UserComponent } from './user/user.component';
import { UpdateUserPopUpComponent } from './popup/update-user-pop-up/update-user-pop-up.component';
import { AddNewuserPopupComponent } from './popup/add-newuser-popup/add-newuser-popup.component';
import { SuccessPopUpComponent } from './popup/success-pop-up/success-pop-up.component';
import { GetUserDetailsComponent } from './get-user-details/get-user-details.component';
import { UpdateUserPasswordPopuuComponent } from './popup/update-user-password-popuu/update-user-password-popuu.component';

@NgModule({
  declarations: [
    AdminComponent,
    HotelComponent,
    HotelUpload,
    ChannelComponent,
    AdminhomeComponent,
    TestComponent,
    EditHotelPopUpComponent,
    NetworkCostComponent,
    EditNetworkCostPopUpComponent,
    AddNetworkCostPopUpComponent,
    NetworkCostAddComponent,
    AddNdewChannelComponent,
    AdjustChannelMappingComponent,
    GAChannelMappingComponent,
    GAUpdateChannelMappingComponent,
    AdjustNetworkMappingPopUpComponent,
    GANetworkMappingPopUpComponent,
    MonthlyTargetComponent,
    UpdaateTargetPopUpComponent,
    VisaFraud,
    VisaFraudPopUpComponent,
    SuspiciousOrders,
    YesNoPopUpComponent,
    UserComponent,
    UpdateUserPopUpComponent,
    AddNewuserPopupComponent,
    SuccessPopUpComponent,
    GetUserDetailsComponent,
    UpdateUserPasswordPopuuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    //AdminRouteModule,
    RouterModule,
    MatTableModule,
    DataTablesModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule 
   
     ],
     providers: [AuthGuard],
     bootstrap: [AdminComponent],
     exports: [AdminComponent]
})
export class AdminModule { }
