import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../models/match';
import { BaseProvider } from './base.service';

@Injectable()
export class MatchProvider extends BaseProvider {

  constructor(private http: HttpClient) {
    super();
  }

  matches(matchDay: string): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.api}/matches`, {
      headers: new HttpHeaders().append('matchDay', matchDay)
    });
  }

}
