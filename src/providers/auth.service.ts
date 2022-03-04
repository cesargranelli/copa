import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Register } from '../models/register';
import { Registered } from '../models/registered';
import { BaseProvider } from './base';
import { StorageProvider } from './storage';

@Injectable()
export class AuthProvider extends BaseProvider {

  private api = "/api";

  constructor(
    public angularFireAuth: AngularFireAuth,
    private http: HttpClient,
    private platform: Platform
  ) {
    super();
    if (this.platform.is("cordova")) {
      this.api = 'http://localhost:5000';
    }
  }

  signup(register: Register): Observable<Registered> {
    return this.http.post<Registered>(`${this.api}/auth/register`, register);
  }

  signin(userLogin: { email: string, password: string }): Promise<any> {
    return this.angularFireAuth.auth.signInAndRetrieveDataWithEmailAndPassword(userLogin.email, userLogin.password);
  }

  signout(): Promise<void> {
    return StorageProvider.clear();
  }

}
