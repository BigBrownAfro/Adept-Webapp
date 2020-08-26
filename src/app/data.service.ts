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
    }).subscribe((data) => {
      console.log(data)
      //signedIn = data.signedIn;
    });
    
    //this.isSignedIn = true;
    return signedIn;
  }

  //signs the user out and wipes saved info
  logout(){
    //this.isSignedIn = false;
  }

  /*testApi(){
    console.log("Attempting to get from server...");
    this.http.get(this.serverAddress + "products/").subscribe((data) => console.log(data));
    console.log("Attempting to Post to server...");
    this.http.post(this.serverAddress + "products/",{
      name: "Product name 3",
      price: 23.99
    }).subscribe((data) => console.log(data));
  }*/
}
