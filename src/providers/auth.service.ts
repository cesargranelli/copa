import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {

  constructor(
    public angularFireAuth: AngularFireAuth,
    public http: HttpClient
  ) {}

  createAuthUser(user: {email: string, password: string}): Promise<any> {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

}
