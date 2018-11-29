import { SourceChannelModel, SourceChannelClass } from './../../components/model/sourcecahnnel.model';
import { AddNetworkCostPopUpComponent } from './../popup/add-network-cost-pop-up/add-network-cost-pop-up.component';
import { EditNetworkCostPopUpComponent } from './../popup/edit-network-cost-pop-up/edit-network-cost-pop-up.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { NetworkModel } from './../../components/model/network.model';
import { NeworkCostService } from './../../services/nework-cost.service';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from './../../services/hotel.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-network-cost',
  templateUrl: './network-cost.component.html',
  styleUrls: ['./network-cost.component.css']
})
export class NetworkCostComponent implements OnInit {

  @ViewChild('networkType') networkType: ElementRef;
  @ViewChild('networkName') networkName: ElementRef;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(private networkService : NeworkCostService, private route: ActivatedRoute,private alert: MatDialog) { }

  public networkTypes : string[]=[];
  public networkNames : string[]=[];
  public networkList : NetworkModel[];  
  public network : NetworkModel;  
  public selectAdjustNetworkFlag = false
  selectNetworkTypeFlag=false
  public errorMsg;
  public addDisabledFlag = false
  
  public networkNameFlag = false;
  public norecordsFlag = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  

  ngOnInit() {

   
   // this.networkName.nativeElement.value='';
      
    this.networkService.getNetworkTypes().subscribe(data =>{
      this.networkTypes=data.data
      //console.log(data.status)
      },
      error => this.errorMsg = error  )
 
      //Get network list table
      this.dtOptions = {
        searching : false,
        scrollX : true,   
        scrollY : '400px',
        scrollCollapse: false,
        paging : true,
       // autoWidth : false,
        columnDefs : [{ "width": "200px", "targets": 0 },
                      { "width": "150px", "targets": 1 },
                      { "width": "70px", "targets": 2 },
                      { "width": "70px", "targets": 3 },
                      { "width": "90px", "targets": 4 },
                      { "width": "50px", "targets": 5 },
                      { "width": "120px", "targets": 6 },
                      { "width": "100px", "targets": 7 },
                      { "width": "120px", "targets": 8 }],

        drawCallback: function (settings) { // this gets rid of duplicate headers
          //  $('.dataTables_scrollBody table thead').css({ display: 'none' });
          //console.log('draw called' )
          //var api = this.api();
          //api.fixedHeader.adjust();
    
        },
        ordering:false,
        pagingType: 'full_numbers',
        pageLength: 10,
        serverSide: true,
        processing: false,
        
        order:[],
        
        ajax: (dataTablesParameters: any, callback) => {
          
        // console.log(dataTablesParameters.search.value)
        var searchStr : string=dataTablesParameters.search.value
       
              
                
              this.networkService.getNetworkCostList(this.networkType.nativeElement.value,this.networkName.nativeElement.value,dataTablesParameters.start,dataTablesParameters.length).subscribe(resp => {
              //this.networkService.getNetworkCostList('B','abc',1,10).subscribe(resp => {
              this.networkList = resp.data
              //console.log('ajax called'+resp.data)
              //this.norecordsFlag=Number(resp.recordFiltered)
             // if(this.total_records==0){this.total_records= +resp.recordFiltered}
              
              callback({
                recordsTotal: resp.recordFiltered,//resp.recordsTotal,
                recordsFiltered: resp.recordFiltered,//resp.recordsFiltered,
                data: []              
              });
            });
          
          
        },
         columns: [{ data: 'adnetwork_name' },{ data: 'date' }, 
                   { data: 'metric_name' },{data : 'value'},
                   {data : 'brand'},{data : 'type'},{data : 'address'},
                   {data : 'product'},{data : 'os'}]
         //columns: [{ data: 'id' }, { data: 'name' }, { data: 'city' },{data : 'country'},{data : 'chain'},{data : 'brand'}]
         //columns: [{}]
        
      }

    
}

getNetworkName(){
  //console.log(">>>>>"+this.networkType.nativeElement.value)
  this.selectNetworkTypeFlag=false;
  this.networkNameFlag=true;
  this.networkService.getNetworkNames(this.networkType.nativeElement.value).subscribe(data =>{
    this.networkNames=data.data
    //console.log(data.status)
  },
    error => this.errorMsg = error  )
}

getNetworkCostList()
{
  this.selectAdjustNetworkFlag=false;
  
   //console.log('getNetworkCostList called');
   this.rerender()

}

editNetworkCost(i)
{
  let dialogRef = this.alert.open(EditNetworkCostPopUpComponent, {
    width: '700px'});
    dialogRef.componentInstance.network=this.networkList[i]
    dialogRef.afterClosed().subscribe(result => {
         this.rerender()
        });

}

addNetwork(){
  //console.log(this.networkName.nativeElement.value)
    
    //console.log(this.networkName.nativeElement.value+"------------------");
    if(this.networkType.nativeElement.value=='Select'){
      this.selectNetworkTypeFlag=true;
      return
    }
    if(this.networkName.nativeElement.value=='Select'){
      this.selectAdjustNetworkFlag=true;
      return
    }
    this.addDisabledFlag=true
    this.networkService.getPresentNetwork(this.networkName.nativeElement.value).subscribe(resp => {
      //this.network = resp.data
      
      if(resp.data==null){
       var  channel = new SourceChannelClass(this.networkName.nativeElement.value,'','','20000101','20300101');
       let dialogRef = this.alert.open(AddNetworkCostPopUpComponent, {
        width: '1000px'});    
       dialogRef.componentInstance.channel=channel
       dialogRef.afterClosed().subscribe(result => {
        // console.log(result)
        this.rerender()
        this.addDisabledFlag=false
      });
      }
      else{
      let dialogRef = this.alert.open(AddNetworkCostPopUpComponent, {
        width: '1000px'});    
       dialogRef.componentInstance.channel=resp.data[0]
       dialogRef.afterClosed().subscribe(result => {
        // console.log(result)
        this.rerender()
        this.addDisabledFlag=false
      });
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

