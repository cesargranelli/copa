import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

import { BaseService } from './base.service';

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

}
