import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Loading, LoadingController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { UserProvider } from '../../providers/user';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  public user: User;

  constructor(
    public db: AngularFirestore,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public userService: UserProvider
  ) { }

  ionViewDidLoad() {
    let loading = this.showLoading();

    this.userService.infoUsuario(localStorage.getItem(localStorage.key(0)))
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
