import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/first';
import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth';
import { StorageProvider } from '../../providers/storage';
import { UserProvider } from '../../providers/user';
// import { DashboardPage } from '../dashboard/dashboard';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signinForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserProvider
  ) {

    if (this.navParams.get("out")) {
      this.logout();
    }

    StorageProvider.authenticated.then(() => {
      let loading: Loading = this.showLoading();

      // this.userService.db
      //   .collection("users")
      //   .doc(StorageProvider.get().uid)
      //   .valueChanges()
        // .first()
        // .subscribe((user: User) => {
        //   this.navCtrl.setRoot(DashboardPage, {
        //     userid: StorageProvider.get().uid,
        //     slug: StorageProvider.get().slug
        //   });
        // });

      loading.dismiss();
    }).catch(() => {
      console.log('Não logado');
    });

    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.compose([Validators.required, Validators.pattern(emailRegex)])]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  public users: User[];

  onSubmit(): void {
    let loading: Loading = this.showLoading();

    this.authService.signin(this.signinForm.value).then(userCredential => {
      console.log(userCredential.user)

      if (userCredential.user) {
        // this.userService.db
        //   .collection("users")
        //   .doc(userCredential.user.uid)
        //   .valueChanges()
          // .first()
          // .subscribe((user: User) => {
          //   StorageProvider.set({ uid: user.uid, slug: user.slug })
          //   this.navCtrl.setRoot(DashboardPage, {
          //     userid: StorageProvider.get().uid,
          //     slug: StorageProvider.get().slug
          //   });
          // });

        loading.dismiss();
        console.log(`Usuário logado com sucesso`);
      }
    }).catch((error: any) => {
      loading.dismiss();

      if (error.code == 'auth/user-not-found') {
        this.navCtrl.push(SignupPage, {
          email: this.signinForm.value.email,
          password: this.signinForm.value.password
        });
      } else {
        this.showAlert(error.message);
      }
    });
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage, {
      email: this.signinForm.value.email,
      password: this.signinForm.value.password
    });
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

  logout() {
    this.authService.signout();
  }

}
