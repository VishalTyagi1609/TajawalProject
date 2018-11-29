import { YesNoPopUpComponent } from './../popup/yes-no-pop-up/yes-no-pop-up.component';
import { SuspiciousOrdersModel } from './../../components/model/suspiciousOrders.model';
import { SuspiciousordersService } from './../../services/suspiciousOrders.service';
import { VisaFraudPopUpComponent } from './../popup/visa-fraud-pop-up/visa-fraud-pop-up.component';
import { VisaFraudService } from './../../services/visaFraud.service.';
import { VisaFraudModel } from './../../components/model/visaFraud.model';
import { EditHotelPopUpComponent } from './../popup/edit-hotel-pop-up/edit-hotel-pop-up.component';
import { CustomAlertComponent } from './../../custom-alert/custom-alert.component';
import { Subject } from 'rxjs/Subject';
import { MatDialog, MatSortHeader } from '@angular/material';
import { Data, Hotel } from './../../components/model/hotel.model';
import { HotelService } from './../../services/hotel.service';
import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { SearchHotel } from '../../components/model/hotel.model';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import {MatPaginator, MatSort, MatTableDataSource,MatPaginatorModule,MatFormFieldModule,
  MatTableModule} from '@angular/material';
import { DataTableDirective } from 'angular-datatables';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'suspicious-orders',
  templateUrl: './suspiciousOrders.component.html',
})  
export class SuspiciousOrders implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  //hotel : Hotel
  dtOptions: DataTables.Settings = {}
  suspiciousOrders: SuspiciousOrdersModel[]
  public total_records : number= 0;

  public columnList : string[]=[]; 
  public errorMsg;
  //public toggleFlag : number=1;
  public norecordsFlag = 1;
  
  //displayedColumns= ["name", "city"];

  constructor(private suspiciousordersService : SuspiciousordersService, private route: ActivatedRoute,private alert: MatDialog) {}

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
                    { "width": "170px", "targets": 4 },
                    { "width": "220px", "targets": 5 }],
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

            this.suspiciousordersService.getSuspiciousOrders(dataTablesParameters.start,dataTablesParameters.length).subscribe(resp => {
            this.suspiciousOrders = resp.data
            this.norecordsFlag=Number(resp.recordFiltered)
            if(this.total_records==0){this.total_records= +resp.recordFiltered}
            
            callback({
              recordsTotal: resp.recordFiltered,//resp.recordsTotal,
              recordsFiltered: resp.recordFiltered,//resp.recordsFiltered,
              data: []              
            });
          });
        
       
      },
       columns: [{ data: 'dim_customer_id' },{ data: 'first_order_date' }, 
                  { data: 'first_order_no' },{data : 'visaFraud'},{data : 'sss'},
                  {data : 'action'}]

      
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
  //public getSuspiciousOrders(){
   // this.rerender()
  //}

  
editSuspiciousOrder(i)
{

  let dialogRef = this.alert.open(YesNoPopUpComponent, {
  width: '600px'});

  dialogRef.componentInstance.message='Are you sure, This is the suspicious order'
   dialogRef.afterClosed().subscribe(result => {
     //console.log(">>>>>>>>>"+result.data)

     if(result.data=='yes'){
      this.suspiciousOrders[i].isDisabled=true
      //this.suspiciousOrders.
    this.suspiciousordersService.saveSuspiciousOrders(this.suspiciousOrders[i].order_no,'True').subscribe(data => {
      let dialogRef = this.alert.open(CustomAlertComponent, {
      width: '500px'});
        if((data.status)=='success'){
          //Success alert
          dialogRef.componentInstance.message='Successfully Updated'
          this.rerender()
          }
        else{
        dialogRef.componentInstance.message='Sorry something went wrong'
        }
        //console.log("data Update >>>>"+data.status)
      }) 
    }
   // this.rerender()
   });
   
   
}
}

