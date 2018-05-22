import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-palpite',
  templateUrl: 'palpite.html',
})
export class PalpitePage {

  private confrontos: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.confrontos = [
      {
        homeTeam: 'Brasil',
        awayTeam: 'Croácia',
        homeScore: 3,
        awayScore: 1,
        startTime: '20:00',
        startTimestamp: 1402603200
      },
      {
        homeTeam: 'Alemanhã',
        awayTeam: 'Rússia',
        homeScore: 2,
        awayScore: 2,
        startTime: '20:00',
        startTimestamp: 1402603200
      }
    ]
  }

}
