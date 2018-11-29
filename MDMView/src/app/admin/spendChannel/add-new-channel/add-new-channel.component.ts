import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { Channels } from './../../../components/model/channel.model';
import { ChannelComponent } from './../../channel/channel.component';
import { CustomAlertComponent } from './../../../custom-alert/custom-alert.component';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SpendChannelService } from './../../../services/spend-channel.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-add-ndew-channel',
  templateUrl: './add-new-channel.component.html',
})
export class AddNdewChannelComponent implements OnInit {

  @ViewChild('channelGroup') channelGroup: ElementRef;
  @ViewChild('channelName') channelName: ElementRef;
  @ViewChild('paidUnpaid') paidUnpaid: ElementRef;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  public channelGroups : string[]=[];
  public addFlag =  true
  public addChannelButtonFlag =  false

  dtOptions : DataTables.Settings = {};
  channels : Channels[];
  dtTrigger: Subject  <any> = new Subject();

  constructor(private spendChannelService : SpendChannelService, private route: ActivatedRoute,private alert: MatDialog) { }

  ngOnInit() {
    this.spendChannelService.getChannelGroups().subscribe(data =>{
      this.channelGroups=data.data
      console.log(this.channelGroups)
    })

    this.dtOptions = {
      searching : true,
      scrollX : true,   
      scrollY : '400px',
      scrollCollapse: true,
      paging : true,
      autoWidth : false,
      columnDefs : [{ "width": "30%", "targets": 0 },{ "width": "40%", "targets": 1 }],
      ordering:false,                                      
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      
      order:[],
      
      ajax: (dataTablesParameters: any, callback) => {
                     
            this.spendChannelService.getChannels(dataTablesParameters.search.value ,dataTablesParameters.start,dataTablesParameters.length).subscribe(resp => {
                              this.channels = resp.data
                    // console.log('ajax called'+resp.data)
                    //this.norecordsFlag=Number(resp.recordFiltered)
                    // if(this.total_records==0){this.total_records= +resp.recordFiltered}
            
            callback({
              recordsTotal: resp.recordFiltered,//resp.recordsTotal,
              recordsFiltered: resp.recordFiltered,//resp.recordsFiltered,
              data: []              
            });
          });
        
        
      },
       columns: [{ data: 'channel_group' },{ data: 'channel_name' }, { data: 'paid_unpaid' }]
      
      
    }
  }


  addNew(){
    this.addFlag=true
  }
  addExisting(){
   this.addFlag=false
  }

  addChannel(){
   var channelGroup : string= this.channelGroup.nativeElement.value
   var channelName : string= this.channelName.nativeElement.value
   var paidUnpaid= this.paidUnpaid.nativeElement.value
  
   var group : string=channelGroup.trim()
   
   if(group.length==0 || group.charAt(0)== ' '){
    
    let dialogRef = this.alert.open(CustomAlertComponent, {
      width: '500px'});
    dialogRef.componentInstance.message='Please Enter ChannelGroup'
    return
    }
   if(channelName.length==0 || channelName.charAt(0)== ' '){
    
    let dialogRef = this.alert.open(CustomAlertComponent, {
      width: '500px'});
    dialogRef.componentInstance.message='Please Enter ChannelName'
    return
    }

   var json='{"channel_group": "'+channelGroup+'","channel_name": "'+channelName+'","paid_unpaid": "'+paidUnpaid+'"}'
   //console.log(json)
 
   this.addChannelButtonFlag=true
   this.spendChannelService.saveChannel(json).subscribe(data =>{
    
     this.addChannelButtonFlag=false
     this.channelGroup.nativeElement.value=''
     this.channelName.nativeElement.value=''

     this.rerender()
        if((data.status)=='success'){
          //Success lert
          let dialogRef = this.alert.open(CustomAlertComponent, {
            width: '500px'});
          dialogRef.componentInstance.message='Successfully Processed'
          }
          else if((data.status)=='updated'){
            //Success lert
            let dialogRef = this.alert.open(CustomAlertComponent, {
              width: '500px'});
            dialogRef.componentInstance.message='Successfully Updated'
            }
        else{
          let dialogRef = this.alert.open(CustomAlertComponent, {
            width: '500px'});
        dialogRef.componentInstance.message='Sorry something went wrong'
        }
   })  
  
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
}
