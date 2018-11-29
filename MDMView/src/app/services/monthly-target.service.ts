import { MonthlyTargetBean } from './../components/model/monthlyTarget';
import { Observable } from 'rxjs/Rx';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MonthlyTargetService {

  private getBrndYearMonthUrl : string = 'v1/monthlytarget/getBrndYearMonth';
  private getMonthlyTargetsUrl : string = 'v1/monthlytarget/getMonthlyTargets';
  private updateMonthlyTargetUrl : string = 'v1/monthlytarget/updateMonthlyTarget';
  

 
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
 
  getBrndYearMonth():Observable<any>{

    let Params = new HttpParams();
    return this.http.get<any>(this.baseUrl + this.getBrndYearMonthUrl,
                                {headers : this.headers})
                                .catch(this.errorHandler);
  }
  
  getMonthlyTargets(brand, year, month,  offset, limit) : Observable<any>{
     
    let Params = new HttpParams();
    Params=Params.append('brand',brand);
    Params=Params.append('year',year );
    Params=Params.append('month', month );
    Params=Params.append('offset', offset.toString() );
    Params=Params.append('limit', limit.toString() );
   // console.log(Params)
    return this.http.post<MonthlyTargetBean>(this.baseUrl + this.getMonthlyTargetsUrl,{},
                                {headers : this.headersPost, params : Params})
                                .catch(this.errorHandler);

  }

  updateMonthlyTarget(targetJson){
    return this.http.post<any>(this.baseUrl + this.updateMonthlyTargetUrl,targetJson,
      {headers : this.headersPost})
      .catch(this.errorHandler);  
  }
  
}
