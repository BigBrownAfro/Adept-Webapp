import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private email:string = "";
  private username:string = "";
  private firstName:string = "";
  private lastName:string = "";
  private favoriteColor:string = "";
  private password:string = "";
  private verifyPassword:string = "";

  emailIsValid:boolean = true;
  emailIsAvailable:boolean = true;
  usernameIsValid:boolean = true;
  usernameIsAvailable:boolean = true;
  passwordIsValid:boolean = true;
  verifyPasswordIsValid:boolean = true;

  canSignup:boolean = false;

  constructor(private dataService:DataService, private router:Router) { }

  ngOnInit(): void {
  }

  /**
   * Sets the email to be used on signup and validates it
   * @param email email of user
   */
  setEmail(email:string){
    this.email = email;

    if(this.email.match("^(\\w|\\.)+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$")){
      this.emailIsValid = true;
      this.checkEmailAvailability();
    } else {
      this.emailIsValid = false;
    }
  }

  async checkEmailAvailability(){
    var av = await this.dataService.checkEmailAvailability(this.email)
    this.emailIsAvailable = av;
  }

  /**
   * Sets the username to be used on signup and validates it
   * @param username username of user
   */
  setUsername(username:string){
    this.username = username;

    if (username.match("^([a-zA-Z0-9_]{4,15})$")){
      this.usernameIsValid = true;
      this.checkUsernameAvailability();
    } else {
      this.usernameIsValid = false;
    }
  }

  async checkUsernameAvailability(){
    var av = await this.dataService.checkUsernameAvailability(this.username);
    this.usernameIsAvailable = av;
  }

  /**
   * Sets the password to be used on signup and validates it
   * @param rawPass password of user
   */
  setPassword(rawPass:string){
    this.password = rawPass;

    if (this.password.match("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$")){
      this.passwordIsValid = true;
    } else {
      this.passwordIsValid = false;
    }
  }

  /**
   * Checks entered password against saved password for sameness
   * @param rawPass password of user
   */
  setVerifyPassword(rawPass:string){
    this.verifyPassword = rawPass;

    this.verifyPasswordIsValid = true;
    if (this.verifyPassword !== this.password){
      this.verifyPasswordIsValid = false
    }
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
    if (this.checkCanSignup()){
      //signup
    }
  }

  checkCanSignup():boolean{
    if (this.allFieldsAreValid() && this.noFieldsAreEmpty()){
      this.canSignup = true;
      return true;
    } else {
      this.canSignup = false;
      return false;
    }
  }

  allFieldsAreValid():boolean{
    if (this.emailIsValid && this.emailIsAvailable && this.usernameIsValid && this.usernameIsAvailable && this.passwordIsValid && this.verifyPasswordIsValid){
      return true;
    } else {
      return false;
    }
  }

  noFieldsAreEmpty():boolean{
    var result = true;

    if(this.email.length === 0){
      result = false;
    }

    if(this.username.length === 0){
      result = false;
    }

    if(this.firstName.length === 0){
      result = false;
    }

    if(this.lastName.length === 0){
      result = false;
    }

    if(this.favoriteColor.length === 0){
      result = false;
    }

    if(this.password.length === 0){
      result = false;
    }

    if(this.verifyPassword.length === 0){
      result = false;
    }

    return result;
  }
}
