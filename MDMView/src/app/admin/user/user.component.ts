import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewChild } from '@angular/core'
import { Observable, Subject } from 'rxjs';
import { MatDialog, MatSortHeader } from '@angular/material';
/*import {  LoginService } from './../../services/login-service.service';
*/
import {LoginService} from './../../services/login-service.service';
import {User } from '../../components/model/user.model';
import { DataTableDirective } from 'angular-datatables';
import { UpdateUserPopUpComponent } from '../popup/update-user-pop-up/update-user-pop-up.component';
import { AddNewuserPopupComponent } from '../popup/add-newuser-popup/add-newuser-popup.component';
import { YesNoPopUpComponent } from '../popup/yes-no-pop-up/yes-no-pop-up.component';
import { SuccessPopUpComponent } from '../popup/success-pop-up/success-pop-up.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  
})
export class UserComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  public user_id=localStorage.getItem('user_id');

  
  dtOptions: DataTables.Settings = {}
  user: User[]
  public total_records : number= 0;

  public columnList : string[]=[]; 
  public errorMsg;
  
  public norecordsFlag = 1;
  
  

  constructor(private loginService : LoginService, private route: ActivatedRoute,private alert: MatDialog) {}

  ngOnInit() {
    //console.log(">>>>>>>>>>>>>>")
    this.dtOptions = {
      searching : false,
      scrollX : true,  
      //scrollY : true,
      scrollCollapse: false,
      paging : true,
      //autoWidth : true,
      columnDefs : [{ "width": "200px", "targets": 0 },
                    { "width": "120px", "targets": 1 },
                    { "width": "200px", "targets": 2 },
                    { "width": "100px", "targets": 3 },
                    { "width": "100px", "targets": 4 }                  
                  ],
      
                    drawCallback: function (settings) { // this gets rid of duplicate headers
       

      },
      ordering:false,
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      
      order:[],
      
      ajax: (dataTablesParameters: any, callback) => {
        //console.log(">>>>>>>>>>>>>>")

            this.loginService.getUserList(dataTablesParameters.start,dataTablesParameters.length).subscribe(resp => {
            this.user = resp.data
            this.norecordsFlag=Number(resp.recordFiltered)
            if(this.total_records==0){this.total_records= +resp.recordFiltered}
            
            callback({ 
              recordsTotal: resp.recordFiltered,//resp.recordsTotal,
              recordsFiltered: resp.recordFiltered,//resp.recordsFiltered,
              data: []              
            });
          });
        
       
      },
       columns: [{ data: 'user_id' },{ data: 'user_name' }, 
                  { data: 'password' },{data : 'role'},{ }]

      
    }
    
      
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  
  }
  
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }


  updateUser(i)   
  {

  let dialogRef = this.alert.open(UpdateUserPopUpComponent, {
    width: '700px'});

    dialogRef.componentInstance.user=this.user[i]
  }

  addNewUser() {  

    let dialogRef = this.alert.open(AddNewuserPopupComponent, {
    width: '700px'});
    var user : User = new User();
    dialogRef.componentInstance.target=user

  }
  deleteUser(user_id){
    let dialogRef = this.alert.open(YesNoPopUpComponent, {
    width: '600px'});
    console.log(">>>>>>>>>>>>>||||"+user_id)
    dialogRef.componentInstance.message='You sure about deleting the selected user?'
    dialogRef.afterClosed().subscribe(result => {
    if(result.data=='yes'){
    
    
    //console.log("This is JSON Data"+myJSON);
    this.loginService.deleteUser(user_id).subscribe(data => {
    
    if((data.status)=='success'){
      let dialogRef = this.alert.open(SuccessPopUpComponent, {
        width: '700px'});  
    dialogRef.componentInstance.message='Successfully Deleted'
    this.rerender()
    console.log(">>>>>>>>>>>>>")
    //Success lert
    }
    else{
    dialogRef.componentInstance.message='Sorry something went wrong'
    }
    console.log("data Delete Operation >>>>"+data.status)})
    }
    })
    }

    getUserDetails(user_id){
    
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>")
      
    
      console.log("getUserDetails user_id"+" "+user_id)
    
      this.loginService.getUserDetails(user_id).subscribe(data => {
       
         if((data.status)=='success'){
           
           }
         else{
         }
         console.log("data Update >>>>"+data.status)})
    }

  
}
    
/*/updateUser(user_id,user_name,password,role){
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>")
  var obj={
 'user_id' : user_id,
 'user_name' : user_name,
 'password' : password,
 'role' : role
  };
  
  var myJSON = JSON.stringify(obj);

  console.log("????????"+myJSON)

  this.loginService.updateUser(myJSON).subscribe(data => {
   
     if((data.status)=='success'){
       //Success lert
       }
     else{
     }
     console.log("data Update >>>>"+data.status)})
     
  //return myJSON; 
 }*/

/*
  var hotelJson='{ "hotels" : ['+JSON.stringify(this.hotels[i])+']}'
  //console.log("Json text="+  hotelJson +i)

  this.hotelService.updateHotel(hotelJson).subscribe(data => {
     let dialogRef = this.alert.open(CustomAlertComponent, {
      width: '500px'});
       if((data.status)=='success'){
         //Success lert
         dialogRef.componentInstance.message='Successfully updated'
         }
       else{
        dialogRef.componentInstance.message='Sorry something went wrong'
       }
  },
     //console.log("data Update >>>>"+data.status)},
     error => this.errorMsg = error  )
     */

   /*addNewUser(user_id,user_name,password,role){
        var obj1 = {
          'user_id':user_id,
          'user_name':user_name,
          'password':password,
          'role':role
        };

        var myJSON = JSON.stringify(obj1);

        console.log("This is JSON Data"+myJSON);
        this.loginService.addNewUser(myJSON).subscribe(data => {
     
          if((data.status)=='success'){
            //Success lert
            }
          else{
          }
          console.log("data Insert Operation >>>>"+data.status)})

   }*/
   /*
  var hotelJson='{ "hotels" : ['+JSON.stringify(this.hotels[i])+']}'
  //console.log("Json text="+  hotelJson +i)

  this.hotelService.updateHotel(hotelJson).subscribe(data => {
     let dialogRef = this.alert.open(CustomAlertComponent, {
      width: '500px'});
       if((data.status)=='success'){
         //Success lert
         dialogRef.componentInstance.message='Successfully updated'
         }
       else{
        dialogRef.componentInstance.message='Sorry something went wrong'
       }
  },
     //console.log("data Update >>>>"+data.status)},
     error => this.errorMsg = error  )
     */


