import { SuspiciousOrders } from './../admin/suspiciousOrders/suspiciousOrders.component';
import { MonthlyTargetComponent } from './../admin/monthlyTarget/monthlyTarget.component';
import { GAUpdateChannelMappingComponent } from './../admin/spendChannel/ga-update-channel-mapping/ga-update-channel-mapping.component';
import { AdjustChannelMappingComponent } from './../admin/spendChannel/adjust-channel-mapping/adjust-channel-mapping.component';
import { GAChannelMappingComponent } from './../admin/spendChannel/ga-channel-mapping/ga-channel-mapping.component';
import { AddNdewChannelComponent } from './../admin/spendChannel/add-new-channel/add-new-channel.component';
import { NetworkCostComponent } from './../admin/network-cost/network-cost.component';
import { ChannelComponent } from './../admin/channel/channel.component';
import { TestComponent } from './../admin/test/test.component';
import { HotelUpload } from './../admin/hotel/hotelUpload.component';
import { HotelComponent } from './../admin/hotel/hotel.component';
import { AdminhomeComponent } from './../admin/adminhome/adminhome.component';
import { AdminComponent } from './../admin/admin.component';
import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { HotelTableComponent } from '../components/hotel-table/hotel-table.component';
import { NetworkCostAddComponent } from '../admin/network-cost/network-cost-add.component';
import { VisaFraud } from '../admin/visaFraud/visaFraud.component';
import { UserComponent } from '../admin/user/user.component';
import { GetUserDetailsComponent } from '../admin/get-user-details/get-user-details.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      {
      path: '',
      component: LoginComponent
    },
    {
      path: 'dashboard',
      canActivate: [AuthGuard],
      component: DashboardComponent
    },
    {
      path: 'hotels',
      canActivate: [AuthGuard],
      component: HotelTableComponent
    },
    {
      path: 'admin',
      component: AdminComponent,
      children: [
        {
          path: '',
          canActivate: [AuthGuard],
          redirectTo: 'home',
          pathMatch: 'full'
        },
        {
          path: 'home',
          canActivate: [AuthGuard],
          component: AdminhomeComponent
        },{
          path: 'hotel',
          canActivate: [AuthGuard],
          component: HotelComponent
        },{
          path: 'uploadHotel',
          canActivate: [AuthGuard],
          component: HotelUpload
        },
        {
          path: 'temp',
          canActivate: [AuthGuard],
          component: TestComponent
        },
        {
          path: 'channel',
          component: ChannelComponent
        },
        {
          path: 'networkCostUpdate',
          component: NetworkCostComponent
        },
        {
          path: 'networkCostAdd',
          component: NetworkCostAddComponent
        },
        {
          path: 'addNewChannel',
          component: AddNdewChannelComponent
        },
        {
          path: 'adjustChannelMapping',
          component: AdjustChannelMappingComponent
        },
        {
          path: 'GAChannelMapping',
          component: GAChannelMappingComponent
        },
        {
          path: 'GAUpdateChannelMapping',
          component: GAUpdateChannelMappingComponent
        },
        {
          path: 'MonthlyTarget',
          component: MonthlyTargetComponent
        },
        {
          path: 'VisaFraud',
          component: VisaFraud
        },
        {
          path: 'SuspiciousOrders',
          component: SuspiciousOrders
        },
        {
          path: 'user',
          component: UserComponent
        },
        {
          path:'getUserDetails',
          component:GetUserDetailsComponent
        },
      ] ,
    },
    //{ path: '**', redirectTo: '', pathMatch: 'full' }
        
    ],{useHash: true}),
    RouterModule.forChild([
      {
          path: '**',
          redirectTo: ''
      }
  ])
  ],
  declarations: [],
  exports: [RouterModule]
})
export class RouteModule { }
