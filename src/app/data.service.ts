import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverAddress:string = "http://localhost:3000/";
  private signedIn = false;

  constructor(private http: HttpClient) { }

  isSignedIn():boolean{
    return this.signedIn;
  }

  /**
   * Attempts to login the user by sending the user info to the Adept server
   * @param username user username
   * @param password user password
   */
  async login(username:string, password:string):Promise<boolean>{
    this.signedIn = false;

    await this.http.post(this.serverAddress + "user/login/",{
      username: username,
      password: password
    }).subscribe((res:{message:string,signedIn:boolean}) => {
      console.log(res)
      this.signedIn = res.signedIn;
    });

    return this.signedIn;
  }

  logout(){
    //this.isSignedIn = false;
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
      }).catch(err => {
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
      }).catch(err => {
        console.log(err);
      });

    return isAvailable;
  }
}
