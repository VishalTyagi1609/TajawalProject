import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CustomAlertComponent } from '../../../custom-alert/custom-alert.component';
import { LoginService } from '../../../services/login-service.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { User } from '../../../components/model/user.model';
import { SuccessPopUpComponent } from '../success-pop-up/success-pop-up.component';

@Component({
  selector: 'app-update-user-password-popuu',
  templateUrl: './update-user-password-popuu.component.html',
})
export class UpdateUserPasswordPopuuComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  '{{value.name}}'

  dtOptions: DataTables.Settings = {}
  public flag: boolean
  constructor(public dialogRef: MatDialogRef<CustomAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private loginService: LoginService, private alert: MatDialog) {
    dialogRef.disableClose = true;
  }
  user: User

  public user_id = localStorage.getItem('user_id');
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  

  updateUserPassword(oldpassword,newpassword, renewpassword): void {
    console.log(newpassword + "  " + renewpassword)
    if (newpassword == renewpassword) {
      console.log(newpassword + "  " + renewpassword);
      this.flag = true
      this.loginService.editUserPassword(this.user_id,oldpassword, newpassword).subscribe(data => {

        if ((data.status) == 'success') {

          let dialogRef = this.alert.open(SuccessPopUpComponent, {
            width: '600px'
          });
          dialogRef.componentInstance.message = 'Hurray!!! Successfully Updated.'
          this.rerender()
          //Success lert
        }
        else {
          let dialogRef = this.alert.open(SuccessPopUpComponent, {
            width: '600px'
          });
          dialogRef.componentInstance.message = 'Entered New Password/Old Password Do Not Match'
          this.rerender() 
        }
        console.log("Updation Operation >>>>" + data.status)
      })
    } else {
      this.flag = false
      let dialogRef = this.alert.open(SuccessPopUpComponent, {
        width: '600px'
      });
      dialogRef.componentInstance.message = 'Whoa!!! Entered Password Does Not Match.'
      this.rerender()
    }
  }

  ngOnInit() {
  }

}
