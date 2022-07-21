import { HttpErrorResponse } from "@angular/common/http";
import { Component, Injectable } from "@angular/core";
import { AlertController, IonicPage, Loading, LoadingController, NavParams } from "ionic-angular";
import { Game } from "../../models/game";
import { Guess } from "../../models/guess";
import { Round } from "../../models/round";
import { User } from "../../models/user";
import { GuessProvider } from "../../providers/guess.service";
import { RoundProvider } from '../../providers/round.service';

@Injectable()
@IonicPage()
@Component({
  selector: "page-guess",
  templateUrl: "guess.html"
})
export class GuessPage {

  public rounds: Round[];
  public games: Game[];
  public user: User;
  public blocked: boolean;

  public matchDay: number = 1;
  public utcDateNow: string = new Date(new Date().setSeconds(-10800)).toISOString();

  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private roundService: RoundProvider,
    private guessService: GuessProvider
  ) {
    this.user = this.navParams.get('user');
  }

  ionViewDidLoad() {
    let loading = this.showLoading();

    this.roundService.rounds().subscribe((rounds: Round[]) =>
      this.rounds = rounds.sort((a: Round, b: Round) => a.matchDay - b.matchDay), (error: HttpErrorResponse) => this.showAlert(error.message), () => loading.dismiss());
  }

  setRound(round: Round) {
    this.matchDay = round.matchDay;
    this.blocked = this.utcDateNow>=round.start;
  }

  matchDayGuesses() {
    let loading = this.showLoading();

    this.guessService.guesses(this.user.slug, String(this.matchDay))
      .subscribe((games: Game[]) => this.games = games, (error: HttpErrorResponse) => this.showAlert(error.message), () => loading.dismiss());
  }

  onSubmit(): void {
    let loading: Loading = this.showLoading();

    let children = (<HTMLTextAreaElement>window.event.target).children;

    for (let i = 0; i < children.length -1; i++) {
      let gameId    = children.item(i).getElementsByTagName("ion-grid").item(0).id;
      let scoreHome = children.item(i).getElementsByTagName("input").item(0).value;
      let scoreAway = children.item(i).getElementsByTagName("input").item(1).value;
      
      this.games.filter(game => game.id == Number(gameId))[0].score.home = scoreHome ? Number(scoreHome) : null;
      this.games.filter(game => game.id == Number(gameId))[0].score.away = scoreAway ? Number(scoreAway) : null;
    }
    
    let guess: Guess = { 'slug': this.user.slug, 'matchDay': this.matchDay, 'games': this.games };
    
    this.guessService.saveOrUpdate(guess)
      .subscribe((games: Game[]) => this.games = games, () => loading.dismiss(), () => {
        loading.dismiss();
        this.showAlert('Palpites salvos com sucesso!');
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
