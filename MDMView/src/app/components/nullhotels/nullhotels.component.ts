//import { Hotel } from './../model/hotel.model';
import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { Hotel , Data} from '../model/hotel.model'


@Component({
  selector: 'nullhotels',
  templateUrl: './nullhotels.component.html',
  styleUrls: ['./nullhotels.component.css']
})
export class NullhotelsComponent implements OnInit {
  public data1  = [];
  public hotelData; 
  public errorMsg;
  constructor(private hotelService : HotelService) { }
 
  ngOnInit() {
       this.hotelService.getNullHotel(0,100).subscribe(data => this.hotelData = data,
                                                       error => this.errorMsg = error );
       
      //this.data=this.hotelData.data
      console.log('got data')
      //console.log(this.hotelData)
  }


}