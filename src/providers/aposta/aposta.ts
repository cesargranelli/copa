import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { AlertController, Loading, LoadingController, Platform } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';

import { Aposta } from '../../models/aposta';
import { User } from '../../models/user';

@Injectable()
export class ApostaProvider {

  apostas$ = [];

  constructor(
    public http: HttpClient,
    public db: AngularFirestore,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) { }

  apostas(jogo)/*: Observable<any>*/ {

    let i = 0;

    this.db.collection("users").valueChanges().subscribe(users => {
      users.map((user: User) => {
        this.db.collection("hunches").doc(user.slug).collection(String(jogo.round)).doc(String(jogo.id))
        .valueChanges().subscribe((game: Aposta) => {
          if (game) {
            game.nickname = user.nickname;
            this.apostas$[i++] = game;
          }
        });
      });
    });

    return this.apostas$;

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
