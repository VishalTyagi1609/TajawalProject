import { MonthlyTargetBean } from './../components/model/monthlyTarget';
import { Observable } from 'rxjs/Rx';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SuspiciousordersService {

  private getSuspiciousOrdersUrl : string = 'v1/suspiciousOrders/getSuspiciousOrders';
  private saveSuspiciousOrdersUrl : string = 'v1/suspiciousOrders/saveSuspiciousOrders';
 
  constructor(private http: HttpClient) { }

  private headers = new HttpHeaders().set('token',localStorage.getItem('token'));
  private headersPost = new HttpHeaders(
    {
      'token' : localStorage.getItem('token'),
      'Content-Type' : 'application/json'
    });
  private baseUrl = localStorage.getItem('baseUrl');
  
  errorHandler(error : HttpErrorResponse){
    return Observable.throw(error.message || 'Server Eror')
  }
 
  getSuspiciousOrders(offset, limit):Observable<any>{

    let Params = new HttpParams();
    Params=Params.append('offset', offset.toString() );
    Params=Params.append('limit', limit.toString() );
    return this.http.get<any>(this.baseUrl + this.getSuspiciousOrdersUrl,
                                {headers : this.headers,params : Params})
                                .catch(this.errorHandler);
  }
  
  saveSuspiciousOrders(orderId,flag) : Observable<any>{
    //console.log(">>>>>>>>>>>>>")
    let Params = new HttpParams();
    Params=Params.append('orderId',orderId);
    Params=Params.append('flag',flag );
    
    return this.http.post<MonthlyTargetBean>(this.baseUrl + this.saveSuspiciousOrdersUrl,{},
                                {headers : this.headersPost, params : Params})
                                .catch(this.errorHandler);

  }
  
}
