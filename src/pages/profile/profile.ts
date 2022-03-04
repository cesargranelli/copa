import { Component } from "@angular/core";
import { IonicPage, Loading, LoadingController, NavParams } from "ionic-angular";
import { User } from "../../models/user";
import { UserProvider } from "../../providers/user.service";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {

  public foto: string = "false";
  public nome: string;
  public email: string;
  public nick: string;

  constructor(
    private loadingCtrl: LoadingController,
    private navParams: NavParams,
    private userService: UserProvider
  ) { }

  ionViewDidLoad() {
    let loading = this.showLoading();

    this.userService.infoUsuario(this.navParams.get('userid'))
      .subscribe((user: User) => {
        this.nome = user.name;
        this.email = user.email;
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
