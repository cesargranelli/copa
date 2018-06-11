import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { AlertController, Loading, LoadingController, Platform } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApostaProvider {

  constructor(
    public http: HttpClient,
    public db: AngularFirestore,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    console.log('Hello ApostaProvider Provider');
  }

  apostas()/*: Observable<any>*/ {
    this.db.collection('hunches').valueChanges().subscribe(slug => {
      console.log(slug);
    });
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
