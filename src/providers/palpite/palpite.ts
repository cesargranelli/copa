import { Injectable } from '@angular/core';

import { Platform } from 'ionic-angular';

import { AngularFirestore } from 'angularfire2/firestore';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Palpite } from '../../models/palpite';

@Injectable()
export class PalpiteProvider {

  private _basepath = "/api";

  public _palpites$: Observable<any>;

  constructor(
    private _http: HttpClient,
    private _platform: Platform,
    private _afs: AngularFirestore
  ) {
    if(this._platform.is("cordova")) {
      this._basepath = 'https://www.sofascore.com';
    }
  }

  adicionaPalpites(codRodada: string, slugUsuario: string) {

    this._palpites$ = this._http.get(`${this._basepath}/u-tournament/16/season/15586/matches/round/${codRodada}`);
    //this._palpites$ = this.http.get(`api_round.php?id=${idRound}`);

    this._palpites$.subscribe(matches => {
      for (let tournament in matches.roundMatches.tournaments) {
        for (let event in matches.roundMatches.tournaments[tournament].events) {
          let match = matches.roundMatches.tournaments[tournament].events[event];
          this._afs
            .collection("palpites").doc("palpite")
            .collection(slugUsuario).doc(String(match.id))
            .set({
              codConfronto: match.id,
              codRodada: match.roundInfo.round,
              timestamp: match.startTimestamp,
              data: match.formatedStartDate,
              hora: match.startTime,
              timeMandante: match.homeTeam.name,
              slugMandante: match.homeTeam.slug,
              logoMandante: `https://www.sofascore.com/images/team-logo/football_${match.homeTeam.id}.png`,
              //palpiteMandante: null,
              timeVisitante: match.awayTeam.name,
              slugVisitante: match.awayTeam.slug,
              logoVisitante: `https://www.sofascore.com/images/team-logo/football_${match.awayTeam.id}.png`,
              dataFechamento: new Date(match.formatedStartDate.substr(6, 4) + '-' + match.formatedStartDate.substr(3, 2) + '-' + match.formatedStartDate.substr(0, 2)).setSeconds(-10800).toString()
              //palpiteVisitante: null,
              //scoreMandante: null,
              //scoreVisitante: null,
              //pontos: null
            })
            .then(function() {
              console.log("Palpites gravados com sucesso!");
            })
            .catch(function(error) {
              console.error("Erro ao tentar gravar palpites: ", error);
          });
        }
      }
    });

  }

  atualizaPalpites(palpite: Palpite) {

    this._afs.collection("palpites").doc("palpite")
             .collection(palpite.slugUsuario).doc(String(palpite.codConfronto))
             .update({
               palpiteMandante: palpite.palpiteMandante,
               palpiteVisitante: palpite.palpiteVisitante,
               update: String(new Date().getTime()),
               saved: true
              }).catch(error => console.log(error));

  }

  buscaPalpites(codRodada: string, slugUsuario: string): Observable<any> {

    return this._afs.collection("palpites").doc("palpite")
                    .collection(slugUsuario, ref =>
                      ref.where("codRodada", "==", codRodada).orderBy("timestamp")
                    )
                    .valueChanges();
  }

}
