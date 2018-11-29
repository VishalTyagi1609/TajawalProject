import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CustomAlertComponent } from '../../../custom-alert/custom-alert.component';
import { LoginService } from '../../../services/login-service.service';
import { User } from '../../../components/model/user.model';

@Component({
  selector: 'app-add-newuser-popup',
  templateUrl: './add-newuser-popup.component.html',
  })
export class AddNewuserPopupComponent implements OnInit {

  @ViewChild('channelGroup') channelGroup: ElementRef;
  @ViewChild('channelName') channelName: ElementRef;

  public flag : boolean

  constructor(public dialogRef: MatDialogRef<CustomAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private loginService : LoginService,private alert: MatDialog){
      dialogRef.disableClose = true;
    }

    target : User

  ngOnInit() {
     //console.log("-----------",this.target);
     
  }

  addNewUser(){
    console.log("------->>>>----",this.target);
    //if(this.target.user_id==null){this.target.user_id='123'}
   // if(this.target.user_name==null){this.target.user_name='Vishal Tyagi Ji'}
   // if(this.target.password==null){this.target.password='password'}
   // if(this.target.role==null){this.target.role='Null'}

    var targetJson=JSON.stringify(this.target)
    console.log(">>>>>>>>>>>>>>>>>>"+targetJson);
    this.loginService.addNewUser(targetJson).subscribe(data => {
      let dialogRef = this.alert.open(CustomAlertComponent, {
      width: '500px'});
        if((data.status)=='success'){
          //Success alert
          dialogRef.componentInstance.message='User Successfully Inserted'
          }
        else{
        dialogRef.componentInstance.message='Sorry Something Went Wrong'
        }
        //console.log("data Update >>>>"+data.status)
      })
  }


}
