import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CustomAlertComponent } from './../../../custom-alert/custom-alert.component';
import { SpendChannelService } from './../../../services/spend-channel.service';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-adjust-network-mapping-pop-up',
  templateUrl: './adjust-network-mapping-pop-up.component.html',
 
})
export class AdjustNetworkMappingPopUpComponent implements OnInit {
  @ViewChild('channelGroup') channelGroup: ElementRef;
  @ViewChild('channelName') channelName: ElementRef;

  constructor(public dialogRef: MatDialogRef<CustomAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private spendChannelService : SpendChannelService,private alert: MatDialog){
      dialogRef.disableClose = true;
    }

  public networkName : string
  public actionFlag=0
  public channelNameFlag = false
  public groupSelectFlag = false
  public nameSelectFlag = false
  public addButtonFlag = false
  public channelGroups : string[] 
  public channelNames : string[] 
  public group
  public name
  
  ngOnInit() {
    this.spendChannelService.getChannelGroups().subscribe(data =>{
      this.channelGroups=data.data
      //console.log(data.status)
      })

      this.spendChannelService.getNetworkDetatls(this.networkName).subscribe(data =>{
        this.group=data.data.channel_group
        //this.name=data.data.channel_name
        this.channelNames=[data.data.channel_name]
        
        })
      
  }

  onGroupSelect(){
    this.nameSelectFlag=true
    if(this.addButtonFlag==true){
      this.channelName.nativeElement.value=null
      this.addButtonFlag=false
      }
    this.spendChannelService.getChannelNames(this.channelGroup.nativeElement.value).subscribe(data =>{
      this.channelNames=data.data
      //console.log(data.status)
      })
  }
  onNameSelect(){
     this.addButtonFlag=true
     

  }
  onCloseClick(){
    this.dialogRef.close();
   }

   onAddClick(){
     
     var group=this.channelGroup.nativeElement.value
     var name=this.channelName.nativeElement.value

     //console.log(group+'------'+name)

     var jsonString='{ "networkName": "'+this.networkName+'","channelGroup": "'+group+'", "channelName": "'+name+'"}'
    
     if(this.actionFlag==1){
          this.spendChannelService.saveNetwork(jsonString).subscribe(data =>{
            let dialogRef = this.alert.open(CustomAlertComponent, {
              width: '500px'});
            if((data.status)=='success'){
              //Success alert
              dialogRef.componentInstance.message='Successfully Updated'
              }
            else{
            dialogRef.componentInstance.message='Sorry something went wrong'
            }
            })
     }
     else if(this.actionFlag==2){
            this.spendChannelService.updateAdjustNetwor(jsonString).subscribe(data =>{
              let dialogRef = this.alert.open(CustomAlertComponent, {
                width: '500px'});
              if((data.status)=='success'){
                //Success alert
                dialogRef.componentInstance.message='Successfully Updated'
                }
              else{
              dialogRef.componentInstance.message='Sorry something went wrong'
              }
          })
     }
    }

}
