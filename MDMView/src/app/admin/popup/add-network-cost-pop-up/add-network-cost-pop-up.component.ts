import { SourceChannelModel } from './../../../components/model/sourcecahnnel.model';
import { NetworkModel, NetworClass } from './../../../components/model/network.model';
import { CustomAlertComponent } from './../../../custom-alert/custom-alert.component';
import { NeworkCostService } from './../../../services/nework-cost.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,  } from '@angular/material';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatFormFieldModule,MatDatepickerToggle,MatDatepicker } from '@angular/material';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe }   from "@angular/common";



@Component({
  selector: 'app-add-network-cost-pop-up',
  templateUrl: './add-network-cost-pop-up.component.html',
  //styleUrls: ['./add-network-cost-pop-up.component.css'],
  providers: [DatePipe]
})
export class AddNetworkCostPopUpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CustomAlertComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,private networkService : NeworkCostService,private alert: MatDialog,private datePipe : DatePipe) {
    dialogRef.disableClose = true;
   }
  
  @ViewChild('networkType') networkType: ElementRef;
  @ViewChild('networkKpi') networkKpi: ElementRef;
  @ViewChild('datePick') picker: ElementRef; 
  
  public network : NetworkModel;
  public networklList : NetworClass[];
  public networkTypes : string[]=[];
  public networkKpis : string[]=[];
  public tableFlag=false
  public typeFlag=false
  public kpiFlag=false
  public selectTypeFlag=false
  public selectKpiFlag=false
  public addButtonFlag=false
  public valueFlag=false
  public networkTypeSelected : string;
  public channel : SourceChannelModel;
  public networkName : string;

  public minDate //= new Date(2015, 1, 1);
  public maxDate //= new Date(2030, 1, 1);

  //d1='2018, 6, 1';
  //public maxDate = new Date(this.d1);

  ngOnInit() {
    
    this.networkName=this.channel.network;
    var sDate=this.channel.startDate
    var eDate=this.channel.endDate

    var startDate=[sDate.slice(0, 4), ',', sDate.slice(4,6),',',sDate.slice(6)].join('');
    var endDate=[eDate.slice(0, 4), ',', eDate.slice(4,6),',',eDate.slice(6)].join('');
    
    this.minDate=new Date(startDate)
    this.maxDate=new Date(endDate)


    //console.log('+++++++++++++'+sDate+'--'+startDate+eDate+endDate)
    //this.date = this.datePipe.transform(new Date(), 'dd-MM-yy');
        
    this.networkService.getNetworkTypes().subscribe(data =>{
      this.networkTypes=data.data
      //console.log(data.status)
      })

      this.networkService.getCostKpis().subscribe(data =>{
        this.networkKpis=data.data
        //console.log(data.status)
        })
      
    
  }
  onDateeSelect(){
    //console.log("((((((((((((((((((((((((")
    this.typeFlag = true
  }

  onTypeSelect(){ 
    if(this.kpiFlag == true){
      //console.log("?????????????----")
      this.onSelect()
    }
    else{
    //console.log("?????????????")
    this.kpiFlag = true
    }
  }
  onKpiSelect(){
    
    this.onSelect()
  }

  onSelect()
  {
    this.selectTypeFlag=false
    this.selectKpiFlag=false

    var type=this.networkType.nativeElement.value
    var kpi=this.networkKpi.nativeElement.value
    if(type==='Select Type'){
      this.selectTypeFlag=true
           
    }
    if(kpi==='Select KPI'){
      this.selectKpiFlag=true
     }
    //this.addButtonFlag=!this.selectTypeFlag && !this.selectKpiFlag
    
    this.tableFlag=true
    //console.log(">>>>>>>>>");
    var networkNmme=this.channel.network
    var date=this.datePipe.transform(this.picker.nativeElement.value, 'dd/MM/yyyy');
    console.log(">>>>>>>>>>>"+date);
    var type=this.networkType.nativeElement.value
    var kpi=this.networkKpi.nativeElement.value
    //console.log(">>>>>>>>>");
    var m1=new NetworClass('tajawal', 'hotel', 'iOS',type,kpi,date,networkNmme,'0')
    var m2=new NetworClass('tajawal', 'hotel', 'android',type,kpi,date,networkNmme,'0')
    var m3=new NetworClass('tajawal', 'flight', 'iOS',type,kpi,date,networkNmme,'0')
    var m4=new NetworClass('tajawal','flight', 'android',type,kpi,date,networkNmme,'0')
    var m5=new NetworClass('tajawal','package', 'iOS',type,kpi,date,networkNmme,'0')
    var m6=new NetworClass('tajawal','package','android',type,kpi,date,networkNmme,'0')
    var m7=new NetworClass('almosafer', 'hotel', 'iOS',type,kpi,date,networkNmme,'0')
    var m8=new NetworClass('almosafer', 'hotel', 'android',type,kpi,date,networkNmme,'0')
    var m9=new NetworClass('almosafer', 'fligh', 'iOS',type,kpi,date,networkNmme,'0')
    var m10=new NetworClass('almosafer', 'flight', 'android',type,kpi,date,networkNmme,'0')
    var m11=new NetworClass('almosafer', 'package', 'iOS',type,kpi,date,networkNmme,'0')
    var m12=new NetworClass('almosafer', 'package', 'android',type,kpi,date,networkNmme,'0')

    this.networklList=[m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12]
    this.tableFlag=true
    //console.log(">>>>>>>>><<<<<<<<<"+this.tableFlag);
  }

  onCloseClick(){
    this.dialogRef.close();
   }
   validateValue(i){
    //console.log('>>>>>>>>>>>>>>>>>........|'+this.networklList[0].value+'.........')
    var value : string=this.networklList[i].value
    //console.log(">>>>>>>>>>>"+Number(value))
    if(this.networklList[i].value==null){
      this.networklList[i].value='';
      this.valueFlag=true
      this.addButtonFlag=false
    }
    else if(Number(value) < 0) {
     // console.log("++++++++++++++++");
     this.networklList[i].value='';
      //this.networklList[i].value=null;
      this.valueFlag=true
      //return
    }
    else if(Number(this.networklList[i].value)>=100 || Number(this.networklList[i].value)<0){
     this.networklList[i].value=null;
      //console.log("++++++++++++++++");  
    this.valueFlag=true  
    this.addButtonFlag=false
  
    }  
    //else {  
     // this.valueFlag=false  
      //  }      
      else if(this.networklList[0].value=='0' || this.networklList[0].value=='' || this.networklList[0].value==null     
          || this.networklList[1].value=='0' || this.networklList[1].value=='' || this.networklList[1].value==null   
          || this.networklList[2].value=='0' || this.networklList[2].value=='' || this.networklList[2].value==null   
          || this.networklList[3].value=='0' || this.networklList[3].value=='' || this.networklList[3].value==null   
          || this.networklList[4].value=='0' || this.networklList[4].value=='' || this.networklList[4].value==null   
          || this.networklList[5].value=='0' || this.networklList[5].value=='' || this.networklList[5].value==null   
          || this.networklList[6].value=='0' || this.networklList[6].value=='' || this.networklList[6].value==null   
          || this.networklList[7].value=='0' || this.networklList[7].value=='' || this.networklList[7].value==null   
          || this.networklList[8].value=='0' || this.networklList[8].value=='' || this.networklList[8].value==null   
          || this.networklList[9].value=='0' || this.networklList[9].value=='' || this.networklList[9].value==null   
          || this.networklList[10].value=='0'|| this.networklList[10].value==''|| this.networklList[10].value==null 
          || this.networklList[11].value=='0'|| this.networklList[11].value==''|| this.networklList[11].value==null  )
        {  
       //this.valueFlag=true
       //console.log('zero|'+this.networklList[0].value+"|<<<<")
       this.addButtonFlag=false
       this.valueFlag=true
       
    }
   else{
    this.addButtonFlag=true
    this.valueFlag=false
   }
   }

   onAddClick(): void { 

    var date:string = this.datePipe.transform(this.picker.nativeElement.value, 'dd/MM/yyyy');
    var type:string = this.networkType.nativeElement.value
    var kpi:string = this.networkKpi.nativeElement.value
    
    var networkJson='{ "networkCosts" : '+JSON.stringify(this.networklList)+'}' 
    
    this.networkService.updateNetwork(networkJson).subscribe(data => {
      let dialogRef = this.alert.open(CustomAlertComponent, {
      width: '500px'});
        if((data.status)=='success'){
          //Success alert
          dialogRef.componentInstance.message='Successfully Updated'
          }
        else{
        dialogRef.componentInstance.message='Sorry something went wrong'
        }
    
      })
  
      

    return;

   
          }

}
