import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { ApostaProvider } from '../../providers/aposta/aposta';
import { Aposta } from '../../models/aposta';
import { User } from '../../models/user';
import { AngularFirestore } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-aposta',
  templateUrl: 'aposta.html',
})
export class ApostaPage {

  apostas;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ap: ApostaProvider,
    public db: AngularFirestore
  ) { }

  ionViewDidLoad() {
    //this.apostas$ = this.ap.apostas();
    this.apostas = this.ap.apostas(this.navParams.get('jogo'));

  }

}
