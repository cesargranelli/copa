import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Round } from '../models/round';

@Injectable()
export class RoundProvider {

  private api = "/api";

  constructor(
    private http: HttpClient,
    private platform: Platform
  ) {
    if (this.platform.is("cordova")) {
      this.api = 'http://localhost:5000';
    }
  }

  rounds(): Observable<Round[]> {
    return this.http.get<Round[]>(`${this.api}/rounds`);
  }

  getRodada(roundId: string): Observable<Round> {
    return this.http.get<Round>(`${this.api}/rounds/${roundId}`);
  }

}
