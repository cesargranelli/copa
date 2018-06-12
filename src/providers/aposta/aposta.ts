import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { AlertController, Loading, LoadingController, Platform } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { Aposta } from '../../models/aposta';
import { map } from 'rxjs/operator/map';

@Injectable()
export class ApostaProvider {

  apostaColecao: AngularFirestoreCollection<Aposta>;

  aposta: Observable<Aposta[]>;

  constructor(
    public http: HttpClient,
    public db: AngularFirestore,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    console.log('Hello ApostaProvider Provider');
  }

  apostas()/*: Observable<any>*/ {
    this.apostaColecao = this.db.collection<Aposta>("hunches");
    this.aposta = this.apostaColecao.snapshotChanges.arguments;
    console.log(this.aposta);
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
