import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bet } from '../models/bet';
import { BaseProvider } from './base.service';

@Injectable()
export class BetProvider extends BaseProvider {

  constructor(private http: HttpClient) {
    super();
  }

  findBets(matchId: string, matchDay: string): Observable<Bet[]> {
    return this.http.get<Bet[]>(`${this.api}/bets`, {
      headers: new HttpHeaders().append('matchId', matchId).append('matchDay', matchDay)
    });
  }

  palpites(aposta: Bet) {

    return null;//this.db.collection("hunches").doc(aposta.slug).collection(String(aposta.round)).doc(String(aposta.id))
        // .valueChanges();

  }

}
