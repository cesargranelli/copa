import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
    private _navParams: NavParams
  ) {
    this._userid = this._navParams.get('userid');
  }

  ionViewDidLoad() {
    this.fireBase.database.ref(`users/${this._userid}`).once('value')
      .then((snapshotUser) => {
        this.user = snapshotUser.val();
        this.fireBase.database.ref(`players/${snapshotUser.val().username}`).once('value')
          .then((snapshotPlayer) => {
            this.player = snapshotPlayer.val();
          })
      });
  }

}
