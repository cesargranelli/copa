import { Component } from "@angular/core";
import { IonicPage, Loading, LoadingController, NavParams } from "ionic-angular";
import { User } from "../../models/user";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {

  public user: User;

  constructor(
    private loadingCtrl: LoadingController,
    private navParams: NavParams
  ) {
    this.user = this.navParams.get('user');
  }

  ionViewDidLoad() {
    let loading = this.showLoading();

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
