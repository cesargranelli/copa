import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
// import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import { User } from '../models/user';
import { AuthProvider } from './auth';
import { BaseProvider } from './base';

@Injectable()
export class UserProvider extends BaseProvider {

  private basepath = "/api";

  private usuarioLogado: User;

  constructor(
    // public db: AngularFirestore,
    private authService: AuthProvider,
    private http: HttpClient,
    private platform: Platform
  ) {
    super();
    // db.firestore.settings({ timestampsInSnapshots: true });
    if (this.platform.is("cordova")) {
      this.basepath = 'http://localhost:5000';
    }
  }

  create(user: User): Promise<any> {
    return null;//this.db.collection("users").doc(user.uid).set(user);
  }

  userExists(slug: string): Observable<boolean> {
    return null;/*this.db.collection('/users', ref =>
      ref.where('slug', '==', slug)
    ).valueChanges((users: User[]) => {
      return users.length > 0;
    }).pipe(() => null);/*.catch(this.handleObservableError);*/
  }

  obtemUserLogado() {
    // return this.usuarioLogado = localStorage.getItem(localStorage.key(0));
  }

  infoUsuario(uid: string): Observable<User> {
    let headers = new HttpHeaders().set('uid', uid);
    return this.http.get<User>(`${this.basepath}/users/uid`, { headers });
  }

}
