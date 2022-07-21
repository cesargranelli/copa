import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Bet } from '../../models/bet';
import { Match } from '../../models/match';
// import { AngularFirestore } from 'angularfire2/firestore';
import { BetProvider } from '../../providers/bet.service';

@IonicPage()
@Component({
  selector: 'page-bet',
  templateUrl: 'bet.html',
})
export class BetPage {

  public match: Match;
  public bets: Bet[];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private betService: BetProvider
  ) {
    this.match = this.navParams.get('match');
  }

  ionViewDidLoad() {
    let loading: Loading = this.showLoading();
    
    this.betService.findBets(String(this.match.id), String(this.match.matchDay)).subscribe((bets: Bet[]) =>
      this.bets = bets, () => loading.dismiss(), () => loading.dismiss());
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
    });

    loading.present();

    return loading;
  }

}
