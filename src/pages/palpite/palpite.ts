import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Loading, LoadingController, IonicPage, NavParams, Platform } from 'ionic-angular';

import { AngularFirestore } from 'angularfire2/firestore';

import { PalpiteProvider } from './../../providers/palpite/palpite';
import { Observable } from 'rxjs/Observable';

import { Palpite } from '../../models/palpite';

@Injectable()
@IonicPage()
@Component({
  selector: "page-palpite",
  templateUrl: "palpite.html"
})
export class PalpitePage {

  public rodadas$: Observable<any>;
  public palpites$: Observable<any>;
  public userid;
  public slug;

  public codRodada: string = "1";

  public basepath = "/api"; // Para teste em desenvolvimento

  public selectDefault: string = "Rodada 1";
  public roundMatches$: Observable<any>;

  hunchForm: FormGroup;

  // Teste
  dateNow: string = new Date(new Date().setSeconds(-10800)).toISOString();
  dateHoje: number = new Date(new Date().setSeconds(-10800)).getTime();
  dateFech: number;

  constructor(
    private navParams: NavParams,
    private platform: Platform,
    private _afs: AngularFirestore,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    private _palpiteService: PalpiteProvider
  ) {

    this.userid = this.navParams.get('userid');
    this.slug   = this.navParams.get('slug');

    _afs.firestore.settings({ timestampsInSnapshots: true });

    if (this.platform.is("cordova")) {
      this.basepath = "https://www.sofascore.com";
    }

  }

  ionViewDidLoad() {

    this.rodadas$ = this._afs.collection("rounds").valueChanges();
    this.palpitesRodada(this.codRodada);

  }

  palpitesRodada(codRodada?: string) {

    (this.selectDefault == "Rodada 1") ? codRodada = "1" : null;
    (this.selectDefault == "Rodada 2") ? codRodada = "2" : null;
    (this.selectDefault == "Rodada 3") ? codRodada = "3" : null;
    (this.selectDefault == "Oitavas 1/8") ? codRodada = "4" : null;
    (this.selectDefault == "Quartas 1/4") ? codRodada = "5" : null;
    (this.selectDefault == "Semifinais") ? codRodada = "6" : null;
    (this.selectDefault == "Final") ? codRodada = "7" : null;

    this._afs.collection("palpites").doc("palpite")
           .collection(this.slug, ref =>
            ref.where("codRodada", "==", codRodada)
               .orderBy("timestamp")
            )
           .valueChanges()
           .subscribe(partidas => {
             if (!partidas.length) {

              let loading: Loading = this.showLoading();
              console.log('adicionaPalpites');
              //this._palpiteService.adicionaPalpites(codRodada, this.slug);

              setTimeout(() => {
                loading.dismiss();
              }, 1000);

             } else {

              let loading: Loading = this.showLoading();
              console.log('buscaPalpites');
              //this.palpites$ = this._palpiteService.buscaPalpites(codRodada, this.slug);

              setTimeout(() => {
                loading.dismiss();
              }, 1000);

             }
           });

  }

  onSubmit(): void {

    let loading: Loading = this.showLoading();

    let palpite: Palpite = new function(){};

    for (let i = 0; i < event.srcElement.children.length -1; i++) {
      palpite.codConfronto     = Number(event.srcElement.children.item(i).getElementsByTagName("ion-grid").item(0).id);
      palpite.codRodada        = Number(event.srcElement.children.item(i).getElementsByTagName("ion-col").item(0).id);
      palpite.palpiteMandante  = Number(event.srcElement.children.item(i).getElementsByTagName("input").item(0).value);
      palpite.palpiteVisitante = Number(event.srcElement.children.item(i).getElementsByTagName("input").item(1).value);

      if (palpite.palpiteMandante != null && palpite.palpiteMandante != null) {

        this._palpiteService.atualizaPalpites(palpite);

      }
    }

    setTimeout(() => {
      loading.dismiss();
    }, 1000);

  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
    });

    loading.present();

    return loading;
  }

}
