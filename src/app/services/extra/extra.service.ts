import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ExtraService {
  authToken: any;
  baseUrl = environment.baseUrl;
  constructor(private http: Http) {}

  registerUser(user) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.baseUrl + '/user/register', user, {headers: headers})
    .pipe(map(res => res.json()));
  }
  getUsers() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/user', {headers: headers})
    .pipe(map(res => res.json()));
  }

  getUserById(id: string) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/user/' + id, {headers: headers})
    .pipe(map(res => res.json()));
  }

  updateUser(id: string, data)  {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.put(this.baseUrl + '/user/' + id, data, {headers: headers})
  }
deleteUser(id: string) {
  const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
  return this.http.delete(this.baseUrl + '/user/' + id, {headers: headers}) ;
}

loadToken() {
  const token = localStorage.getItem('id_token');
  this.authToken = token;
}

  
}