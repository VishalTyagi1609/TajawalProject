import { UpdaateTargetPopUpComponent } from './../popup/update-target-pop-up/update-target-pop-up.component';
import { MonthlyTargetBean } from './../../components/model/monthlyTarget';
import { MonthlyTargetService } from './../../services/monthly-target.service';
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
  selector: 'monthlyTarget',
  templateUrl: './monthlyTarget.component.html',
  //styleUrls: ['./hotel.component.css']
})  
export class MonthlyTargetComponent implements OnInit {
  @ViewChild('selectedBrand') selectedBrand: ElementRef;
  @ViewChild('selectedYear') selectedYear: ElementRef;
  @ViewChild('selectedMonth') selectedMonth: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  public brand : string[]=[];
  public year : string[]=[];
  public month : string[]=[];

  private  selBraand : string;
  private  selYear : string;
  private  selMonth : string;

  monthlyTargetList : MonthlyTargetBean[];


  hotel : Hotel
  dtOptions: DataTables.Settings = {};
  hotels: Data[];
  public total_records : number= 0;

  public columnList : string[]=[]; 
  public errorMsg;
  public toggleFlag : number=1;
  public norecordsFlag = 1;
  
  //displayedColumns= ["name", "city"];

  constructor(private monthlyTargetService : MonthlyTargetService, private route: ActivatedRoute,private alert: MatDialog) {}

  ngOnInit() {

    this.selBraand='Tajawal'
    this.selYear='2017'
    this.selMonth='january'
    //console.log('-----'+this.selectedBrand.nativeElement.value+'------')

    this.monthlyTargetService.getBrndYearMonth().subscribe(data =>{
      this.brand=data.data.brand
      this.year=data.data.year
      this.month=data.data.month
      //console.log(data.status)
    },
      error => this.errorMsg = error  )



    this.dtOptions = {
      searching : false,
      scrollX : true,  
      scrollY : 'true',
      scrollCollapse: false,
      paging : true,
      //autoWidth : true,
      columnDefs : [{ "width": "100px", "targets": 0 },{ "width": "100px", "targets": 1 },
                    { "width": "100px", "targets": 2 },
                    { "width": "100px", "targets": 3 },{ "width": "100px", "targets": 4 },
                    { "width": "100px", "targets": 5 },{ "width": "100px", "targets": 6 },
                    { "width": "100px", "targets": 7 },{ "width": "100px", "targets": 8 },
                    { "width": "100px", "targets": 9 } ],
      drawCallback: function (settings) { // this gets rid of duplicate headers
       
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
      if(searchStr.length>0){
            }
      //console.log(">>"+this.searchText.nativeElement.value+'f'+)
            
              //var column = this.hotelBrand.nativeElement.value
              //var searchString=this.searchText.nativeElement.value
              console.log('>>>>>>'+this.selectedBrand.nativeElement.value)
              if(this.selectedBrand.nativeElement.value!='')
                   //&& this.selectedYear.nativeElement.value!='2017' 
                   //&& this.selectedMonth.nativeElement.value!='january')
              {
                this.selBraand=this.selectedBrand.nativeElement.value
                this.selYear=this.selectedYear.nativeElement.value
                this.selMonth=this.selectedMonth.nativeElement.value
              }

              this.monthlyTargetService.getMonthlyTargets(this.selBraand,this.selYear,this.selMonth,dataTablesParameters.start,dataTablesParameters.length).subscribe(resp => {
            this.monthlyTargetList = resp.data
            //this.norecordsFlag=Number(resp.recordFiltered)
            //if(this.total_records==0){this.total_records= +resp.recordFiltered}
            
            callback({
              recordsTotal: resp.recordFiltered,//resp.recordsTotal,
              recordsFiltered: resp.recordFiltered,//resp.recordsFiltered,
              data: []              
            });
          });
        
        },
       columns: [{ data: 'id' },{ data: 'name' }, 
                  { data: 'city' },{data : 'country'},
                  {data : 'chain'},{data : 'brand'},
                  {data : 'chainname'},{data : 'address'},
                  {data : 'chainname'},{data : 'address'}]
       //columns: [{ data: 'id' }, { data: 'name' }, { data: 'city' },{data : 'country'},{data : 'chain'},{data : 'brand'}]
       //columns: [{}]
      
    }
    
      //this.columnList=new Array<string>('name','city','country_code','chain','hotel_brand');
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

  searchTargets()
  {
    this.rerender()
  }       

updatetarget(index)
{   
      let dialogRef = this.alert.open(UpdaateTargetPopUpComponent, {
      width: '700px'});
      dialogRef.componentInstance.target=this.monthlyTargetList[index]
      dialogRef.afterClosed().subscribe(result => { 
           
           if(result.data=='cancel'){
             this.rerender()
           }

       });
}





/*

  public getHotels(){

    this.rerender()
  }

  customSearch(){
    console.log("custom customSearch")
    this.toggleFlag=1
    this.rerender()
  }
  nullHotelsSearch(){
    console.log("nullHotelsSearch")
    this.toggleFlag=2
    this.rerender()
  }
 
editHotel(i)
{

  let dialogRef = this.alert.open(UpdaateTargetPopUpComponent, {
    width: '700px'});

    dialogRef.componentInstance.hotel=this.hotels[i]


}

fileUpload(event){
  let fileList: FileList = event.target.files;
  if(fileList.length > 0) {
      let file: File = fileList[0];
      let formData:FormData = new FormData();
      formData.append('file', file, file.name);
      
      this.hotelService.uploadFile(formData).subscribe(data =>{
        this.hotels=data.data,
        console.log(data.status)},
        error => this.errorMsg = error  )
  }
}
downloadCSV() {  
  if(this.toggleFlag==1){
  var column = this.hotelBrand.nativeElement.value
  var searchString=this.searchText.nativeElement.value
  window.open(localStorage.getItem('baseUrl')+'v1/hotel/downloadCSV?column='+column+'&search='+searchString+'&token='+localStorage.getItem('token'));
  //alert("Download completen")
   }
   else{
     console.log('else called')
    window.open(localStorage.getItem('baseUrl')+'v1/hotel/downloadCSV?column=null&search=null&token='+localStorage.getItem('token'));
   }
  
  

}

downloadFile(data: any) {
  console.log("downloadFile")
  let parsedResponse = data.text();
  let blob = new Blob([parsedResponse], { type: 'text/csv' });
  let url = window.URL.createObjectURL(blob);

  if(navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, 'Book.csv');
  } else {
      let a = document.createElement('a');
      a.href = url;
      a.download = 'Book.csv';
      document.body.appendChild(a);
      a.click();        
      document.body.removeChild(a);
  }
  window.URL.revokeObjectURL(url);
}*/
}

