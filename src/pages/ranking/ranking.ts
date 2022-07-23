import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { AlertController, IonicPage, Loading, LoadingController } from 'ionic-angular';
import { Ranking } from '../../models/ranking';
import { RankingProvider } from '../../providers/ranking.service';

@Injectable()
@IonicPage()
@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
})
export class RankingPage {

  public rankings: Ranking[];

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private rankingService: RankingProvider
  ) { }

  ionViewDidLoad() {
    let loading: Loading = this.showLoading();

    this.rankingService.ranking().subscribe((rankings: Ranking[]) =>
      this.rankings = rankings, (error: HttpErrorResponse) => this.showAlert(error.message), () => loading.dismiss());
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
