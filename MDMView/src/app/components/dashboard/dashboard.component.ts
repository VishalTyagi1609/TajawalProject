import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 	
  name = 'anony';

  constructor(private router:Router,private user: UserService) { }

  ngOnInit() {
  	this.name = this.user.username;
  	console.log('user token = ', localStorage.getItem('token'))
    console.log('base Url = ', localStorage.getItem('baseUrl'))
  }

  logoutUser(){
    console.log('logout called')
    localStorage.setItem('loginStatus','false');
    localStorage.setItem('token','')
    this.router.navigate([''])
  }
}
