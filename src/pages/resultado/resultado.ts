import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  selectDefault: string = "2018-06-14";

  datas$: Observable<any>;
  jogos$: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFirestore,
    public rs: ResultadoProvider
  ) { }

  ionViewDidLoad() {
    this.datas$ = this.db.collection("dates").valueChanges();
    this.jogos$ = this.rs.resultados(this.selectDefault);
  }

  partidas(date) {
    this.jogos$ = this.rs.resultados(date);
  }

  apostas(jogo) {
    console.log('Apostas: ' + jogo.id);
    this.navCtrl.push(ApostaPage, {
      jogo: jogo
    })
  }

}
