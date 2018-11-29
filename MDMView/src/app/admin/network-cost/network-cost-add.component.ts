import { SourceChannelModel } from './../../components/model/sourcecahnnel.model';
import { Subject } from 'rxjs/Subject';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { NeworkCostService } from './../../services/nework-cost.service';
import { DataTableDirective } from 'angular-datatables';
import { OnInit, Component, ViewChild } from '@angular/core';
import { AddNetworkCostPopUpComponent } from '../popup/add-network-cost-pop-up/add-network-cost-pop-up.component';
@Component({
    selector: 'app-network-cost-add',
    templateUrl: './network-cost-add.component.html',
    
  })
  export class NetworkCostAddComponent implements OnInit {

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

    constructor(private networkService : NeworkCostService, private route: ActivatedRoute,private alert: MatDialog) { }
    
    public channelList : SourceChannelModel[]; 
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject  <any> = new Subject();

    ngOnInit(){

        this.dtOptions = {
            searching : false,
            scrollX : true,   
            scrollY : '400px',
            scrollCollapse: true,
            paging : true,
            autoWidth : false,
            columnDefs : [{ "width": "30%", "targets": 0 },{ "width": "50%", "targets": 0 }],
            ordering:false,                      
            pagingType: 'full_numbers',
            pageLength: 10,
            serverSide: true,
            processing: false,
            
            order:[],
            
            ajax: (dataTablesParameters: any, callback) => {
              
                  this.networkService.getChannelList(dataTablesParameters.start,dataTablesParameters.length).subscribe(resp => {
                                    this.channelList = resp.data
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
             columns: [{ data: 'network' },{ data: 'installs' }, { data: 'bookings' },{data : 'startDate'},{data : 'endDate'},,{data : 'DcmNetwork'}]
            
            
          }
    }

    addNetworkCost(i){
        let dialogRef = this.alert.open(AddNetworkCostPopUpComponent, {
            width: '1000px'});
            dialogRef.componentInstance.channel=this.channelList[i]
            dialogRef.afterClosed().subscribe(result => {
              this.rerender()
             });
     
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