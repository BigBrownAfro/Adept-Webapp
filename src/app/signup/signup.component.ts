import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private email:string;
  private username:string;
  private firstName:string;
  private lastName:string;
  private favoriteColor:string;
  private password:string;
  private verifyPassword:string;

  emailIsValid:boolean = false;
  emailIsAvailable:boolean;
  usernameIsValid:boolean;
  usernameIsAvailable:boolean;
  passwordIsValid:boolean;

  constructor(private dataService:DataService, private router:Router) { }

  ngOnInit(): void {
  }

  /**
   * Sets the email to be used on signup
   * @param email email of user
   */
  setEmail(email:string){
    this.email = email;
  }

  /**
   * Sets the username to be used on signup
   * @param username username of user
   */
  setUsername(username:string){
    this.username = username;
  }

  /**
   * Sets the password to be used on signup
   * @param rawPass password of user
   */
  setPassword(rawPass:string){
    this.password = rawPass;
  }

  /**
   * Checks entered password against saved password for sameness
   * @param rawPass password of user
   */
  setVerifyPassword(rawPass:string){
    this.verifyPassword = rawPass;
  }

  /**
   * Sets the first name to be used on signup
   * @param name first name of user
   */
  setFirstName(name:string){
    this.firstName = name;
  }

  /**
   * Sets the last name to be used on signup
   * @param name last name of user
   */
  setLastName(name:string){
    this.lastName = name;
  }

  /**
   * Sets the favorite color to be used on signup
   * @param color favorite color of user
   */
  setFavoriteColor(color:string){
    this.favoriteColor = color;
  }

  /**
   * Checks keyboard events and signs in on "enter"
   * @param event any keyboard event
   */
  onKeyUp(event:KeyboardEvent){
    if(event.key === "Enter"){
      this.signup();
    }
  }

  /**
   * Attempts a login of the given user details
   */
  signup(){
    //this.dataService.login(this.username, this.password);
  }
}
