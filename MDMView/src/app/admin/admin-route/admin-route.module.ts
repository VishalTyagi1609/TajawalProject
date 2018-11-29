import { DashboardComponent } from './../../components/dashboard/dashboard.component';
import { TestComponent } from './../test/test.component';
import { HotelUpload } from './../hotel/hotelUpload.component';
import { AdminhomeComponent } from './../adminhome/adminhome.component';
import { AuthGuard } from './../../auth.guard';
import { ChannelComponent } from './../channel/channel.component';
import { HotelComponent } from './../hotel/hotel.component';
import { AdminComponent } from './../admin.component';
import { NgModule,Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from '../../components/login/login.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      /*{
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
          { path: '**', redirectTo : '', pathMatch: 'full' }
         // {path: '**', redirectTo : ''},
          //{path: '', component: LoginComponent} 
        ] 
      }*/
    ])
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AdminRouteModule { }
