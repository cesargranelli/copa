import { Component, Injectable } from '@angular/core';

import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';

import { AngularFirestore } from "angularfire2/firestore";

import { RodadaProvider } from './../../providers/rodada/rodada';
import { CampeonatoProvider } from '../../providers/campeonato/campeonato';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../../models/usuario';
import { Rodada } from '../../models/rodada';

@Injectable()
@IonicPage()
@Component({
  selector: 'page-campeonato',
  templateUrl: 'campeonato.html',
})
export class CampeonatoPage {

  private _rodadas: Rodada[];

  campeonato$: Observable<any>;

  i: number = 1;

  constructor(
    public nav: NavController,
    public par: NavParams,
    private _rod: RodadaProvider,
    public cam: CampeonatoProvider,
    public load: LoadingController,
    private db: AngularFirestore
  ) { }

  executar() {
    console.log('Rodadas: ' + this._rodadas);
  }

  ionViewDidLoad() {

    //this._rod.rodadas.subscribe(rodadas => this._rodadas = rodadas);
    this.cam.rodadas();
    //this.executar();
    let loading: Loading = this.showLoading();
/*
    this.db
      .collection("datetime")
      .valueChanges()
      .first()
      .subscribe(datetime => {
        if (datetime.length < 1) {
          this.cam.rodadas();
        }
      });
*/
    //this.campeonato$ = this.db.collection("campeonato", ref => ref.orderBy("total", "desc")).valueChanges();

    setTimeout(() => {
      loading.dismiss();
    }, 1000);

  }

  private showLoading(): Loading {
    let loading: Loading = this.load.create({
      content: 'Por favor aguarde...'
    });

    loading.present();

    return loading;
  }

}
