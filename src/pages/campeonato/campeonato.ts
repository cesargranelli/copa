import { Component, Injectable } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CampeonatoProvider } from '../../providers/campeonato/campeonato';

@Injectable()
@IonicPage()
@Component({
  selector: 'page-campeonato',
  templateUrl: 'campeonato.html',
})
export class CampeonatoPage {

  constructor(
    public nav: NavController,
    public par: NavParams,
    public cam: CampeonatoProvider
  ) { }

  ionViewDidLoad() {
    this.cam.rodadas();
  }

}
