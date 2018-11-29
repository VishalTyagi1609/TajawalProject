import { Component, OnInit, Inject, ViewChild, ElementRef, Input, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { LoginService } from './../../services/login-service.service';
import { User } from '../../components/model/user.model';
import { DataTableDirective } from 'angular-datatables';
import { stringify } from 'querystring';
import { CustomAlertComponent } from './../../custom-alert/custom-alert.component';
import { SpendChannelService } from './../../services/spend-channel.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSortHeader } from '@angular/material';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from 'selenium-webdriver/http';
import { UpdateUserPopUpComponent } from '../popup/update-user-pop-up/update-user-pop-up.component';
import { UpdateUserPasswordPopuuComponent } from '../popup/update-user-password-popuu/update-user-password-popuu.component';
//import { UpdateUserPasswordPopUpComponent } from '../popup/update-user-password-pop-up/update-user-password-pop-up.component';


@Component({
  selector: 'app-get-user-details',
  templateUrl: './get-user-details.component.html',

})

export class GetUserDetailsComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {}
  public user: User
  public total_records: number = 0;

  public columnList: string[] = [];
  public errorMsg;
  public flag: boolean
  public norecordsFlag = 1;
  public user_id = localStorage.getItem('user_id');
  public user_name: string;
  public password: string;
  public role: string;


  constructor(private loginService: LoginService, private alert: MatDialog, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.loginService.getUserDetails(this.user_id).subscribe(resp => {
      console.log("Status>>" + this.user_id)

      this.user = resp.data
      //user: User
      console.log(resp.data);
      console.log("Status>>" + resp.data.user_name)
      this.user_name = resp.data[0].user_name
      this.password = resp.data[0].password
      console.log(this.password);
      this.role = resp.data[0].role
      console.log("Status>>" + this.user_name + this.password + this.role)

    });

  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();

  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  onUpdateUserPassword(newpassword, user_id) {
    let dialogRef = this.alert.open(UpdateUserPasswordPopuuComponent, {
      width: '700px'
    });

    dialogRef.componentInstance.data = newpassword;
    dialogRef.componentInstance.data = user_id;
  }




  getUserOldPassword(user_id) {

    console.log("Getting User Old Password of" + " " + user_id)

    this.loginService.getUserPassword(user_id).subscribe(data => {

      if ((data.status) == 'success') {

      }
      else {
      }
      console.log("data Update >>>>" + data.status)
    })
  }



}