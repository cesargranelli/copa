import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { Platform } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { Partida } from '../../models/partida';

@Injectable()
export class ResultadoProvider {

  partida: Partida[];

  jogos$: Observable<Partida[]>;

  roundMatches$: Observable<any>;

  basepath = "/api"; // Para teste em desenvolvimento

  constructor(
    public http: HttpClient,
    public db: AngularFirestore,
    public platform: Platform
  ) {
    if (this.platform.is("cordova")) {
      this.basepath = "https://www.sofascore.com";
    }
  }

  resultados(round?: string): Observable<any> {

    let id: string;

    (round == "Rodada 1") ? id = "1" : null;
    (round == "Rodada 2") ? id = "2" : null;
    (round == "Rodada 3") ? id = "3" : null;
    (round == "Oitavas 1/8") ? id = "4" : null;
    (round == "Quartas 1/4") ? id = "5" : null;
    (round == "Semifinais") ? id = "6" : null;
    (round == "Final") ? id = "7" : null;

    this.db.collection("resultados").doc(id).collection(id).valueChanges()
      .subscribe(partidas => {
        if (!partidas.length) {
          this.adicionarPartidas(id);
        }
      });

      return this.partidas(id);

  }

  adicionarPartidas(idRound) {

    this.roundMatches$ = this.http.get(`${this.basepath}/u-tournament/16/season/15586/matches/round/${idRound}`);
    //this.roundMatches$ = this.http.get(`api_round.php?id=${idRound}`);
    this.roundMatches$.subscribe(matches => {
      for (let tournament in matches.roundMatches.tournaments) {
        for (let event in matches.roundMatches.tournaments[tournament].events) {
          let match = matches.roundMatches.tournaments[tournament].events[event];
          this.db
            .collection("resultados")
            .doc(String(match.roundInfo.round))
            .collection(String(match.roundInfo.round))
            .doc(String(match.id))
            .set({
              awayLogo: `https://www.sofascore.com/images/team-logo/football_${match.awayTeam.id}.png`,
              awayScore: (match.awayScore.current == undefined) ? null : match.awayScore.current,
              awaySlug: match.awayTeam.slug,
              awayTeam: match.awayTeam.name,
              homeLogo: `https://www.sofascore.com/images/team-logo/football_${match.homeTeam.id}.png`,
              homeScore: (match.homeScore.current == undefined) ? null : match.homeScore.current,
              homeSlug: match.homeTeam.slug,
              homeTeam: match.homeTeam.name,
              formatedStartDate: match.formatedStartDate,
              id: match.id,
              round: match.roundInfo.round,
              startTime: match.startTime,
              startTimestamp: match.startTimestamp
            })
            .then(function() {
              console.log("Partidas adicionadas com sucesso!");
            })
            .catch(function(error) {
              console.error("Falha ao adicionar partidas: ", error);
            });
        }
      }
    });

  }

  partidas(idRound): Observable<any> {

    return this.db
             .collection("resultados")
             .doc(idRound)
             .collection(idRound, ref => ref.orderBy("startTime"))
             .valueChanges();

  }

}