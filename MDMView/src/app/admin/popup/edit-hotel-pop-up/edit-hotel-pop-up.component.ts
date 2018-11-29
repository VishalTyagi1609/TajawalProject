import { HotelService } from './../../../services/hotel.service';
import { Data } from './../../../components/model/hotel.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomAlertComponent } from './../../../custom-alert/custom-alert.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatSortHeader } from '@angular/material';

@Component({
  selector: 'app-edit-hotel-pop-up',
  templateUrl: './edit-hotel-pop-up.component.html',
  
})
export class EditHotelPopUpComponent  {

  
  constructor(public dialogRef: MatDialogRef<CustomAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private hotelService : HotelService,private alert: MatDialog) {
      dialogRef.disableClose = true;
     }

   hotel : Data;

   onCloseClick(){
    this.dialogRef.close();
   }
   onUpdateClick(): void {    
    var hotelJson='{ "hotels" : ['+JSON.stringify(this.hotel)+']}'
    console.log(hotelJson)
    this.hotelService.updateHotel(hotelJson).subscribe(data => {
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
}
