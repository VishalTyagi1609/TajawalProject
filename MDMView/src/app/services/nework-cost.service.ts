import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NeworkCostService {

  private missingNetworkCost : string = 'v1/cost/getMissingNetworkCosts';
  private getCostKPIs : string = 'v1/cost/getCostKPIs';
  private getNetworkType : string = 'v1/cost/getNetworkType';
  private saveNetworkCost : string = 'v1/cost/saveNetworkCost';
  private getDistinctNetworkNames : string = 'v1/cost/getDistinctNetworkNames';
  private getNetworkAllEntries : string = 'v1/cost/getNetworkAllEntries';
  private getNetwork : string = 'v1/cost/getNetwork';
  
  
  constructor(private http: HttpClient) { }

  private headers = new HttpHeaders().set('token',localStorage.getItem('token'));
  private headersPost = new HttpHeaders(
    {
      'token' : localStorage.getItem('token'),
      'Content-Type' : 'application/json'
    });
  private baseUrl = localStorage.getItem('baseUrl');

 getChannelList(offset,limit):Observable<any>{
  let Params = new HttpParams();
  Params=Params.append('limit_offset', limit.toString() );
  Params=Params.append('offset', offset.toString() );
  return this.http.post<any>(this.baseUrl + this.missingNetworkCost,{},
                              {headers : this.headersPost,params : Params})
                              .catch(this.errorHandler);
 }

 getNetworkTypes():Observable<any>{
  return this.http.post<any>(this.baseUrl + this.getNetworkType,{},
                              {headers : this.headersPost})
                              .catch(this.errorHandler);
 }

 getCostKpis():Observable<any>{
  return this.http.post<any>(this.baseUrl + this.getCostKPIs,{},
                              {headers : this.headersPost})
                              .catch(this.errorHandler);
 }

 getNetworkNames(networktype){
  let Params = new HttpParams();
  Params=Params.append('networkType',networktype);
  return this.http.post<Response>(this.baseUrl + this.getDistinctNetworkNames,{},
                              {headers : this.headersPost,params : Params})
                              .catch(this.errorHandler);
 }

 errorHandler(error : HttpErrorResponse){
  return Observable.throw(error.message || 'Server Eror')
}

getNetworkCostList(type,networkName,offset,limit):Observable<any>{

  let Params = new HttpParams();
  Params=Params.append('networkType',type );
  Params=Params.append('networkName',networkName );
  Params=Params.append('limit_offset', limit.toString() );
  Params=Params.append('offset', offset.toString() );
  return this.http.post<any>(this.baseUrl + this.getNetworkAllEntries,{},
                              {headers : this.headersPost,params : Params})
                              .catch(this.errorHandler);
}

getPresentNetwork(networkName):Observable<any>{

  let Params = new HttpParams();
  Params=Params.append('networkName',networkName );
  return this.http.post<any>(this.baseUrl + this.getNetwork,{},
                              {headers : this.headersPost,params : Params})
                              .catch(this.errorHandler);
}

updateNetwork(ntworkJson){
  return this.http.post<any>(this.baseUrl + this.saveNetworkCost,ntworkJson,
    {headers : this.headersPost})
    .catch(this.errorHandler);  
}
}
