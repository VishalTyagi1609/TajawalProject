import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-root',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})



export class AdminComponent {

  title = 'ADdmin coponent';
  public isCollapsed = false;
  constructor(private router:Router) { }
  public hotelToggleFlag=false
  public channelToggleFlag=false
  public spendChannelFlag=false
  logoutUser(){
    console.log('logout called')
    localStorage.setItem('loginStatus','false');
    localStorage.setItem('token','')
    this.router.navigate([''])}

    hotelToggle(){
     this.hotelToggleFlag=!this.hotelToggleFlag;
     this.channelToggleFlag=false
     this.spendChannelFlag=false
     //console.log("hit****************************")
    }
    channelToggle(){
      this.channelToggleFlag=!this.channelToggleFlag;
      this.hotelToggleFlag=false
      this.spendChannelFlag=false
      //console.log("hit****************************")
     }
     spendChannelToggle(){
      this.spendChannelFlag=!this.spendChannelFlag
      this.channelToggleFlag=false;
      this.hotelToggleFlag=false
      //console.log("hit****************************")
     }
     monthlyTarget(){
      // console.log('--------------------')
      this.allColapse()
      this.router.navigate(['/admin/MonthlyTarget']);
     }
     visaFraud(){
      this.allColapse()
      this.router.navigate(['/admin/VisaFraud']);
     }
     suspiciousOrders(){
      this.allColapse()
      this.router.navigate(['/admin/SuspiciousOrders']);

     }
     Users(){
      this.allColapse()
      this.router.navigate(['/admin/user']);
      
      }
     allColapse(){
      this.spendChannelFlag=false
      this.channelToggleFlag=false
      this.hotelToggleFlag=false
     }
}


