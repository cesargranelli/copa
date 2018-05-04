import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Player } from '../../models/player';
import { User } from '../../models/user.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private _userid;

  public player: Player;
  public user: User;

  constructor(
    public fireBase: AngularFireDatabase,
    public http: HttpClient,
    public navCtrl: NavController,
    private _navParams: NavParams,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController
  ) {
    this._userid = this._navParams.get('userid');
  }

  ionViewDidLoad() {

    let loading = this.showLoading();

    this.fireBase.database.ref(`users/${this._userid}`).once('value')
      .then((snapshotUser) => {
        this.user = snapshotUser.val();
        this.fireBase.database.ref(`players/${snapshotUser.val().username}`).once('value')
          .then((snapshotPlayer) => {
            this.player = snapshotPlayer.val();
            loading.dismiss();
          })
      });
  }

  private showLoading(): Loading {
    let loading: Loading = this._loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this._alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}
