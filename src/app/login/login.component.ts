import { Component, OnInit } from '@angular/core';
import { DataService } from  '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private username:string;
  private password:string;

  constructor(private dataService:DataService) {
    console.log("I LIVE!");
    
  }

  ngOnInit(): void {
  }

  /**
   * Sets the username to be used on sign-in
   * @param username username of user
   */
  setUsername(username:string){
    this.username = username;
  }

  /**
   * Sets the password to be used on sign-in
   * @param rawPass password of user
   */
  setPassword(rawPass:string){
    this.password = rawPass;
    //console.log("raw pass: " + password);
    //console.log("hashed pass: " + encrypt.hash(password));
  }

  /**
   * Checks keyboard events and signs in on "enter"
   * @param event any keyboard event
   */
  onKeyUp(event:KeyboardEvent){
    if(event.key === "Enter"){
      this.login();
    }
  }

  /**
   * Attempts a login of the given user details
   */
  login(){
    this.dataService.login(this.username, this.password);
  }
}
