import { Component } from '@angular/core';
// import { AngularFirestore } from 'angularfire2/firestore';
import { Loading, LoadingController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { StorageProvider } from '../../providers/storage';
import { UserProvider } from '../../providers/user';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  public user: User;

  constructor(
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private userService: UserProvider
  ) { }

  ionViewDidLoad() {
    let loading = this.showLoading();

    this.userService.infoUsuario(StorageProvider.get().uid)
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
