import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Rodada } from '../models/rodada';

@Injectable()
export class RodadaProvider {

  private api = "/api";

  constructor(
    private http: HttpClient,
    private platform: Platform
  ) {
    if (this.platform.is("cordova")) {
      this.api = 'http://localhost:5000';
    }
  }

  get rodadas(): Observable<Rodada[]> {
    return this.http.get<Rodada[]>(`${this.api}/rounds`);
  }

  getRodada(roundId: string): Observable<Rodada> {
    return this.http.get<Rodada>(`${this.api}/rounds/${roundId}`);
  }

}
