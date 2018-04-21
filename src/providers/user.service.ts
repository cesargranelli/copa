import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { User } from './../models/user.model';

import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService extends BaseService {

  constructor(
    public db: AngularFireDatabase,
    public http: HttpClient
  ) {
    super();
  }

  create(user: User): Promise<any> {
    return this.db.object(`/users/${user.uid}`).set(user);
  }

  userExists(username: string): Observable<boolean> {
    return this.db.list('/users', ref =>
      ref.orderByChild('username').equalTo(username)
    ).valueChanges().map((users: User[]) => {
      return users.length > 0;
    }).catch(this.handleObservableError);
  }

}
