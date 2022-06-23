import { Component } from '@angular/core';
import { Loading, LoadingController, NavController } from 'ionic-angular';
import { User } from '../../models/user';
import { StorageProvider } from '../../providers/storage';
import { UserProvider } from '../../providers/user.service';
import { DashboardPage } from '../dashboard/dashboard';
import { SigninPage } from '../signin/signin';

@Component({
  selector: 'page-signon',
  templateUrl: 'signon.html',
})
export class SignonPage {

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public userService: UserProvider
  ) {
    let loading: Loading = this.showLoading();

    if (StorageProvider.get()) {
      this.userService.infoUsuario(StorageProvider.get().uid)
        .subscribe((user: User) => {
          this.navCtrl.setRoot(DashboardPage, {
            userid: user.uid,
            slug: user.slug
          }, null);
        });

      loading.dismiss();
    } else {
      loading.dismiss();
      this.navCtrl.push(SigninPage);
    }

  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
    });

    loading.present();

    return loading;
  }

}
