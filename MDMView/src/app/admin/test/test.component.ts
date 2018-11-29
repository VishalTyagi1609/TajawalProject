import { Subject } from 'rxjs/Subject';
import { HotelService } from './../../services/hotel.service';
import { Hotel, Data } from './../../components/model/hotel.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import * as $ from "jquery";

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
   
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  
  dtTrigger: Subject<any> = new Subject();
  //constructor() { }
  dtOptions : DataTables.Settings = {};
  hotels: Data[];


  constructor(private hotelService : HotelService) {}

  ngOnInit(): void {
    //const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      scrollY : '400px',
      ajax: (dataTablesParameters: any, callback) => {
        /*that.http
          .post<DataTablesResponse>(
            'https://angular-datatables-demo-server.herokuapp.com/',
            dataTablesParameters, {}
          )*/
          
            console.log("datatable called *************")
            console.log(">>>>"+ dataTablesParameters.length+"-->"+dataTablesParameters.start);
            console.log(dataTablesParameters)
            
            this.hotelService.getMatchingHotels2('','','',dataTablesParameters.start*10,dataTablesParameters.length).subscribe(resp => {
            this.hotels = resp.data

            callback({
              recordsTotal: 60000,//resp.recordsTotal,
              recordsFiltered: resp.recordFiltered,//resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ data: 'id' }, { data: 'name' }, { data: 'city' },{data : 'country'},{data : 'chain'},{data : 'brand'}]
    };
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
