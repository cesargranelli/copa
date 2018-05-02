import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Player } from '../../models/player';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public player: Player;

  constructor(
    public fireBase: AngularFireDatabase,
    public http: HttpClient,
    public navCtrl: NavController
  ) {
    this.fireBase.database.ref(`players/`).child(`cesar`).once('value')
      .then((snapshot) => {
        console.log(snapshot);
        this.player = snapshot.val();
      });
  }

  getPlayer(): any {
    this.fireBase.database.ref(`players/`).child(`cesar`).once('value')
      .then((snapshot) => {
        console.log(snapshot.val().nickname);

      });
  }

}
