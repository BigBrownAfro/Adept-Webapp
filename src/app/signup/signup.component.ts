import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { time } from 'console';

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

  emailIsValid:boolean = false;
  usernameIsValid:boolean = false;
  passwordIsValid:boolean = false;
  verifyPasswordIsValid:boolean = true;
  
  emailIsAvailable:boolean = false;
  usernameIsAvailable:boolean = false;

  emailIsEmpty:boolean = true;
  usernameIsEmpty:boolean = true;
  passwordIsEmpty:boolean = true;
  verifyPasswordIsEmpty:boolean = true;

  connectionMade:boolean = true;

  constructor(private dataService:DataService, private router:Router) { }

  ngOnInit(): void {
    this.checkConnectionToServer();
  }

  /**
   * Tests the connection to the server and adjusts the connectionMade boolean accordingly
   */
  async checkConnectionToServer(){
    this.connectionMade = true;
    const t = await this.dataService.checkServerConnection();
    console.log("connection made: " + t);
    this.connectionMade = t;
  }

  /**
   * Sets the email to be used on signup
   * Normalizes it to all lowercase
   * @param email email of user
   */
  setEmail(email:string){
    this.email = email.toLowerCase();
    this.checkEmailAvailability();
  }

  /**
   * Validates the email for correctness using regular expressions
   */
  validateEmail():boolean{
    if(this.email.match("^(\\w|\\.)+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$")){
      this.emailIsValid = true;
    } else {
      this.emailIsValid = false;
    }
    return this.emailIsValid;
  }

  /**
   * Checks to see if the saved email is unused and available in the database
   * Alters the saved boolean for email availability
   */
  async checkEmailAvailability(){
    if(this.email.length === 0){
      return
    }
    var av = await this.dataService.checkEmailAvailability(this.email);
    this.emailIsAvailable = av;
  }

  /**
   * Sets the username to be used on signup
   * @param username username of user
   */
  setUsername(username:string){
    this.username = username;
    this.checkUsernameAvailability();
  }

  /**
   * Validates the username for correctness using regular expressions
   */
  validateUsername():boolean{
    if (this.username.match("^([a-zA-Z0-9_]{4,15})$")){
      this.usernameIsValid = true;
    } else {
      this.usernameIsValid = false;
    }
    return this.usernameIsValid;
  }

  /**
   * Checks to see if the saved username is unused and available in the database
   * Alters the saved boolean for username availability
   */
  async checkUsernameAvailability(){
    if(this.username.length === 0){
      return
    }
    
    var av = await this.dataService.checkUsernameAvailability(this.username);
    this.usernameIsAvailable = av;
  }

  /**
   * Sets the password to be used on signup
   * @param rawPass password of user
   */
  setPassword(rawPass:string){
    this.password = rawPass;
  }

  /**
   * Validates the password for correctness using regular expressions
   * (Between 8 and 32 characters, at least: one lowercase, one capital, one number)
   */
  validatePassword():boolean{
    if (this.password.match("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$")){
      this.passwordIsValid = true;
    } else {
      this.passwordIsValid = false;
    }
    return this.passwordIsValid;
  }

  /**
   * Sets the password copy
   * @param rawPass password of user
   */
  setVerifyPassword(rawPass:string){
    this.verifyPassword = rawPass;
  }

  /**
   * Checks to see if the verify password matches the first password
   */
  validateVerifyPassword():boolean{
    if (this.verifyPassword === this.password){
      this.verifyPasswordIsValid = true;
    } else {
      this.verifyPasswordIsValid = false;
    }
    return this.verifyPasswordIsValid;
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
   * Calls on keyboard events
   *  Signs in on "enter"
   *  Validates all fields on any input
   * @param event any keyboard event
   */
  onKeyUp(event:KeyboardEvent){
    if(event.key === "Enter"){
      this.signup();
    }
    this.validateAll();
    this.checkEmptyFields();
  }

  /**
   * Attempts a signup using given fields after checking validity
   */
  async signup(){
    const canSignup = await this.checkCanSignup();
    const serverConnected = await this.dataService.checkServerConnection();
    if (canSignup && serverConnected){
      console.log("Sent signup information");
      const result = this.dataService.signup(this.email, this.username, this.firstName, this.lastName, this.favoriteColor, this.password)
    }
  }

  /**
   * Checks whether or not the information given in the fields should be sent for signup or not
   */
  async checkCanSignup():Promise<boolean>{
    //Validate all fields and check availability
    if (this.validateAll()){
      await this.checkAvailability();

      //check results of the availability check, fail if unavailable
      if (!this.emailIsAvailable || !this.usernameIsAvailable){
        return false;
      }

      //At this point nothing timed out, input was valid, and everything is available.
      return true;
    }

    //If you're here then one or more fields are invalid
    return false;
  }

  /**
   * Validates all fields for correctness
   */
  validateAll():boolean{
    var isValid = true;

    this.validateEmail();
    this.validateUsername();
    this.validatePassword();
    this.validateVerifyPassword();
    if(!this.emailIsValid || !this.usernameIsValid || !this.passwordIsValid || !this.verifyPasswordIsValid){
      isValid = false;
    }
    return isValid
  }

  /**
   * Checks the availability of the username and email provided
   */
  async checkAvailability(){
    await this.checkEmailAvailability();
    await this.checkUsernameAvailability();
  }

  /**
   * Checks required fields to see if they're empty
   */
  checkEmptyFields(){
    if(this.email.length === 0){
      this.emailIsEmpty = true;
    } else {
      this.emailIsEmpty = false;
    }

    if(this.username.length === 0){
      this.usernameIsEmpty = true;
    } else {
      this.usernameIsEmpty = false;
    }

    if(this.password.length === 0){
      this.passwordIsEmpty = true;
    } else {
      this.passwordIsEmpty = false;
    }

    if(this.verifyPassword.length === 0){
      this.verifyPasswordIsEmpty = true;
    } else {
      this.verifyPasswordIsEmpty = false;
    }
  }
}
