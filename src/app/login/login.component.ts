import { Component, OnInit } from '@angular/core';
import { DataService } from  '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private username;
  private password;

  constructor(private dataService:DataService) {
    console.log("I LIVE!");
    
  }

  ngOnInit(): void {
  }

  setUsername(username:String){
    this.username = username;
  }

  setPassword(password:String){
    this.password = password;
  }

  onKeyUp(event:KeyboardEvent){
    if(event.key === "Enter"){
      this.login();
    }
  }

  login(){
    console.log("Username: " + this.username);
    console.log("Password: " + this.password);
    
    //this.dataService.testApi();
  }

}
