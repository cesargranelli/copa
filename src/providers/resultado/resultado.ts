import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { AlertController, Loading, LoadingController, Platform } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { Partida } from '../../models/partida';

@Injectable()
export class ResultadoProvider {

  partida: Partida[];

  jogos$: Observable<Partida[]>;

  match$: Observable<any>;

  basepath = "/api"; // Para teste em desenvolvimento

  constructor(
    public http: HttpClient,
    public db: AngularFirestore,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public platform: Platform
  ) {
    if (this.platform.is("cordova")) {
      this.basepath = "https://www.sofascore.com";
    }
  }

  adicionarPartidas(date) {
    console.log('Adicionar: ' + date);

    let loading: Loading = this.showLoading();
    let dateIni = Date.UTC(Number(date.substr(0, 4)), Number(date.substr(5, 2))-1, Number(date.substr(8, 2))).toString().substring(0, 10);
    let dateFim = Date.UTC(Number(date.substr(0, 4)), Number(date.substr(5, 2))-1, Number(date.substr(8, 2))+1).toString().substring(0, 10);

    this.match$ = this.http.get(`${this.basepath}/u-tournament/16/season/15586/matches/week/${dateIni}/${dateFim}`);
    //this.match$ = this.http.get(`api_week.php?dateIni=${dateIni}&dateFim=${dateFim}`);
    this.match$.subscribe(matches => {
      for (let tournament in matches.weekMatches.tournaments) {
        for (let event in matches.weekMatches.tournaments[tournament].events) {
          let match = matches.weekMatches.tournaments[tournament].events[event];
          this.db
            .collection("resultados")
            .doc(match.formatedStartDate.replace(/\./g, ""))
            .collection(match.formatedStartDate.replace(/\./g, ""))
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

    setTimeout(() => {
      loading.dismiss();
    }, 2000);

  }

  resultados(date): Observable<any> {

    let dataPartidas = date.substr(8, 2) + date.substr(5, 2) + date.substr(0, 4);

    this.db.collection("resultados").doc(dataPartidas).collection(dataPartidas).valueChanges()
      .subscribe(partidas => {
        if (!partidas.length) {
          this.adicionarPartidas(date);
        }
      });

      return this.partidas(date);

  }

  partidas(date): Observable<any> {
    let dateMathes = date.toString().substr(8, 2) + date.toString().substr(5, 2) + date.toString().substr(0, 4);

    return this.db
             .collection("resultados")
             .doc(dateMathes)
             .collection(dateMathes, ref => ref.orderBy("startTime"))
             .valueChanges();
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}
