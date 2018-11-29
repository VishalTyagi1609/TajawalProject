import { Observable } from 'rxjs/Rx';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GaChannelMappingService {

  private getGaSourcemediumMappedChannelsUrl : string = 'v1/gaChannelMapping/getGaSourcemediumMappedChannels';
  private updateGANetworUrl :string = 'v1/gaChannelMapping/updateGANetwork';
  private getGaNetworkDetatlsUrl :string = 'v1/gaChannelMapping/getGaNetworkDetatls';
  private getGaMissingChannelsUrl='v1/gaChannelMapping/getGaMissingChannels';
  private saveGaChannelMappingUrl='v1/gaChannelMapping/saveGaChannelMapping';

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

  getGaMissingChannels(searchString,offset,limit):Observable<any>{

    let Params = new HttpParams();
    Params=Params.append('searchString', searchString.toString() );
    Params=Params.append('limit', limit.toString() );
    Params=Params.append('offset', offset.toString() );
    return this.http.get<any>(this.baseUrl + this.getGaMissingChannelsUrl,
                                {headers : this.headers,params : Params})
                                .catch(this.errorHandler);
  }

    getGaSourcemediumMappedChannels(searchString,offset,limit):Observable<any>{

      let Params = new HttpParams();
      Params=Params.append('searchString', searchString.toString() );
      Params=Params.append('limit', limit.toString() );
      Params=Params.append('offset', offset.toString() );
      return this.http.get<any>(this.baseUrl + this.getGaSourcemediumMappedChannelsUrl,
                                  {headers : this.headers,params : Params})
                                  .catch(this.errorHandler);
    }

    updateGaNetwork(networkJson){
      return this.http.post<any>(this.baseUrl + this.updateGANetworUrl,networkJson,
        {headers : this.headersPost})
        .catch(this.errorHandler);  
      }

      getGaNetworkDetatls(networkName):Observable<any>{
        let Params = new HttpParams();
        Params=Params.append('networkName', networkName );
        return this.http.get<any>(this.baseUrl + this.getGaNetworkDetatlsUrl,
                                    {headers : this.headersPost,params : Params})
                                    .catch(this.errorHandler);
       }
  
       saveGaChannelMapping(channelJson){
        return this.http.post<any>(this.baseUrl + this.saveGaChannelMappingUrl,channelJson,
          {headers : this.headersPost})
          .catch(this.errorHandler);  
        }
}
