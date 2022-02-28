import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/first';
import { Register } from '../models/register';
import { Registered } from '../models/registered';
import { BaseProvider } from './base';



@Injectable()
export class AuthProvider extends BaseProvider {

  private basepath = "/api";

  constructor(
    public angularFireAuth: AngularFireAuth,
    private http: HttpClient,
    private platform: Platform
  ) {
    super();
    if (this.platform.is("cordova")) {
      this.basepath = 'http://localhost:5000';
    }
  }

  signup(register: Register): Observable<Registered> {
    return this.http.post<Registered>(`${this.basepath}/auth/register`, register);
  }

  signin(userLogin: { email: string, password: string }): Promise<any> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(userLogin.email, userLogin.password);
  }

  signout(): Promise<void> {
    return this.angularFireAuth.auth.signOut();
  }

  get authenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.authState
        .first()
        .subscribe(isAuthenticated => {
          (isAuthenticated) ? resolve(true) : reject(false);
        });
    });
  }

  get userUid(): any {
    return localStorage.getItem(localStorage.key(0));
  }

}
