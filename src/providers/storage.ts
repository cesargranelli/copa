import { Injectable } from '@angular/core';
import { Registered } from '../models/registered';

@Injectable()
export class StorageProvider {

  constructor() { }

  static set(registered: Registered) {
    localStorage.clear();
    localStorage.setItem(registered.slug, JSON.stringify({ uid: registered.uid, slug: registered.slug }));
  }

  static get(): Registered {
    return JSON.parse(localStorage.getItem(localStorage.key(0)));
  }

  static clear(): Promise<void> {
    return new Promise(() => localStorage.clear());
  }

}
