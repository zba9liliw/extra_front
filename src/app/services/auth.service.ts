import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'
import {Http, Headers} from '@angular/http' ;

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  client: any;
  user: any;
  baseUrl = environment.baseUrl;

  constructor(private http : Http) { }


  authenticateClient(user) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.baseUrl + '/client/auth', user, {headers: headers})
    .pipe(map(res => res.json()));
    
  }

  authenticateUser(user) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.baseUrl + '/user/auth', user, {headers: headers})
    .pipe(map(res => res.json()));
  }
  storeUserData(token, user) {
    localStorage.setItem('id_token' , token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user ;
  }

  loggedIn() {
    return !helper.isTokenExpired(localStorage.getItem('id_token'));
  }
  getUserType()
  {
    const user = localStorage.getItem('user');
    var tata=JSON.parse(user).type;
    console.log("user or client"+tata,tata)
    return tata;
  }
  logout() {
    this.user = null ;
    localStorage.clear();
  }

  getUserData() {
    const info = JSON.parse(localStorage.getItem('user')) ;
    return info ;
   }
 
   public getToken(): string {
     return localStorage.getItem('id_token');
   }
 
   getIdfromToken(): string{
     const jwtData = this.getToken().split('.')[1]
     const decodedJwtJsonData = window.atob(jwtData)
     const decodedJwtData = JSON.parse(decodedJwtJsonData)
     console.log('id: ' + decodedJwtData._id);
     return decodedJwtData._id;
 }
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}