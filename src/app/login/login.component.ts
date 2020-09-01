import { Component, OnInit } from '@angular/core';
import { DataService } from  '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private username:string;
  private password:string;

  usernameIsValid:boolean = true;
  passwordIsValid:boolean = true;

  loginFailed:boolean = false;

  constructor(private dataService:DataService, private router:Router) {
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

    if (this.username.length > 15){
      this.usernameIsValid = false;
    } else {
      this.usernameIsValid = true;
    }
  }

  /**
   * Sets the password to be used on sign-in
   * @param rawPass password of user
   */
  setPassword(rawPass:string){
    this.password = rawPass;

    if (this.password.length > 32){
      this.passwordIsValid = false;
    } else {
      this.passwordIsValid = true;
    }
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
  async login(){
    this.loginFailed = false;
    if (this.usernameIsValid && this.passwordIsValid){
      const success = await this.dataService.login(this.username, this.password);
      if (success){
        this.router.navigateByUrl("/home");
      } else {
        this.loginFailed = true;
      }
    }
  }

  /**
   * Attempts a login with guest credentials
   */
  guestLogin(){
    this.username = "Guest";
    this.password = "badPass1";
    this.usernameIsValid = true;
    this.passwordIsValid = true;
    this.login();
  }
}
