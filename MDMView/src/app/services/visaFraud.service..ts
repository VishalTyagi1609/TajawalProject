import { MonthlyTargetBean } from './../components/model/monthlyTarget';
import { Observable } from 'rxjs/Rx';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class VisaFraudService {

  private getMatchingCustomersUrl : string = 'v1/visaFraud/getMatchingCustomers';
  private updateCustomerUrl : string = 'v1/visaFraud/updateCustomer';
 
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
 
  getMatchingCustomers(columnName, search, offset, limit):Observable<any>{

    //console.log("????????????"+columnName+"----"+search)
    let Params = new HttpParams();
    Params=Params.append('columnName',columnName);
    Params=Params.append('search',search );
    Params=Params.append('offset', offset.toString() );
    Params=Params.append('limit', limit.toString() );
    return this.http.get<any>(this.baseUrl + this.getMatchingCustomersUrl,
                                {headers : this.headers, params : Params})
                                .catch(this.errorHandler);
  }
  
  updateCustomer(customerId,visaFraud,firstOrderNo,firstOrderDate) : Observable<any>{
     
    let Params = new HttpParams();
    Params=Params.append('customerId',customerId);
    Params=Params.append('visaFraud',visaFraud );
    Params=Params.append('firstOrderNo',firstOrderNo);
    Params=Params.append('firstOrderDate',firstOrderDate )
    
    return this.http.post<MonthlyTargetBean>(this.baseUrl + this.updateCustomerUrl,{},
                                {headers : this.headersPost, params : Params})
                                .catch(this.errorHandler);

  }
  
}
