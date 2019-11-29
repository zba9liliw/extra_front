import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RecruiterService {

  baseUrl = environment.baseUrl;
  authToken: any;
  constructor(private http:Http) { }

  registerClient(user) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.baseUrl + '/client/register', user, {headers: headers})
    .pipe(map(res => res.json()));
  }
  getClients() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/client', {headers: headers})
    .pipe(map(res => res.json()));
  }
  getByIdClient(id: string) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/client/' + id, {headers: headers})
    .pipe(map(res => res.json()));
  }
  updateClient(id: string, data)  {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.put(this.baseUrl + '/client/' + id, data, {headers: headers})
  }
  deleteClient(id: string) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.delete(this.baseUrl + '/client/' + id, {headers: headers}) ;
  }
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}