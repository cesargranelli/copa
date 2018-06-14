import { Component } from '@angular/core';

import { AlertController, Loading, LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApostaPage } from '../aposta/aposta';

import { AngularFirestore } from "angularfire2/firestore";

import { Observable } from 'rxjs/Observable';
import { ResultadoProvider } from '../../providers/resultado/resultado';

@IonicPage()
@Component({
  selector: 'page-resultado',
  templateUrl: 'resultado.html',
})
export class ResultadoPage {

  selectDefault: string = "Rodada 1";

  rounds$: Observable<any>;
  jogos$: Observable<any>;

  dateNow: string = new Date().toISOString();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFirestore,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public rs: ResultadoProvider
  ) { }

  ionViewDidLoad() {

//    let loading: Loading = this.showLoading();

    this.rounds$ = this.db.collection("rounds").valueChanges();
    this.jogos$ = this.rs.resultados(this.selectDefault);

//    setTimeout(() => {
//      loading.dismiss();
//    }, 2000);

  }

  partidas(id) {

    let loading: Loading = this.showLoading();

    this.jogos$ = this.rs.resultados(id);

    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  apostas(jogo) {
    console.log('Apostas: ' + jogo.id);
    this.navCtrl.push(ApostaPage, {
      jogo: jogo
    })
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
