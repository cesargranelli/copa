import { Component } from '@angular/core';
import { Loading, LoadingController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  public user: User;

  constructor(
    private loadingCtrl: LoadingController,
    private navParams: NavParams
  ) { }

  ionViewDidLoad() {
    let loading = this.showLoading();

    this.user = this.navParams.get('user');

    loading.dismiss();
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
    });

    loading.present();

    return loading;
  }

}
