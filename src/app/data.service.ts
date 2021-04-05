import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { fn } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //private serverAddress:string = "http://localhost:3000/";
  private serverAddress:string = "https://adept-server.herokuapp.com/";

  constructor(private http: HttpClient) {
    
  }

  /**
   * Attempts to get from the server's user services
   * returns whether or not it succeeded
   */
  async checkServerConnection():Promise<boolean>{
    var connected = false;
    
    await this.http.get(this.serverAddress + "user/")
    .toPromise()
    .then((res:{message,databaseConnection}) => {
      console.log("Server response : " + res.message);
      connected = true;
    })
    .catch(err => {
      console.log(err);
    });
    
    return connected;
  }

  /**
   * Sends a request for signup to the server
   * @param em email
   * @param un username
   * @param fN first name
   * @param lN last name
   * @param fC favorite color
   * @param p password
   */
  async signup(em: string, un: string, fN: string, lN: string, fC: string, p:string):Promise<boolean>{
    var signupSuccessful:boolean = false;

    await this.http.post(this.serverAddress + "user/signup/", {
      email: em,
      username: un,
      firstName: fN,
      lastName: lN,
      favoriteColor: fC,
      password: p
    })
    .toPromise()
    .then((res: {message:string, boolean:boolean}) => {
      console.log(res);
      signupSuccessful = res.boolean;
    })
    .catch(err => {
      console.log(err);
    });

    return signupSuccessful;
  }

  /**
   * Attempts to login the user by sending the user info to the Adept server
   * @param username user username
   * @param password user password
   */
  async login(username:string, password:string):Promise<boolean>{
    var signedIn = false;

    await this.http.post(this.serverAddress + "user/login/",{
      username: username,
      password: password
    })
    .toPromise()
    .then((res:{message:string,signedIn:boolean}) => {
      console.log(res);
      signedIn = res.signedIn;
    })
    .catch(err => {
      console.log(err);
    });

    return signedIn;
  }

  /**
   * Checks to see if an email is associated with an account
   * @param email Email to be checked by server
   */
  async checkEmailAvailability(email:string):Promise<boolean>{
    var isAvailable = false;

    await this.http.get(this.serverAddress + "user/verify/email/" + email)
      .toPromise()
      .then((res: {message:string, boolean:boolean}) => {
        isAvailable = !res.boolean;
      })
      .catch(err => {
        console.log(err);
      });

    return isAvailable;
  }

  /**
   * Checks to see if a username is associated with an account
   * @param username Username to be checked by server
   */
  async checkUsernameAvailability(username:string):Promise<boolean>{
    var isAvailable = false;

    await this.http.get(this.serverAddress + "user/verify/username/" + username)
      .toPromise()
      .then((res: {message:string, boolean:boolean}) => {
        isAvailable = !res.boolean;
      })
      .catch(err => {
        console.log(err);
      });

    return isAvailable;
  }
}
