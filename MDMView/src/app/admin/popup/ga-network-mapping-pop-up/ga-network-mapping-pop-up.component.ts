import { GaMappedChannels } from './../../../components/model/channel.model';
import { GaChannelMappingService } from './../../../services/ga-channel-mapping.service';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CustomAlertComponent } from './../../../custom-alert/custom-alert.component';
import { SpendChannelService } from './../../../services/spend-channel.service';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ga-network-mapping-pop-up',
  templateUrl: './ga-network-mapping-pop-up.component.html',
 
})
export class GANetworkMappingPopUpComponent implements OnInit {
  @ViewChild('channelGroup') channelGroup: ElementRef;
  @ViewChild('channelName') channelName: ElementRef;

  constructor(public dialogRef: MatDialogRef<CustomAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private gaChannelMappingService : GaChannelMappingService,private spendChannelService : SpendChannelService,private alert: MatDialog){
      dialogRef.disableClose = true;
    }

  public networkNames : String
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

      //this.networkNames=null
      this.spendChannelService.getChannelGroups().subscribe(data =>{
      this.channelGroups=data.data
      //console.log(data.data)
      })

      //console.log(this.networkNames+"==============")
      this.gaChannelMappingService.getGaNetworkDetatls(this.networkNames).subscribe(data =>{
        //this.group=data.data.channel_group
        //this.name=data.data.channel_name
        //this.channelNames=[data.data.channel_name]
        
        })

        //console.log(this.networkNames.toString+'>>>>>>>>>>>>>>>>>>>>>>>>>>>')
      
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
     //console.log('>>>>>>>>'+this.channelGroup.nativeElement.value+'|>>>>>>group')
     //console.log('>>>>>>>>'+this.channelName.nativeElement.value+'|>>>>>>name')
     if(this.channelName.nativeElement.value!=''){
      this.addButtonFlag=true
         }
     
     

  }
  onCloseClick(){
    this.dialogRef.close();
   }

   onAddClick(){
     
     var group=this.channelGroup.nativeElement.value
     var name=this.channelName.nativeElement.value

     //console.log(group+'------'+name)

     var jsonString='{ "networkName": "'+this.networkNames+'","channelGroup": "'+group+'", "channelName": "'+name+'"}'
     console.log(jsonString);
     //for save new network mapping for ga
     if(this.actionFlag==1){
          this.gaChannelMappingService.saveGaChannelMapping(jsonString).subscribe(data =>{
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
     //Fot ga network update
     else if(this.actionFlag==2){
            this.gaChannelMappingService.updateGaNetwork(jsonString).subscribe(data =>{
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
