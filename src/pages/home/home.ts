import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Player } from '../../models/player';
import { User } from '../../models/user.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public userid;

  public player: Player;
  public user: User;

  constructor(
    public fireBase: AngularFireDatabase,
    public http: HttpClient,
    public navCtrl: NavController,
    private _navParams: NavParams,
    private _loadingCtrl: LoadingController
  ) {
    this.userid = this._navParams.get('userid');
  }

  ionViewDidLoad() {

    let loading = this.showLoading();

    this.fireBase.database.ref(`users/${this.userid}`).once('value')
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
      content: 'Por favor aguarde...'
    });

    loading.present();

    return loading;
  }

}
