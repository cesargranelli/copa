import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable()
export class StorageProvider {

  constructor() { }

  static set(user: User) {
    localStorage.clear();
    localStorage.setItem(user.slug, JSON.stringify({ uid: user.uid, slug: user.slug }));
  }

  static get(): User {
    return JSON.parse(localStorage.getItem(localStorage.key(0)));
  }

  static clear() {
    localStorage.clear();
  }

}
