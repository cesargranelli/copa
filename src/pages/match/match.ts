import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Match } from '../../models/match';
import { Round } from '../../models/round';
import { User } from '../../models/user';
import { MatchProvider as MatchProvider } from '../../providers/match.service';
import { RoundProvider } from '../../providers/round.service';
import { BetPage } from '../bet/bet';

@IonicPage()
@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
})
export class MatchPage {

  public rounds: Round[];
  public matches: Match[];
  public user: User;

  rounds$: Observable<any>;

  public utcDateNow: string = new Date(new Date().setSeconds(-10800)).toISOString();

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private roundService: RoundProvider,
    private matchService: MatchProvider
  ) {
    this.user = this.navParams.get('user');
  }

  ionViewDidLoad() {
    let loading: Loading = this.showLoading();

    this.roundService.rounds().subscribe((rounds: Round[]) =>
      this.rounds = rounds.sort((a: Round, b: Round) => a.matchDay - b.matchDay), () => loading.dismiss(), () => loading.dismiss());
  }

  findMatches(round: Round) {
    let loading: Loading = this.showLoading();

    this.matchService.matches(String(round.matchDay)).subscribe((macthes: Match[]) =>
      this.matches = macthes, () => loading.dismiss(), () => loading.dismiss());
  }

  findBets(match: Match) {
    this.navCtrl.push(BetPage, {
      match: match
    });
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
    });

    loading.present();

    return loading;
  }

}
