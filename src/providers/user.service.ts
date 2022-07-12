import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from '../models/user';
import { BaseProvider } from './base';

@Injectable()
export class UserProvider extends BaseProvider {

  constructor(private http: HttpClient) {
    super();
  }

  findByUid(uid: string): Observable<User> {
    return this.http.get<User>(`${this.api}/users/uid`, { headers: new HttpHeaders().set('uid', uid) });
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(`${this.api}/users`, { user });
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

}
