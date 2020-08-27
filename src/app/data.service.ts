import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverAddress:string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  /**
   * Attempts to login the user by sending the user info to the Adept server
   * @param username user username
   * @param password user password
   */
  login(username:string, password:string):boolean{
    var signedIn = false;
    this.http.post(this.serverAddress + "user/login/",{
      username: username,
      password: password
    }).subscribe((res) => {
      console.log(res)
      //signedIn = res.signedIn;
    });
    
    //this.isSignedIn = true;
    return signedIn;
  }

  logout(){
    //this.isSignedIn = false;
  }

  /**
   * Checks to see if an email is available for use by a new account
   * @param email Email to be checked by server
   */
  async checkEmailAvailability(email:string):Promise<boolean>{
    var isAvailable = false;
    /*this.http.get(this.serverAddress + "user/verify/email/" + email)
      .subscribe((res: {message:string, boolean:boolean}) => {
        isAvailable = !res.boolean;
        return isAvailable;
      });*/
    var asyncResult = await this.http.get(this.serverAddress + "user/verify/email/" + email)
      .toPromise()
      /*.then((res: {message:string, boolean:boolean}) => {
        isAvailable = !res.boolean;
      });*/
    
    return isAvailable;
  }
}
