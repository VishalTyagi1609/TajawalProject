import { NetworkModel } from './../../../components/model/network.model';
import { CustomAlertComponent } from './../../../custom-alert/custom-alert.component';
import { NeworkCostService } from './../../../services/nework-cost.service';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-edit-network-cost-pop-up',
  templateUrl: './edit-network-cost-pop-up.component.html',
  styleUrls: ['./edit-network-cost-pop-up.component.css']
})
export class EditNetworkCostPopUpComponent implements OnInit {

  cost : string 
  valueFlag=false

  constructor(public dialogRef: MatDialogRef<CustomAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private networkService : NeworkCostService,private alert: MatDialog) {
      dialogRef.disableClose = true;
     }
  public network : NetworkModel;
  
  ngOnInit() {
  }
  onCloseClick(){
    this.dialogRef.close();
   }
   validateValue(){
    var event : any=this.network.value
    
     var value : string=this.network.value
     //console.log('>>>>>>>>>>>>>>>>>>'+this.network.value)
      if(value == null ){
        this.network.value='';
      //this.network.value=null;
      this.valueFlag=true
      //return
    }
    else if(Number(this.network.value)>=100 || Number(this.network.value)<=0){
      this.network.value=''
      this.network.value=null;

       //console.log("++++++++++++++++");
     this.valueFlag=true
     }
     else{
       this.valueFlag=false
     }
   }
  onUpdateClick(): void {        
    var networkJson='{ "networkCosts" : ['+JSON.stringify(this.network)+']}'
    console.log(networkJson)
    this.networkService.updateNetwork(networkJson).subscribe(data => {
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

}
