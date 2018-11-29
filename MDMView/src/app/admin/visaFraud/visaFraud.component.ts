 import { VisaFraudPopUpComponent } from './../popup/visa-fraud-pop-up/visa-fraud-pop-up.component';
import { VisaFraudService } from './../../services/visaFraud.service.';
import { VisaFraudModel } from './../../components/model/visaFraud.model';
import { EditHotelPopUpComponent } from './../popup/edit-hotel-pop-up/edit-hotel-pop-up.component';
import { CustomAlertComponent } from './../../custom-alert/custom-alert.component';
import { Subject } from 'rxjs/Subject';
import { MatDialog, MatSortHeader } from '@angular/material';
//import { HotelDataSource } from './HotelDataSource';
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
  selector: 'visa-Fraud',
  templateUrl: './visaFraud.component.html',
  //styleUrls: ['./hotel.component.css']
})  
export class VisaFraud implements OnInit {
  @ViewChild('columnName') columnName: ElementRef;
  @ViewChild('searchText') searchText: ElementRef;
  //@ViewChild(MatPaginator) paginator: MatPaginator;
  
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  //hotel : Hotel
  dtOptions: DataTables.Settings = {};
  customers: VisaFraudModel[];
  public total_records : number= 0;

  public columnList : string[]=[]; 
  public errorMsg;
  public toggleFlag : number=1;
  public norecordsFlag = 1;
  
  //displayedColumns= ["name", "city"];

  constructor(private visaFraudService : VisaFraudService, private route: ActivatedRoute,private alert: MatDialog) {}

  ngOnInit() {
    //console.log(">>>>>>>>>>>>>>")
    this.dtOptions = {
      searching : false,
      scrollX : true,  
      scrollY : '400px',
      scrollCollapse: false,
      paging : true,
      //autoWidth : true,
      columnDefs : [{ "width": "230px", "targets": 0 },{ "width": "100px", "targets": 1 },
                    { "width": "100px", "targets": 2 },
                    { "width": "60px", "targets": 3 },{ "width": "100px", "targets": 4 }],
      drawCallback: function (settings) { // this gets rid of duplicate headers
       

      },
      ordering:false,
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      
      order:[],
      
      ajax: (dataTablesParameters: any, callback) => {
       // console.log(">>>>>>>>>>>>>>"+this.searchText.nativeElement.value+'f')
      // console.log(dataTablesParameters.search.value)
      var searchStr : string=dataTablesParameters.search.value
      if(searchStr.length>0){
       this.searchText.nativeElement.value=dataTablesParameters.search.value
            }
      
            
              var column = this.columnName.nativeElement.value
              var searchString=this.searchText.nativeElement.value
              this.visaFraudService.getMatchingCustomers(column,searchString,dataTablesParameters.start,dataTablesParameters.length).subscribe(resp => {
            this.customers = resp.data
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
                  { data: 'first_order_no' },{data : 'visaFraud'},
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
  public getCustomers(){
    this.rerender()
  }

  
editCustomer(i)
{

  let dialogRef = this.alert.open(VisaFraudPopUpComponent, {
    width: '700px'});

    dialogRef.componentInstance.target=this.customers[i]


}
}







