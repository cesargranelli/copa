import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../models/register';
import { Registered } from '../models/registered';
import { User } from '../models/user';
import { BaseProvider } from './base.service';
import { StorageProvider } from './storage.service';

@Injectable()
export class AuthProvider extends BaseProvider {

  constructor(private http: HttpClient) {
    super();
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
