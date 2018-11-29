import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from '../../../services/login-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomAlertComponent } from '../../../custom-alert/custom-alert.component';
import { User } from '../../../components/model/user.model';

@Component({
  selector: 'app-update-user-pop-up',
  templateUrl: './update-user-pop-up.component.html', 
})
export class UpdateUserPopUpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CustomAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private loginService : LoginService,private alert: MatDialog) {
      dialogRef.disableClose = true;
     }

   user : User;

   onCloseClick(){
    this.dialogRef.close();
   }
   updateUser(): void {    
    var userJson=JSON.stringify(this.user)
    console.log("userjson Data"+userJson)
    this.loginService.updateUser(userJson).subscribe(data => {
          let dialogRef = this.alert.open(CustomAlertComponent, {
          width: '500px'});
            if((data.status)=='success'){
              //Success lertMAT_DIALOG_DATA
              dialogRef.componentInstance.message='Successfully updated'
              }
            else{
            dialogRef.componentInstance.message='Sorry something went wrong'
            }
            console.log("data Update >>>>"+data.status)})
      
          }

  ngOnInit() {
  }

}
