import { CustomAlertComponent } from './../../../custom-alert/custom-alert.component';
import { AdjustNetworkMappingPopUpComponent } from './../../popup/adjust-network-mapping-pop-up/adjust-network-mapping-pop-up.component';
import { AddNetworkCostPopUpComponent } from './../../popup/add-network-cost-pop-up/add-network-cost-pop-up.component';
import { DataTableDirective } from 'angular-datatables';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SpendChannelService } from './../../../services/spend-channel.service';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-adjust-channel-mapping',
  templateUrl: './adjust-channel-mapping.component.html',
  
})
export class AdjustChannelMappingComponent implements OnInit {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild('adjustNetwork') adjustNetwork: ElementRef;
  @ViewChild('missingNetwork') missingNetwork: ElementRef;

  
  dtOptions : DataTables.Settings = {};
  dtTrigger: Subject  <any> = new Subject();

  public networkNames : String[]
  public adjustNetworkChannels : string[] 
  public tableFlag=true
  public updateFlag=false
  public noRecordFlag=true

  constructor(private spendChannelService : SpendChannelService, private route: ActivatedRoute,private alert: MatDialog) { }

  ngOnInit() {

    this.getMissingNetworkList()
   /* this.spendChannelService.getnetworkChannelsmissing(0,1000000).subscribe(resp => {
      this.networkNames = resp.data
      
       //console.log('ajax called'+this.networkNames)
      })*/

     /*this.dtOptions = {
      searching : false,
      scrollX : true,   
      scrollY : '400px',
      scrollCollapse: true,
      paging : true,
      autoWidth : false,
      columnDefs : [{ "width": "300px", "targets": 0 },{ "width": "100px", "targets": 1 }],
                            
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      
      order:[],
      
      ajax: (dataTablesParameters: any, callback) => {
                     
            this.spendChannelService.getnetworkChannelsmissing(dataTablesParameters.start,dataTablesParameters.length).subscribe(resp => {
                              this.networkNames = resp.data
                               console.log('ajax called'+this.networkNames)
                   //this.norecordsFlag=Number(resp.recordFiltered)
                   // if(this.total_records==0){this.total_records= +resp.recordFiltered}
            
            callback({
              recordsTotal: resp.recordFiltered,//resp.recordsTotal,
              recordsFiltered: resp.recordFiltered,//resp.recordsFiltered,
              data: []              
            });
          });
        
        
      },
       columns: [{ data: 'network' }]
      
      
    } */
   
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

  getMissingNetworks()
  {

    
    this.tableFlag=true
    this.updateFlag=false

    this.getMissingNetworkList()

    /*this.spendChannelService.getnetworkChannelsmissing(0,1000000).subscribe(resp => {
      this.networkNames = resp.data
       //console.log('ajax called'+this.networkNames)
      })*/
   

    //this.rerender()
    //this.ngOnInit()
    //this.rerender()
   //  console.log("getMissingNetworks called >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")    
 
    
  }

  updateNetwork(){
    this.tableFlag=false
    this.updateFlag=true

    this.spendChannelService.getAdjustNetworkNames().subscribe(data =>{
      this.adjustNetworkChannels=data.data
      //console.log(data.status)
      })
  }

  onUpdateClick(){
    
   var channel=this.adjustNetwork.nativeElement.value 
   let dialogRef = this.alert.open(AdjustNetworkMappingPopUpComponent, {
      width: '900px'});
      dialogRef.componentInstance.networkName=this.adjustNetwork.nativeElement.value 
      dialogRef.componentInstance.actionFlag=2
      
  }

  addChannel(network){
    
   if(this.missingNetwork.nativeElement.value==''){
    let dialogRef = this.alert.open(CustomAlertComponent, {
      width: '500px'});
    dialogRef.componentInstance.message='Please Select missing Channel'
    return
    }
   

    let dialogRef = this.alert.open(AdjustNetworkMappingPopUpComponent, {
      width: '900px'});
      dialogRef.componentInstance.networkName=this.missingNetwork.nativeElement.value
      dialogRef.componentInstance.actionFlag=1
      
      dialogRef.afterClosed().subscribe(result => { 
        this.getMissingNetworkList()
          /*this.spendChannelService.getnetworkChannelsmissing(0,1000000).subscribe(resp => {
          this.networkNames = resp.data
           //console.log('ajax called'+this.networkNames)
          })*/
       });

  }

  getMissingNetworkList(){
    this.spendChannelService.getnetworkChannelsmissing(0,1000000).subscribe(resp => {
      this.networkNames = resp.data
       //console.log('ajax called'+this.networkNames)

          if(resp.recordFiltered==0){
            this.noRecordFlag=false
          }
          else{
            this.noRecordFlag=true
              }
      })
  }
}
