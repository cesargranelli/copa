import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

import { AngularFirestore } from 'angularfire2/firestore';

import { HttpClient } from '@angular/common/http';

import { User } from '../../models/user';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  public userid;
  public slug;

  public user: User;

  constructor(
    public db: AngularFirestore,
    public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController
  ) {
    this.userid = this.navParams.get('userid');
    this.slug = this.navParams.get('slug');
  }

  ionViewDidLoad() {

    let loading = this.showLoading();

    this.db
      .collection("users")
      .doc(this.userid)
      .valueChanges()
      .first()
      .subscribe((user: User) => {
        this.user = user;
        loading.dismiss();
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
