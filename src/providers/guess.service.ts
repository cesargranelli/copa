import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import { Guess } from '../models/guess';
import { BaseProvider } from './base.service';

@Injectable()
export class GuessProvider extends BaseProvider {

  constructor(private http: HttpClient) {
    super();
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
