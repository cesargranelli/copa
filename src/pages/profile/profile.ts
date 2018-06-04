import { AngularFirestore } from 'angularfire2/firestore';
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
    public db: AngularFirestore,
    public _loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {

//    let loading = this.showLoading();

    this.db
      .collection("users")
      .doc(this.navParams.get('userid'))
      .valueChanges()
      .first()
      .subscribe(user => {
        this.nome = user.name;
        this.email = user.email;
        console.log(user);
//        this.db
//          .ref(`players/${snapshotUser.val().username}`)
//          .once('value')
//          .then(snapshotPlayer => {
//            this.foto = snapshotPlayer.val().foto;
//            this.nick = snapshotPlayer.val().nickname;
//            loading.dismiss();
//          });
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
