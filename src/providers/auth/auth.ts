import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { BaseProvider } from './../base/base';

import 'rxjs/add/operator/first';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Token } from '../../models/token';

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

  signup(user: { email: string, password: string }): Observable<Token> {
    return this.http.post<Token>(`${this.basepath}/auth/register`, user);
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
    return this.angularFireAuth.auth.currentUser.uid;
  }

}
