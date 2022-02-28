import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/first';
import { Register } from '../../models/register';
import { Registered } from '../../models/registered';
import { AuthProvider } from '../../providers/auth';
import { DashboardPage } from '../dashboard/dashboard';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;

  email: string = '';
  password: string = '';

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

    let nicknameRegex = /^[a-zA-Z ]+$/;

    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      nickname: ['', [Validators.required, Validators.minLength(3), Validators.pattern(nicknameRegex)]],
      email: ['', [Validators.compose([Validators.required, Validators.pattern(emailRegex)])]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.email = this.navParams.get('email');
    this.password = this.navParams.get('password');

  }

  onSubmit(): void {
    let loading: Loading = this.showLoading();

    this.authService.signup(new Register().convert(this.signupForm.value))
      .subscribe((registered: Registered) => {
        localStorage.clear();
        localStorage.setItem(registered.slug, registered.uid);
        this.navCtrl.setRoot(DashboardPage, {
          userid: registered.uid,
          slug: registered.slug
        });
        loading.dismiss();
      }, (response: HttpErrorResponse) => {
        loading.dismiss();
        this.showAlert(response.error.message);
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
