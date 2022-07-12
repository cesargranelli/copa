import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Round } from '../models/round';
import { BaseProvider } from './base';

@Injectable()
export class RoundProvider extends BaseProvider {

  constructor(private http: HttpClient) {
    super();
  }

  rounds(): Observable<Round[]> {
    return this.http.get<Round[]>(`${this.api}/rounds`);
  }

  getRodada(roundId: string): Observable<Round> {
    return this.http.get<Round>(`${this.api}/rounds/${roundId}`);
  }

}
