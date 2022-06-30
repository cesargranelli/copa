import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Register } from '../../models/register';
import { Registered } from '../../models/registered';
import { AuthProvider } from '../../providers/auth.service';
import { StorageProvider } from '../../providers/storage';
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
    private alertCtrl: AlertController,
    private authService: AuthProvider,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private navParams: NavParams
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
        StorageProvider.set(registered);
        this.navCtrl.setRoot(DashboardPage, {
          user: registered
        });
        loading.dismiss();
      }, (errorResponse: HttpErrorResponse) => {
        loading.dismiss();
        this.showAlert(errorResponse.error.message);
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
