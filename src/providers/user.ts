import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { AuthProvider } from './auth';
import { BaseProvider } from './base';

@Injectable()
export class UserProvider extends BaseProvider {

  private usuarioLogado: User;

  constructor(
    public db: AngularFirestore,
    public http: HttpClient,
    public authService: AuthProvider
  ) {
    super();
    db.firestore.settings({ timestampsInSnapshots: true });
  }

  create(user: User): Promise<any> {
    console.log(user);
    return this.db.collection("users").doc(user.uid).set(user);
  }

  userExists(slug: string): Observable<boolean> {
    return this.db.collection('/users', ref =>
      ref.where('slug', '==', slug)
    ).valueChanges().map((users: User[]) => {
      return users.length > 0;
    }).catch(this.handleObservableError);
  }

  obtemUserLogado() {
    // return this.usuarioLogado = localStorage.getItem(localStorage.key(0));
  }

  infoUsuario(uid: string): Observable<User> {
    return this.db.collection("users").doc<User>(uid).valueChanges();
  }

}
