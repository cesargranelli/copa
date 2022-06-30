import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, Loading, LoadingController, NavController } from 'ionic-angular';
import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth.service';
import { StorageProvider } from '../../providers/storage';
import { DashboardPage } from '../dashboard/dashboard';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signinForm: FormGroup;

  constructor(
    private alertCtrl: AlertController,
    private authService: AuthProvider,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) {
    let loading: Loading = this.showLoading();

    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.compose([Validators.required, Validators.pattern(emailRegex)])]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    loading.dismiss();
  }

  public users: User[];

  onSubmit(): void {
    let loading: Loading = this.showLoading();

    this.authService.signin(this.signinForm.value).subscribe(user => {
      if (user.uid) {
        StorageProvider.set({ uid: user.uid, slug: user.slug })
        this.navCtrl.setRoot(DashboardPage, {
          user: user
        });
        loading.dismiss();
        console.log(`Usuário logado com sucesso`);
      }
    }, (error: any) => {
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

}
