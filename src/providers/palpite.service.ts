import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Palpite } from '../models/palpite';

@Injectable()
export class PalpiteProvider {

  private api = "/api";
  private sofascore = "/sofascore";

  constructor(
    private http: HttpClient,
    private platform: Platform
  ) {
    if (this.platform.is("cordova")) {
      this.api = 'http://localhost:5000';
      this.sofascore = 'https://www.sofascore.com';
    }
  }

  palpites(slug: string, round: string): Observable<Palpite[]> {
    return this.http.get<Palpite[]>(`${this.api}/hunches/slug/${slug}/round/${round}`);
  }

  roundMatches(rodada): Observable<any> {
    return this.http.get(`${this.sofascore}/u-tournament/16/season/7528/matches/round/${rodada}`);
  }

}
