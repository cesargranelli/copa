import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Ranking } from "../models/ranking";
import { BaseProvider } from "./base.service";

@Injectable()
export class RankingProvider extends BaseProvider {
  total: number = 0;

  constructor(private http: HttpClient) {
    super();
  }

  ranking(): Observable<Ranking[]> {
    return this.http.get<Ranking[]>(`${this.api}/ranking`);
  }
  
}
