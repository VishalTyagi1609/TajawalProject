import { CustomAlertComponent } from './../../custom-alert/custom-alert.component';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from './../../services/hotel.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'hotel-upload',
    templateUrl: './hotelUpload.component.html',
    //styleUrls: ['./hotel.component.css']
  })  
  export class HotelUpload implements OnInit {

    @ViewChild('uploadfile')
    uploadfile: any;

    public errorMsg;
    public status = false
    constructor(private router:Router,private hotelService : HotelService, private route: ActivatedRoute,private alert: MatDialog) {}

    public uploadButtonStatus='false';
    //public localStorage=localStorage;
    ngOnInit() {
     
      this.uploadButtonStatus='false'//(localStorage.getItem('uploadButtonStatus')=='true');
      console.log(this.uploadButtonStatus+localStorage.getItem('uploadButtonStatus'))

    }


    localStorageFunc():string{
      //return localStorage.getItem('uploadButtonStatus');
      return this.uploadButtonStatus
    }
    fileUpload(event){
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            let file: File = fileList[0];
            let formData:FormData = new FormData();
            formData.append('file', file, file.name);
            this.uploadButtonStatus='true';
            localStorage.setItem('uploadButtonStatus','true')

            
              //dialogRef.componentInstance.isactive=false
              //dialogRef.componentInstance.message='Data is uploading please wait'
              
            this.hotelService.uploadFile(formData).subscribe(data =>{
              //this.hotels=data.data,
              
              if((data.status)=='success'){
                //Success lert
                
                //this.uploadfile.nativeElement.value='';
                let dialogRef = this.alert.open(CustomAlertComponent, {
                  width: '500px'});
                dialogRef.componentInstance.isactive=true
                dialogRef.componentInstance.message=data.data[0]+' records updated and '+data.data[1]+' records skipped due to Id mismatch'
                localStorage.setItem('uploadButtonStatus','false')
                this.uploadButtonStatus='false';
                console.log(this.uploadButtonStatus);
                dialogRef.afterClosed().subscribe(result => {
                  //file.
                 // console.log("dialog closed")
                  //this.router.navigate(['/admin/uploadHotel']);
                  //window.location.reload()
              });
                
                }
              else{
                let dialogRef = this.alert.open(CustomAlertComponent, {
                  width: '500px'});
               dialogRef.componentInstance.message='Please upload a valid file with column(Id,Name,Address,City,Country,Chain,ChainName,Brand)'
               localStorage.setItem('uploadButtonStatus','false')
               this.uploadButtonStatus='false';
              }
              //console.log(data.status)
              },
              error => this.errorMsg = error  )
              
        }
      }
  }