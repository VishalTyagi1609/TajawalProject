import { GaMappedChannels } from './../../../components/model/channel.model';
import { GaChannelMappingService } from './../../../services/ga-channel-mapping.service';
import { CustomAlertComponent } from './../../../custom-alert/custom-alert.component';
import { AdjustNetworkMappingPopUpComponent } from './../../popup/adjust-network-mapping-pop-up/adjust-network-mapping-pop-up.component';
import { AddNetworkCostPopUpComponent } from './../../popup/add-network-cost-pop-up/add-network-cost-pop-up.component';
import { DataTableDirective } from 'angular-datatables';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SpendChannelService } from './../../../services/spend-channel.service';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GANetworkMappingPopUpComponent } from '../../popup/ga-network-mapping-pop-up/ga-network-mapping-pop-up.component';

@Component({
  selector: 'app-ga-channel-mapping',
  templateUrl: './ga-channel-mapping.component.html',
  
})
export class GAChannelMappingComponent implements OnInit {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  //@ViewChild('adjustNetwork') adjustNetwork: ElementRef;
  //@ViewChild('missingNetwork') missingNetwork: ElementRef;
  @ViewChild('searchText') searchText: ElementRef;


  
  dtOptions : DataTables.Settings = {};
  dtTrigger: Subject  <any> = new Subject();
   
  public networkNames : String[]
  public checkedNetworkNames : Array<String>=[]
  public adjustNetworkChannels : string[] 
  public loader:boolean=false
  public missingRecordCountFlag = false

  constructor(private spendChannelService : SpendChannelService,private gaChannelMappingService : GaChannelMappingService,private router: Router ,private route: ActivatedRoute,private alert: MatDialog) { }

  ngOnInit() {

    this.dtOptions = {
      searching : false,
      scrollX : true,   
      scrollY : '500px',
      scrollCollapse: true,
      paging : true,
      autoWidth : false,
      columnDefs : [
          { "width": "20%", "targets": 0 },{ "width": "30%", "targets": 0 }
      ],
      ordering:false,                
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true, 
      processing: false,
      
      order:[],
      
      ajax: (dataTablesParameters: any, callback) => {
            this.loader=true         
            this.networkNames=null 
            //console.log('///////////'+dataTablesParameters);
            this.gaChannelMappingService.getGaMissingChannels(this.searchText.nativeElement.value ,dataTablesParameters.start,dataTablesParameters.length).subscribe(resp => {
                    
                    //this.networkNames = []
                    this.networkNames = resp.data
                   if(resp.recordFiltered==0){
                     this.missingRecordCountFlag=true
                   }
                   else{
                     this.missingRecordCountFlag=false
                   }
            this.loader=false
            callback({
              recordsTotal: resp.recordFiltered,//resp.recordsTotal,
              recordsFiltered: resp.recordFiltered,//resp.recordsFiltered,
              data: []
            });
          });

      },
       columns: [{ data: 'checkbox' },{ data: 'network' }]
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

  getMissingSourceMediumBysearchString()
{
  this.rerender()
}
  selectChannel(i)
{

    //console.log('fffffffffffffffffffffff--' + i) 
    var channelName=this.networkNames[i]
    //checkedNetworkNames
    //const checkedNetworkNamesTemp  : Array<String>=[]
    if(this.checkedNetworkNames.indexOf(channelName)==-1){
    this.checkedNetworkNames.push(channelName)
    }
    else{
      this.checkedNetworkNames.splice(this.checkedNetworkNames.indexOf(channelName),1)
    }
    //console.log("++++++++"+this.checkedNetworkNames)
}

addChannel(){
    
  if(this.checkedNetworkNames.length==0){
    let dialogRef = this.alert.open(CustomAlertComponent, {
      width: '500px'});
    dialogRef.componentInstance.message='Please Select Missing Channels'
    return
   }

   let dialogRef = this.alert.open(GANetworkMappingPopUpComponent, {
     width: '900px'});
     //dialogRef.componentInstance.networkNames=null;
     dialogRef.componentInstance.networkNames=this.checkedNetworkNames.toString();
     dialogRef.componentInstance.actionFlag = 1
     dialogRef.afterClosed().subscribe(result => { 
            this.rerender()
            this.checkedNetworkNames=[]
      });

 }

 updateNetwork(){

    this.router.navigate(['/admin/GAUpdateChannelMapping']);
  }

}
