import { $9 } from 'codelyzer/angular/styles/chars';
import { LoginService } from './../../services/login-service.service';

import {PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

   username: String;
   role: String;
   public loginStstusFlag = false;

  constructor(private router:Router, private loginService: LoginService,private platformLocation: PlatformLocation) { }

  ngOnInit() {
    // console.log('hit');
    // localStorage.setItem('baseUrl','http://52.39.168.246:8080/TajawalAppMDM/');
    // localStorage.setItem('baseUrl','https://tajawalmdmapp.herokuapp.com/');
    //localStorage.setItem('baseUrl','https://tajawalmdmappuat.herokuapp.com/');
    
    localStorage.setItem('baseUrl','http://localhost:8080/TajawalAppMDM/');
    //AWS server
    //localStorage.setItem('baseUrl','https://mdm.tajawal.com:8443/TajawalAppMDM/');

    localStorage.setItem('uploadButtonStatus','false')
  }

  loginUser(e) {
  	e.preventDefault();
  	//console.log(e);
  	var userId = e.target.elements[0].value;
    var password = e.target.elements[1].value;
    
    
    //console.log(userId+'>>'+password)
    
    this.loginService.authenticate(userId,password).subscribe(data => {
      //console.log(data+'>>>>'+data.data.user_name+'>>token>>'+data.data.token+'>>status>>'+data.status)
        if(data.status == 'success'){
          //console.log("login success")
          localStorage.setItem('token',data.data.token);
          localStorage.setItem('user_id',data.data.user_id);
          localStorage.setItem('loginStatus','true');
          this.loginStstusFlag=false;
          this.router.navigate(['/admin/hotel']);                   
        }
        else{
          //console.log('login failed')
          this.router.navigate(['']);
          this.loginStstusFlag = true;
          e.target.elements[0].value='';
          e.target.elements[1].value='';
        }
    });
   
    	//if(this.username == 'admin' && password == 'admin') {
     // this.user.setUserLoggedIn();
  	 //	this.router.navigate(['dashboard']);
  //	}
  }


  
}
