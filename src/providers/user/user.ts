import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { User } from './../../models/user.model';

import { BaseProvider } from './../base/base';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserProvider extends BaseProvider {

  constructor(
    public db: AngularFirestore,
    public http: HttpClient
  ) {
    super();
    db.firestore.settings({ timestampsInSnapshots: true });
  }

  create(user: User): Promise<any> {
    return this.db.collection("users").doc(user.uid).set(user);
  }

  userExists(slug: string): Observable<boolean> {
    return this.db.collection('/users', ref =>
      ref.where('slug', '==', slug)
    ).valueChanges().map((users: User[]) => {
      return users.length > 0;
    }).catch(this.handleObservableError);
  }

}
