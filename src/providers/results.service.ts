import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { AngularFirestore } from 'angularfire2/firestore';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
// import 'rxjs/operator/first';
import { Partida } from '../models/partida';


//import { Aposta } from '../../models/aposta';
//import { User } from '../../models/user';

@Injectable()
export class ResultsProvider {

  partida: Partida[];

  jogos$: Observable<Partida[]>;

  roundMatches$: Observable<any>;

  basepath = "/api"; // Para teste em desenvolvimento

  constructor(
    public http: HttpClient,
    // public db: AngularFirestore,
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

    // this.db.collection("resultados").doc(id).collection(id).valueChanges()
    //   .first()
    //   .subscribe((partidas: Partida[]) => {
    //     if (partidas.length == 0) {
    //       this.adicionarPartidas(id);
    //     } else {
    //       this.atualizarPartidas(id, partidas);
    //     }
    //   });

      return this.partidas(id);

  }

  adicionarPartidas(id) {

    let idRound;

    (id == "1") ? idRound = "1" : null;
    (id == "2") ? idRound = "2" : null;
    (id == "3") ? idRound = "3" : null;
    (id == "4") ? idRound = "4/1/8" : null;
    (id == "5") ? idRound = "3/Quarterfinals" : null;
    (id == "6") ? idRound = "2/Semifinals" : null;
    (id == "7") ? idRound = "1/Final" : null;

    this.roundMatches$ = this.http.get(`${this.basepath}/u-tournament/16/season/15586/matches/round/${idRound}`);
    //this.roundMatches$ = this.http.get(`api_round.php?id=${idRound}`);
    this.roundMatches$.subscribe(matches => {
      for (let tournament in matches.roundMatches.tournaments) {
        for (let event in matches.roundMatches.tournaments[tournament].events) {
          let match = matches.roundMatches.tournaments[tournament].events[event];
          // this.db
          //   .collection("resultados")
          //   .doc(id)
          //   .collection(id)
          //   .doc(String(match.id))
          //   .set({
          //     awayLogo: `https://www.sofascore.com/images/team-logo/football_${match.awayTeam.id}.png`,
          //     awayScore: (match.awayScore.current == undefined) ? null : match.awayScore.current,
          //     awaySlug: match.awayTeam.slug,
          //     awayTeam: match.awayTeam.name,
          //     homeLogo: `https://www.sofascore.com/images/team-logo/football_${match.homeTeam.id}.png`,
          //     homeScore: (match.homeScore.current == undefined) ? null : match.homeScore.current,
          //     homeSlug: match.homeTeam.slug,
          //     homeTeam: match.homeTeam.name,
          //     formatedStartDate: match.formatedStartDate,
          //     id: match.id,
          //     round: id,
          //     startTime: match.startTime,
          //     startTimestamp: match.startTimestamp,
          //     changeTimestamp: match.changes.changeTimestamp
          //   })
          //   .then(function() {
          //     console.log("Partidas adicionadas com sucesso!");
          //   })
          //   .catch(function(error) {
          //     console.error("Falha ao adicionar partidas: ", error);
          //   });
        }
      }
    });

  }

  atualizarPartidas(id, partidas: Partida[]) {

    let idRound;

    (id == "1") ? idRound = "1" : null;
    (id == "2") ? idRound = "2" : null;
    (id == "3") ? idRound = "3" : null;
    (id == "4") ? idRound = "4/1/8" : null;
    (id == "5") ? idRound = "3/Quarterfinals" : null;
    (id == "6") ? idRound = "2/Semifinals" : null;
    (id == "7") ? idRound = "1/Final" : null;

    this.roundMatches$ = this.http.get(`${this.basepath}/u-tournament/16/season/15586/matches/round/${idRound}`);
    //this.roundMatches$ = this.http.get(`api_round.php?id=${idRound}`);
    this.roundMatches$.subscribe(matches => {
      for (let tournament in matches.roundMatches.tournaments) {
        for (let event in matches.roundMatches.tournaments[tournament].events) {
          let match = matches.roundMatches.tournaments[tournament].events[event];
          for (let i = 0; i < partidas.length; i++) {
            if (partidas[i].id == match.id &&
            partidas[i].changeTimestamp != match.changes.changeTimestamp) {
              console.log("Atualizar resultados!");
              // this.db
              // .collection("resultados")
              // .doc(id)
              // .collection(id)
              // .doc(String(match.id))
              // .update({
              //   awayScore: (match.awayScore.current == undefined) ? null : match.awayScore.current,
              //   homeScore: (match.homeScore.current == undefined) ? null : match.homeScore.current,
              //   changeTimestamp: match.changes.changeTimestamp
              // })
              // .then(function() {
              //   console.log("Partidas atualizadas com sucesso!");
              // })
              // .catch(function(error) {
              //   console.error("Falha ao atualizar partidas: ", error);
              // });
            }
          }
        }
      }
    });

  }

  partidas(idRound): Observable<any> {

    return null;//this.db
            //  .collection("resultados")
            //  .doc(idRound)
            //  .collection(idRound, ref => ref.orderBy("startTimestamp", "asc"))
            //  .valueChanges();

  }

}
