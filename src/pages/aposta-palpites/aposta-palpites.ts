import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApostaProvider } from '../../providers/aposta/aposta';

@IonicPage()
@Component({
  selector: 'page-aposta-palpites',
  templateUrl: 'aposta-palpites.html',
})
export class ApostaPalpitesPage {

  palpites$;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apostaSrv: ApostaProvider
  ) { }

  ionViewDidLoad() {

    this.palpites$ = this.apostaSrv.palpites(this.navParams.get('aposta'));

  }

}
