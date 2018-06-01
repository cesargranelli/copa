import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Platform } from 'ionic-angular';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable()
export class HunchProvider {

  private basepath = "/api";

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private db: AngularFirestore
  ) {
    if(this.platform.is("cordova")) {
      this.basepath = 'https://www.sofascore.com';
    }
  }

  roundMatches(rodada): Observable<any> {
    return this.http.get(`${this.basepath}/u-tournament/16/season/7528/matches/round/${rodada}`);
  }

}
