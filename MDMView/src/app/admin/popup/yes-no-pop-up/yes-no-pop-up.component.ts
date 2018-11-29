import { SuspiciousordersService } from './../../../services/suspiciousOrders.service';
import { VisaFraudService } from './../../../services/visaFraud.service.';
import { VisaFraudModel } from './../../../components/model/visaFraud.model';
import { MonthlyTargetBean } from './../../../components/model/monthlyTarget';
import { MonthlyTargetService } from './../../../services/monthly-target.service';
import { GaMappedChannels } from './../../../components/model/channel.model';
import { GaChannelMappingService } from './../../../services/ga-channel-mapping.service';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CustomAlertComponent } from './../../../custom-alert/custom-alert.component';
import { SpendChannelService } from './../../../services/spend-channel.service';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'yes-no-pop-up',
  templateUrl: './yes-no-pop-up.component.html',
 
})
export class YesNoPopUpComponent implements OnInit {
  @ViewChild('status') status: ElementRef;

  public message : string
  //public visaStatus : String 

  constructor(public dialogRef: MatDialogRef<CustomAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private suspiciousordersService : SuspiciousordersService,private spendChannelService : SpendChannelService,private alert: MatDialog){
      dialogRef.disableClose = true;
    }

    //target : VisaFraudModel

  ngOnInit() {
     //console.log("-----------",this.target);
     //if(this.target.visa_fraud=='True'){ this.visaStatus = 'False'}
     //else { this.visaStatus = 'True' }
     
  }

  onYesClick(){    

    /*this.target.visa_fraud=this.status.nativeElement.value
    this.suspiciousordersService.updateCustomer(this.target.dim_customer_id,this.status.nativeElement.value,this.target.first_order_date,this.target.first_order_no).subscribe(data => {
      let dialogRef = this.alert.open(CustomAlertComponent, {
      width: '500px'});
        if((data.status)=='success'){
          //Success alert
          dialogRef.componentInstance.message='Successfully Updated'
          }
        else{
        dialogRef.componentInstance.message='Sorry something went wrong'
        }
        //console.log("data Update >>>>"+data.status)
      })*/

      this.dialogRef.close({data : 'yes'});
  }

  onCloseClick(){
    this.dialogRef.close({data : 'cancel'});
   }

   

}
