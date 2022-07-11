import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import { Guess } from '../models/guess';

@Injectable()
export class GuessProvider {

  private api = "/api";

  constructor(
    private http: HttpClient,
    private platform: Platform
  ) {
    if (this.platform.is("cordova")) {
      this.api = 'https://api-futecopa.herokuapp.com';
    }
  }

  guesses(slug: string, matchDay: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.api}/guesses`, {
      headers: new HttpHeaders().append('slug', slug).append('matchDay', matchDay)
    });
  }

  saveOrUpdate(guess: Guess): Observable<Game[]> {
    return this.http.post<Game[]>(`${this.api}/guesses`, guess);
  }

}
