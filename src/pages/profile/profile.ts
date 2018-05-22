import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController, Loading } from "ionic-angular";

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
    public navCtrl: NavController,
    public navParams: NavParams,
    private fireBase: AngularFireDatabase,
    private _loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log(this.navParams);

    let loading = this.showLoading();

    this.fireBase.database
      .ref(`users/${this.navParams.get('userid')}`)
      .once('value')
      .then(snapshotUser => {
        this.nome = snapshotUser.val().name;
        this.email = snapshotUser.val().email;
        this.fireBase.database
          .ref(`players/${snapshotUser.val().username}`)
          .once('value')
          .then(snapshotPlayer => {
            this.foto = snapshotPlayer.val().foto;
            this.nick = snapshotPlayer.val().nickname;
            loading.dismiss();
          });
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
