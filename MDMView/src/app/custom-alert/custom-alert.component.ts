import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  })
export class CustomAlertComponent {
    constructor(
    public dialogRef: MatDialogRef<CustomAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    message:string;
    isactive = true;
    
  onNoClick(): void {
       this.dialogRef.close();
  }
}
