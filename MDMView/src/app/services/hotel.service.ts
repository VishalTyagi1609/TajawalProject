import { SearchHotel } from './../components/model/hotel.model';
//import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Headers, RequestMethod, Request ,RequestOptions} from '@angular/http';
import { HttpClient, HttpErrorResponse,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Hotel, Data } from '../components/model/hotel.model'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
//import { RequestOptions } from 'https';


@Injectable()
export class HotelService {
 
   //private serviceUrl : string = 'http://52.39.168.246:8080/TajawalAppMDM/v1/hotel/hotelsWithNullFields?offset=1&limit=5';
   private nullHotesUrl : string = 'v1/hotel/hotelsWithNullFields';
   private hotelBrandUrl : string = 'v1/hotel/hotelBrands/'
   private matchingHotelsUrl : string = 'v1/hotel/matchingHotels/'
   private updateHotelUrl : string = 'v1/hotel/updateHotel/'
   private uploadHotelUrl : string = 'v1/hotel/uploadHotels/'
   private downloadHotelUrl : string = 'v1/hotel/downloadCSV/'
   
   private headers = new HttpHeaders().set('token',localStorage.getItem('token'));
   private headersPost = new HttpHeaders(
    {
      'token' : localStorage.getItem('token'),
      'Content-Type' : 'application/json'
    });
   //private header2 = new Headers().set('token',localStorage.getItem('token'));
   private baseUrl = localStorage.getItem('baseUrl');
    // private serviceUrl : string = '/assets/data/data.json';
  //  hotel : Hotel;
  constructor(private http: HttpClient) {}
  
  getNullHotel(offset,limit):Observable<Hotel>{
      let Params = new HttpParams();
      Params=Params.append('offset',offset);
      Params=Params.append('limit',limit );

      //let headers = new HttpHeaders().set('token',localStorage.getItem('token'));
      //this.options = new RequestOptions({headers : headers });
      //headers=headers.append('token', localStorage.getItem('token'));
      //console.log('header = '+headers.get('token'))
      return this.http.get<Hotel>(this.baseUrl+this.nullHotesUrl,{headers:this.headers,params:Params})
                                  .catch(this.errorHandler);
               
     }
  
    errorHandler(error : HttpErrorResponse){
      return Observable.throw(error.message || 'Server Eror')
    }

    getHotelBrands():Observable<any>{

      return this.http.get<Hotel>(this.baseUrl+this.hotelBrandUrl,{headers:this.headers})
                                  .catch(this.errorHandler);
      
    }

    getMatchingHotels(brand :string, searchString : string,   offset : number, limit : number) : Observable<Hotel>{
       //console.log("getMatchingHotels called => "+filter+"--->"+pageIndex)
         
      /* const headers2 = new HttpHeaders(
        {
          'token' : localStorage.getItem('token'),
          'Content-Type' : 'application/json'
        }); */

      let Params = new HttpParams();
      Params=Params.append('brand',brand );
      Params=Params.append('search',searchString );
      Params=Params.append('offset', offset.toString() );
      Params=Params.append('limit', limit.toString() );
     // console.log(Params)
      return this.http.post<Hotel>(this.baseUrl + this.matchingHotelsUrl,{},
                                  {headers : this.headersPost, params : Params})
                                  .catch(this.errorHandler);


     /*var requestoptions = new RequestOptions({
        method: RequestMethod.Post,
        url: this.baseUrl + this.matchingHotelsUrl,
        headers: new Headers().set('token',localStorage.getItem('token')), 
        body: searchHotel
    })*/
    //return this.http.request(new Request(requestoptions))
    }

    updateHotel(hotelJson) : Observable<any> {

      return this.http.post<any>(this.baseUrl + this.updateHotelUrl,hotelJson,
        {headers : this.headersPost})
        .catch(this.errorHandler);
    }

    uploadFile(formData) : Observable<any>
    {
      
      let  headers = new HttpHeaders(
        {
          'token' : localStorage.getItem('token')
          //'Content-Type' : 'application/json'
        });
      return this.http.post(this.baseUrl + this.uploadHotelUrl, formData, {headers : headers})
          //.map(res => res.json())
          .catch(this.errorHandler)
          
    }
    
    downloadHotelList(){
      let headers = new HttpHeaders();
      //headers.append('Content-Type', '');
      headers.append('Accept', 'application/csv');
      //headers.append('token',localStorage.getItem('token'));
      return this.http.get(this.baseUrl+this.downloadHotelUrl)
            //.catch(this.errorHandler)
    
    }

    getMatchingHotels2(courseId, filter, sortDirection,pageIndex, pageSize) : Observable<Hotel>{
     
     console.log("getMatchingHotels2 *********************");
      let Params = new HttpParams();
     Params=Params.append('brand','name');
     Params=Params.append('search','marriot' );
     Params=Params.append('offset', pageIndex.toString() );
     Params=Params.append('limit', pageSize.toString() );
    // console.log(Params)
     return this.http.post<Hotel>(this.baseUrl + this.matchingHotelsUrl,{},
                                 {headers : this.headersPost, params : Params})
                                 .catch(this.errorHandler);
   
   }
  }
