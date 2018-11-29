import { Observable } from 'rxjs/Rx';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SpendChannelService {

  private saveChannelUrl : string = 'v1/channel/saveChannel';
  private channelGroupsUrl : string = 'v1/channel/channelGroups';
  private channelNamesUrl : string = 'v1/channel/channelNames';
  private getChannelsUrl : string = 'v1/channel/getChannels';
  private getnetworkChannelsmissingUrl : string = 'v1/channel/getnetworkChannelsmissing';
  private getAdjustNetworkNamesUrl : string = 'v1/channel/getAdjustNetworkNames';
  private saveNetworkUrl : string = 'v1/channel/saveNetwork'; 
  private updateAdjustNetworUrl : string = 'v1/channel/updateNetwork';
  private getNetworkDetatlsUrl : string = 'v1/channel/getNetworkDetatls';

  constructor(private http: HttpClient) { }

  private headers = new HttpHeaders().set('token',localStorage.getItem('token'));
  private headersPost = new HttpHeaders(
    {
      'token' : localStorage.getItem('token'),
      'Content-Type' : 'application/json'
    });
  private baseUrl = localStorage.getItem('baseUrl');


  getChannelGroups():Observable<any>{
    return this.http.get<any>(this.baseUrl + this.channelGroupsUrl,
                                {headers : this.headersPost})
                                .catch(this.errorHandler);
   }

   getChannelNames(channelGroup):Observable<any>{
    let Params = new HttpParams();
    Params=Params.append('channelGroup',channelGroup );
    return this.http.get<any>(this.baseUrl + this.channelNamesUrl,
                                {headers : this.headers,params : Params})
                                .catch(this.errorHandler);
   }

   getChannels(searchString,offset,limit):Observable<any>{

    let Params = new HttpParams();
    //Params=Params.append('networkType',type );
    Params=Params.append('searchString',searchString );
    Params=Params.append('limit', limit.toString() );
    Params=Params.append('offset', offset.toString() );
    return this.http.post<any>(this.baseUrl + this.getChannelsUrl,{},
                                {headers : this.headersPost,params : Params})
                                .catch(this.errorHandler);
  }

  saveChannel(channelJson){
    return this.http.post<any>(this.baseUrl + this.saveChannelUrl,channelJson,
      {headers : this.headersPost})
      .catch(this.errorHandler);  
    }

    getnetworkChannelsmissing(offset,limit):Observable<any>{

      let Params = new HttpParams();
      Params=Params.append('limit', limit.toString() );
      Params=Params.append('offset', offset.toString() );
      return this.http.get<any>(this.baseUrl + this.getnetworkChannelsmissingUrl,
                                  {headers : this.headers,params : Params})
                                  .catch(this.errorHandler);
    }

    getAdjustNetworkNames():Observable<any>{
      return this.http.get<any>(this.baseUrl + this.getAdjustNetworkNamesUrl,
                                  {headers : this.headersPost})
                                  .catch(this.errorHandler);
     }

     saveNetwork(networkJson){
      return this.http.post<any>(this.baseUrl + this.saveNetworkUrl,networkJson,
        {headers : this.headersPost})
        .catch(this.errorHandler);  
      }

      updateAdjustNetwor(networkJson){
        return this.http.post<any>(this.baseUrl + this.updateAdjustNetworUrl,networkJson,
          {headers : this.headersPost})
          .catch(this.errorHandler);  
        }  
   errorHandler(error : HttpErrorResponse){
    return Observable.throw(error.message || 'Server Eror')
  }

  getNetworkDetatls(networkName):Observable<any>{
    let Params = new HttpParams();
    Params=Params.append('networkName', networkName );
    return this.http.get<any>(this.baseUrl + this.getNetworkDetatlsUrl,
                                {headers : this.headersPost,params : Params})
                                .catch(this.errorHandler);
   }
}
