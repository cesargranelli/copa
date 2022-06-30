import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Register } from '../models/register';
import { Registered } from '../models/registered';
import { User } from '../models/user';
import { BaseProvider } from './base';
import { StorageProvider } from './storage';

@Injectable()
export class AuthProvider extends BaseProvider {

  private api = "/api";

  constructor(
    private http: HttpClient,
    private platform: Platform
  ) {
    super();
    if (this.platform.is("cordova")) {
      this.api = 'http://localhost:5000';
    }
  }

  signup(register: Register): Observable<Registered> {
    return this.http.post<Registered>(`${this.api}/users/register`, register);
  }

  signin(login: { email: string, password: string }): Observable<any> {
    return this.http.post<User>(`${this.api}/users/login`, login);
  }

  signout() {
    StorageProvider.clear();
  }

}
