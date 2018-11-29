import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CustomAlertComponent } from '../../../custom-alert/custom-alert.component';
import { LoginService } from '../../../services/login-service.service';

@Component({
  selector: 'app-success-pop-up',
  templateUrl: './success-pop-up.component.html'
})
export class SuccessPopUpComponent implements OnInit {

  @ViewChild('status') status: ElementRef;

  public message : string

  constructor(public dialogRef: MatDialogRef<CustomAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private loginService : LoginService,private alert: MatDialog){
      dialogRef.disableClose = true;
    }


  ngOnInit() {
    
  }

  onOkayClick(){    


      this.dialogRef.componentInstance.message='Successfully Deleted'
      this.dialogRef.close({data : 'Okay'});
  }

 


}
