import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

import { User } from '../models/user.model';

import { BaseService } from './base.service';
import { FirebaseAuth } from '@firebase/auth-types';

import 'rxjs/add/operator/first';

@Injectable()
export class AuthService extends BaseService {

  constructor(
    public angularFireAuth: AngularFireAuth,
    public http: HttpClient
  ) {
    super();
  }

  createAuthUser(user: {email: string, password: string}): Promise<any> {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .catch(this.handlePromiseError);
  }

  signin(userLogin: { email: string, password: string }): Promise<any> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(userLogin.email, userLogin.password)
      .then((authUser: any) => {
        return authUser != null;
      }).catch(this.handlePromiseError);
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

}
