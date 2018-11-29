import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { User } from '../components/model/user.model';

@Injectable()
export class LoginService {

  //private serviceUrl : string = 'http://localhost:8090/TajawalAppMDM/v1/user/auth?id=alexa100&password=pass100';
  private serviceUrl : string = '/v1/user/auth';
  private baseUrl : string ='http://localhost:8080/TajawalAppMDM'
  private updateUserUrl : string = '/v1/user/updateUser'
  private getUserUrl :string='/v1/user/getUserList'
  private addNewUserUrl:string='/v1/user/addNewUser'
  private deleteUserUrl:string='/v1/user/deleteUser'
  private getUserDetailsUrl='/v1/user/getUserDetails'
  private editUserPasswordUrl='/v1/user/updateUserPassword'
  private getUserPasswordUrl='/v1/getUserPassword'
    

  constructor(private http: HttpClient) { }

  authenticate(id :string,password : string):Observable<any>{
    let Params = new HttpParams();
    Params=Params.append('id',id );
    Params=Params.append('password',password)
    console.log('Login service'+id)
    return this.http.get<any>(localStorage.getItem('baseUrl')+this.serviceUrl,{params : Params})
  }
  private headersPost = new HttpHeaders(
    {
        'token' : 'aNBvnYmIWrNZtPxy3E1Jz8d3N2MUFQUXkI6jz8NECWc=',
        'Content-Type' : 'application/json'
      });
  
  
  
  
  
  updateUser(jsonStr) : Observable<any> {

    let Params = new HttpParams();
     

return this.http.put<any>(this.baseUrl + this.updateUserUrl ,jsonStr,
                            {headers : this.headersPost})
                            .catch(this.errorHandler);
      }
      
  getUserList(offset,limit):Observable<any>{
        let Params = new HttpParams();
        Params=Params.append('offset',offset);
        Params=Params.append('limit',limit );
  
        return this.http.get<any>(this.baseUrl+this.getUserUrl,{headers:this.headersPost,params:Params})
                                    .catch(this.errorHandler);
                 
       }
      

  addNewUser(jsonstr) : Observable<any>{
        //console.log(">>>>>>>>>>>>>")
        let Params = new HttpParams();
        console.log("AddNewUser Login Service called");
        console.log("JsonValue Login Service"+" "+jsonstr);
        
        
        return this.http.post<any>(this.baseUrl + this.addNewUserUrl,jsonstr,
                                    {headers : this.headersPost, params : Params})
                                    .catch(this.errorHandler);
    
      }
  deleteUser(user_id):Observable<any>{
    let Params=new HttpParams();
    Params=Params.append("user_id",user_id);
    console.log("Delete User Service is called"+user_id);
    return this.http.delete<any>(this.baseUrl + this.deleteUserUrl,{headers:this.headersPost,params:Params})
                                  .catch(this.errorHandler);
  }
  
  
  getUserDetails(user_id):Observable<any>{
    let Params = new HttpParams();
    Params=Params.append("user_id",user_id);
    console.log("getUserDeatils Successfully called on the user_id"+" "+user_id);
    return this.http.get<any>(this.baseUrl + this.getUserDetailsUrl,{headers:this.headersPost,params:Params})
                                  .catch(this.errorHandler);


  }
  editUserPassword(user_id,oldpassword,newpassword):Observable<any>{
    let Params = new HttpParams();
    Params=Params.append("user_id",user_id);
    Params=Params.append("oldpassword",oldpassword);
    Params=Params.append("newpassword",newpassword);

    console.log("Testing New Password"+" "+newpassword);
    console.log("editUserPassword of Login Service called")

    return this.http.put<any>(this.baseUrl + this.editUserPasswordUrl,'{}',{headers:this.headersPost,params:Params})
                                  .catch(this.errorHandler);

  }
  getUserPassword(user_id){
    let Params = new HttpParams();
    Params =Params.append("user_id",user_id);
    console.log("The given User_id's Password is being Fetch...."+" "+user_id);
    return this.http.get<any>(this.baseUrl+this.getUserPasswordUrl,{headers:this.headersPost,params:Params})
    .catch(this.errorHandler)
  }

  
  
           
errorHandler(error : HttpErrorResponse){
        return Observable.throw(error.message || 'Server Error')
      }  
}   
