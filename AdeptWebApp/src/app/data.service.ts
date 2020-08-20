import { Injectable } from '@angular/core';
import {UserInfo} from './UserInfo';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private isSignedIn:boolean = false;

  private currentUser:UserInfo;

  constructor() { }

  //Attempts to log the user in given user login info by checking it against the user database
  login(user:UserInfo):boolean{
    //get list of usernames
    //find name in the list (if not found return false)
    //hash the entered password and compare to saved hash
    //this.isSignedIn = true;
    return false;
  }

  //signs the user out and wipes saved info
  logout(){
    this.isSignedIn = false;
    this.currentUser = null;
  }
}
