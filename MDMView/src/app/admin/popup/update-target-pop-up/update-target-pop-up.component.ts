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
  selector: 'update-target-pop-up',
  templateUrl: './update-target-pop-up.component.html',
 
})
export class UpdaateTargetPopUpComponent implements OnInit {
  @ViewChild('channelGroup') channelGroup: ElementRef;
  @ViewChild('channelName') channelName: ElementRef;

  public flag : boolean

  constructor(public dialogRef: MatDialogRef<CustomAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private monthlyTargetService : MonthlyTargetService,private spendChannelService : SpendChannelService,private alert: MatDialog){
      dialogRef.disableClose = true;
    }

    target : MonthlyTargetBean

  ngOnInit() {
     //console.log("-----------",this.target);
     
  }

  onUpdateClick(){
    if(this.target.Budget==null){this.target.Budget='0'}
    if(this.target.Bookings==null){this.target.Bookings='0'}
    if(this.target.ibv==null){this.target.ibv='0'}
    if(this.target.nbv==null){this.target.nbv='0'}
    if(this.target.aov==null){this.target.aov='0'}

          if(String(this.target.Budget).indexOf('.')!=-1){
            //console.log(">>>>>>>>>>>>>>>>>>>>"+
            this.target.Budget=Number.parseFloat(this.target.Budget).toFixed(0)
          }
          if(String(this.target.Bookings).indexOf('.')!=-1){
            this.target.Bookings=Number.parseFloat(this.target.Bookings).toFixed(0)
          }
          if(String(this.target.ibv).indexOf('.')!=-1){
            this.target.ibv=Number.parseFloat(this.target.ibv).toFixed(0)
          }
          if(String(this.target.nbv).indexOf('.')!=-1){
            this.target.nbv=Number.parseFloat(this.target.nbv).toFixed(0)
          }
          if(String(this.target.aov).indexOf('.')!=-1){
            this.target.aov=Number.parseFloat(this.target.aov).toFixed(2)
          }

          if(String(this.target.crrTotal).indexOf('.')!=-1){
            this.target.crrTotal=Number.parseFloat(this.target.crrTotal).toFixed(2)
          }
          if(String(this.target.gbv).indexOf('.')!=-1){
            this.target.gbv=Number.parseFloat(this.target.gbv).toFixed(0)
          }
          if(String(this.target.cpo).indexOf('.')!=-1){
            this.target.cpo=Number.parseFloat(this.target.cpo).toFixed(0)
          }
          if(String(this.target.ibvOnlineTotalFlightsAndHotels).indexOf('.')!=-1){
            this.target.ibvOnlineTotalFlightsAndHotels=Number.parseFloat(this.target.ibvOnlineTotalFlightsAndHotels).toFixed(0)
          }
          if(String(this.target.nbvOnlineTotalTFlightsAndHotels).indexOf('.')!=-1){
            this.target.nbvOnlineTotalTFlightsAndHotels=Number.parseFloat(this.target.nbvOnlineTotalTFlightsAndHotels).toFixed(0)
          }

        
     

    var targetJson=JSON.stringify(this.target)
    console.log(targetJson)
    this.monthlyTargetService.updateMonthlyTarget(targetJson).subscribe(data => {
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
      })
  }

  validateValue(str : string){
    //console.log(">>>>>>>>>>>"+Number(this.networklList[i].value));
    var  value : string
    if(str=='Budget')
        value=this.target.Budget
    else if(str=='Bookings')
        value=this.target.Bookings
    else if(str=='ibv')
        value=this.target.ibv
    else if(str=='nbv')
        value=this.target.nbv
    else if(str=='aov')
        value=this.target.aov
    else if(str=='crrTotal')
        value=this.target.crrTotal

    
    //console.log("|||"+value+"|||")
    if(value=='0'){
      //console.log(">>>>"+String(value=='0'))
      this.flag=false
      }
    else if(value==null || value==''|| Number(value)<0 || Number(value)>999999999){
    // this.networklList[i].value=null;
      //console.log("++++++++++++++++");
      if(str=='Budget')
        this.target.Budget=''
      else if(str=='Bookings')
        this.target.Bookings=''
      else if(str=='ibv')
        this.target.ibv=''
      else if(str=='nbv')
        this.target.nbv=''
      else if(str=='aov')
        this.target.aov=''
      else if(str=='crrTotal')
        this.target.crrTotal=''

      this.flag=true
     }     
    else{
    this.flag=false
    }

    // Calculations
    if(this.target.brand=='Tajawal'){
      //console.log('>>>>>>>>>>>>>'+this.target)
      this.target.gbv=Number.parseFloat(String(Number(this.target.nbv)*1.02)).toFixed(0)
      if(this.target.Budget=='0' || this.target.Bookings=='0'){
        this.target.cpo='0'
      }
      else{
          this.target.cpo=Number.parseFloat(String(Number(this.target.Budget)/Number(this.target.Bookings))).toFixed(0)
      }
      //this.target.crrTotal=String(this.target.nbv)
      this.target.ibvOnlineTotalFlightsAndHotels='0'
      this.target.nbvOnlineTotalTFlightsAndHotels='0'
      
    }
    else if(this.target.brand=='Almosafer'){
      //console.log('>>>>>>>>>>>>>'+this.target)
      this.target.gbv=Number.parseFloat(String(this.target.nbv)).toFixed(0)
      if(this.target.Budget=='0' || this.target.Bookings=='0'){
        this.target.cpo='0'
      }
      else{
          this.target.cpo=Number.parseFloat(String(Number(this.target.Budget)/Number(this.target.Bookings))).toFixed(0)
      }
      //this.target.crrTotal=String(this.target.nbv)
      this.target.ibvOnlineTotalFlightsAndHotels=Number.parseFloat(String(this.target.ibv)).toFixed(0)
      this.target.nbvOnlineTotalTFlightsAndHotels=Number.parseFloat(String(this.target.nbv)).toFixed(0)
    }

    if( ((this.target.Budget=='' || this.target.Budget==null) && this.target.Budget!='0') 
    //if(  this.target.Budget=='' || this.target.Budget==null 
      || ((this.target.Bookings=='' || this.target.Bookings==null) && this.target.Bookings!='0')
      ||  ((this.target.ibv=='' || this.target.ibv==null) && this.target.ibv!='0')
      ||  ((this.target.nbv=='' || this.target.nbv==null) && this.target.nbv!='0')
      ||  ((this.target.aov=='' || this.target.aov==null) && this.target.aov!='0')
      ||  ((this.target.crrTotal=='' || this.target.crrTotal==null) && this.target.crrTotal!='0')
     ){
       //console.log('///////////////////////|>>>>>>>>>>')
      this.flag=true
    }
    else{
      this.flag=false
    }
   }
 
  onCloseClick(){
    this.dialogRef.close({data : 'cancel'});
   }

   

}
